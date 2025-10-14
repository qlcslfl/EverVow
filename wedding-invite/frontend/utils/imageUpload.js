// Base64 이미지 업로드 유틸리티 (Firebase 대체)

/**
 * 이미지를 압축하여 Base64로 변환
 * @param {File} file - 압축할 이미지 파일
 * @param {number} maxWidth - 최대 가로 크기 (기본: 800px)
 * @param {number} maxHeight - 최대 세로 크기 (기본: 600px)
 * @param {number} quality - 압축 품질 (0.1 ~ 1.0, 기본: 0.8)
 * @returns {Promise<string>} - 압축된 Base64 데이터 URL
 */
const compressImage = (file, maxWidth = 800, maxHeight = 600, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // 원본 크기
      let { width, height } = img;

      // 비율을 유지하면서 크기 조정
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // 캔버스 크기 설정
      canvas.width = width;
      canvas.height = height;

      // 이미지를 캔버스에 그리기
      ctx.drawImage(img, 0, 0, width, height);

      // Base64로 변환 (압축 적용)
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      resolve(compressedDataUrl);
    };

    img.onerror = (error) => {
      reject(new Error('이미지 압축 중 오류가 발생했습니다.'));
    };

    // 이미지 로드
    img.src = URL.createObjectURL(file);
  });
};

/**
 * 이미지 파일을 압축하여 Base64로 변환하고 localStorage에 저장
 * @param {File} file - 업로드할 이미지 파일
 * @param {string} folder - 저장할 폴더 (예: 'invitations', 'gallery', 'profiles')
 * @param {string} fileName - 파일명 (선택사항, 없으면 자동 생성)
 * @returns {Promise<string>} - Base64 데이터 URL
 */
