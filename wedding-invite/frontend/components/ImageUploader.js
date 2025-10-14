// 이미지 업로드 컴포넌트 (Base64 방식 + 압축)
import { useState, useId } from 'react';
import { uploadImage, uploadMultipleImages, validateImageFile, getStorageUsage } from '../utils/imageUpload';

const ImageUploader = ({
  onUploadComplete,
  multiple = false,
  folder = 'images',
  maxFiles = 5,
  className = ''
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [compressionInfo, setCompressionInfo] = useState('');

  // 각 컴포넌트 인스턴스마다 고유한 ID 생성
  const uniqueId = useId();
  const inputId = `image-upload-${uniqueId}`;

  const handleFileSelect = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      // 저장 공간 확인
      const storageUsage = getStorageUsage();
      if (storageUsage.remainingMB < 1) {
        alert('저장 공간이 부족합니다. 기존 이미지를 삭제한 후 다시 시도해주세요.');
        return;
      }

      // 파일 개수 제한 확인
      if (multiple && files.length > maxFiles) {
        alert(`최대 ${maxFiles}개까지만 선택할 수 있습니다.`);
        return;
      }

      // 파일 유효성 검사
      Array.from(files).forEach(file => validateImageFile(file));

      // 미리보기 생성
      const previews = Array.from(files).map(file => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
        size: (file.size / 1024).toFixed(1) + 'KB'
      }));
      setPreviewUrls(previews);

      setUploading(true);
      setUploadProgress(20);
      setCompressionInfo('이미지를 압축하고 있습니다...');

      let uploadedUrls = [];

      if (multiple) {
        // 다중 파일 업로드
        setUploadProgress(40);
        uploadedUrls = await uploadMultipleImages(files, folder);
        setUploadProgress(90);
      } else {
        // 단일 파일 업로드
        setUploadProgress(50);
        const uploadedUrl = await uploadImage(files[0], folder);
        uploadedUrls = [uploadedUrl];
        setUploadProgress(90);
      }

      // 업로드 완료 콜백
      onUploadComplete(uploadedUrls);
      setUploadProgress(100);

      // 성공 메시지
      const fileCount = uploadedUrls.length;
      setCompressionInfo(`✅ ${fileCount}개 이미지가 압축되어 업로드되었습니다.`);

      // 저장 공간 정보 업데이트
      const newStorageUsage = getStorageUsage();
      setTimeout(() => {
        setCompressionInfo(`저장 공간: ${newStorageUsage.usageInMB}MB / 5MB 사용중`);
      }, 2000);

    } catch (error) {
      console.error('업로드 오류:', error);
      setCompressionInfo('');

      // 더 친화적인 오류 메시지
      if (error.message.includes('저장할 수 없습니다')) {
        alert('이미지가 너무 커서 저장할 수 없습니다.\n더 작은 이미지를 선택하거나 기존 이미지를 삭제해주세요.');
      } else {
        alert(error.message);
      }
      setPreviewUrls([]);
    } finally {
      setUploading(false);
      // 진행률 초기화 (2초 후)
      setTimeout(() => {
        setUploadProgress(0);
        if (compressionInfo.includes('✅')) {
          setCompressionInfo('');
        }
      }, 2000);
    }
  };

  const removePreview = (index) => {
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);
  };

  // 저장 공간 정보
  const storageUsage = getStorageUsage();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 파일 선택 버튼 */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-colors">
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={inputId}
        />
        <label
          htmlFor={inputId}
          className={`cursor-pointer flex flex-col items-center space-y-2 ${uploading ? 'opacity-50' : ''}`}
        >
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="text-gray-600 font-medium">
            {uploading ? '업로드 중...' : '이미지를 선택하거나 드래그하세요'}
          </span>
          <span className="text-sm text-gray-400">
            JPG, PNG, GIF, WebP (최대 5MB{multiple ? `, ${maxFiles}개까지` : ''})
          </span>
          <span className="text-xs text-gray-400">
            * 이미지는 자동으로 압축되어 저장됩니다
          </span>
        </label>
      </div>

      {/* 저장 공간 정보 */}
      <div className="text-xs text-gray-500 text-center">
        저장 공간: {storageUsage.usageInMB}MB / 5MB 사용중
        {storageUsage.remainingMB < 1 && (
          <span className="text-red-500 ml-2">⚠️ 공간 부족</span>
        )}
      </div>

      {/* 압축 정보 */}
      {compressionInfo && (
        <div className="text-sm text-center p-2 bg-blue-50 text-blue-700 rounded-lg">
          {compressionInfo}
        </div>
      )}

      {/* 업로드 진행률 */}
      {uploading && uploadProgress > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-amber-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}

      {/* 미리보기 */}
      {previewUrls.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">선택된 파일:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {previewUrls.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview.url}
                  alt={preview.name}
                  className="w-full h-24 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removePreview(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  ×
                </button>
                <div className="text-xs text-gray-500 mt-1">
                  <p className="truncate">{preview.name}</p>
                  <p>{preview.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