export const uploadImage = async (file, folder = 'images', fileName = null) => {
  try {
    // 파일 유효성 검사
    validateImageFile(file);

    // 압축 설정 (폴더별로 다른 압축률 적용)
    let maxWidth = 800;
    let maxHeight = 600;
    let quality = 0.8;

    if (folder === 'title') {
      // 타이틀 이미지는 더 높은 품질로
      maxWidth = 600;
      maxHeight = 600;
      quality = 0.85;
    } else if (folder === 'gallery') {
      // 갤러리 이미지는 더 압축
      maxWidth = 400;
      maxHeight = 400;
      quality = 0.7;
    }

    // 이미지 압축
    const base64Data = await compressImage(file, maxWidth, maxHeight, quality);

    // 압축 후 크기 확인
    const sizeInKB = Math.round((base64Data.length * 3) / 4 / 1024);
    console.log(`📊 이미지 압축 완료: ${file.name} -> ${sizeInKB}KB`);

    // localStorage 저장 전 용량 확인
    try {
      // 파일명 생성
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const fileExtension = file.name.split('.').pop();
      const finalFileName = fileName || `${timestamp}_${randomStr}.${fileExtension}`;

      // 이미지 정보를 localStorage에 저장
      const imageData = {
        id: `${folder}_${timestamp}_${randomStr}`,
        fileName: finalFileName,
        originalName: file.name,
        size: file.size,
        compressedSize: sizeInKB * 1024,
        type: file.type,
        folder: folder,
        uploadedAt: new Date().toISOString(),
        dataUrl: base64Data
      };

      // localStorage에 이미지 목록 저장
      const existingImages = JSON.parse(localStorage.getItem('evervow_images') || '[]');
      existingImages.push(imageData);
      localStorage.setItem('evervow_images', JSON.stringify(existingImages));

      console.log(`✅ 이미지 업로드 성공 (Base64): ${finalFileName} (${sizeInKB}KB)`);
      return base64Data;

    } catch (storageError) {
      if (storageError.name === 'QuotaExceededError') {
        // localStorage 용량 초과 시 더 강한 압축 시도
        console.warn('⚠️ localStorage 용량 초과, 더 강한 압축 시도...');

        const stronglyCompressed = await compressImage(file, 300, 300, 0.5);
        const smallerSizeInKB = Math.round((stronglyCompressed.length * 3) / 4 / 1024);

        try {
          // 강한 압축으로 재시도
          const imageData = {
            id: `${folder}_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            fileName: fileName || `compressed_${Date.now()}.jpg`,
            originalName: file.name,
            size: file.size,
            compressedSize: smallerSizeInKB * 1024,
            type: 'image/jpeg',
            folder: folder,
            uploadedAt: new Date().toISOString(),
            dataUrl: stronglyCompressed
          };

          const existingImages = JSON.parse(localStorage.getItem('evervow_images') || '[]');
          existingImages.push(imageData);
          localStorage.setItem('evervow_images', JSON.stringify(existingImages));

          console.log(`✅ 강한 압축으로 업로드 성공: ${smallerSizeInKB}KB`);
          return stronglyCompressed;

        } catch (finalError) {
          throw new Error('이미지가 너무 커서 저장할 수 없습니다. 더 작은 이미지를 선택해주세요.');
        }
      } else {
        throw storageError;
      }
    }

  } catch (error) {
    console.error('❌ 이미지 업로드 실패:', error);
    throw new Error(`이미지 업로드에 실패했습니다: ${error.message}`);
  }
};

/**
 * 여러 이미지 파일을 동시에 업로드 (Base64, 압축)
 * @param {FileList} files - 업로드할 이미지 파일들
 * @param {string} folder - 저장할 폴더
 * @returns {Promise<string[]>} - Base64 데이터 URL 배열
 */
export const uploadMultipleImages = async (files, folder = 'gallery') => {
  try {
    const fileArray = Array.from(files);
    const uploadPromises = fileArray.map(file => uploadImage(file, folder));
    const base64Urls = await Promise.all(uploadPromises);

    console.log(`✅ 다중 이미지 업로드 성공 (Base64): ${base64Urls.length}개`);
    return base64Urls;

  } catch (error) {
    console.error('❌ 다중 이미지 업로드 실패:', error);
    throw error;
  }
};

/**
 * localStorage에서 이미지 삭제
 * @param {string} imageUrl - 삭제할 이미지의 데이터 URL 또는 ID
 * @returns {Promise<void>}
 */
export const deleteImage = async (imageUrl) => {
  try {
    const existingImages = JSON.parse(localStorage.getItem('evervow_images') || '[]');
    const updatedImages = existingImages.filter(img =>
      img.dataUrl !== imageUrl && img.id !== imageUrl
    );

    localStorage.setItem('evervow_images', JSON.stringify(updatedImages));
    console.log('✅ 이미지 삭제 성공 (localStorage)');

  } catch (error) {
    console.error('❌ 이미지 삭제 실패:', error);
    throw new Error(`이미지 삭제에 실패했습니다: ${error.message}`);
  }
};

/**
 * localStorage에서 모든 이미지 목록 조회
 * @returns {Array} - 저장된 이미지 목록
 */
export const getAllImages = () => {
  try {
    return JSON.parse(localStorage.getItem('evervow_images') || '[]');
  } catch (error) {
    console.error('❌ 이미지 목록 조회 실패:', error);
    return [];
  }
};

/**
 * localStorage 사용량 확인
 * @returns {Object} - 사용량 정보
 */
export const getStorageUsage = () => {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length;
      }
    }

    const usageInMB = (totalSize / (1024 * 1024)).toFixed(2);
    return {
      totalSize,
      usageInMB,
      remainingMB: Math.max(0, 5 - parseFloat(usageInMB)) // 5MB 기준
    };
  } catch (error) {
    return { totalSize: 0, usageInMB: '0.00', remainingMB: 5 };
  }
};

/**
 * 이미지 파일 유효성 검사
 * @param {File} file - 검사할 파일
 * @param {number} maxSize - 최대 파일 크기 (바이트, 기본: 5MB - 압축 전 원본 기준)
 * @returns {boolean} - 유효하면 true
 */
export const validateImageFile = (file, maxSize = 5 * 1024 * 1024) => {
  // 파일 타입 검사
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('지원하지 않는 파일 형식입니다. JPG, PNG, GIF, WebP만 업로드 가능합니다.');
  }

  // 파일 크기 검사
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    throw new Error(`파일 크기가 너무 큽니다. 최대 ${maxSizeMB}MB까지 업로드 가능합니다.`);
  }

  return true;
};
