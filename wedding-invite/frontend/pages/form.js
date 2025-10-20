import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageUploader from "../components/ImageUploader";
import { useRouter } from "next/router";

export default function Form() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // 커플 정보
    groomKorName: "",
    groomEngName: "",
    brideKorName: "",
    brideEngName: "",

    // 예식 정보
    weddingDate: "",
    weddingTime: "",
    venue: "",
    venueAddress: "",

    // 인사말
    message:
      "두 사람이 만나 사랑을 키워온 시간만큼,\n소중한 분들과 함께하는 이 날이 더욱 특별해집니다.\n축복해주셔서 감사합니다.",

    // 연락처 정보
    groomPhone: "",
    bridePhone: "",
    groomFatherName: "",
    groomFatherTitle: "", // 추가: 아버님 호칭
    groomMotherName: "",
    groomMotherTitle: "", // 추가: 어머님 호칭
    brideFatherName: "",
    brideFatherTitle: "", // 추가: 아버님 호칭
    brideMotherName: "",
    brideMotherTitle: "", // 추가: 어머님 호칭

    // 계좌 정보
    groomAccount: "",
    groomBank: "",
    brideAccount: "",
    brideBank: "",
    groomFatherAccount: "",
    groomFatherBank: "",
    groomMotherAccount: "",
    groomMotherBank: "",
    brideFatherAccount: "",
    brideFatherBank: "",
    brideMotherAccount: "",
    brideMotherBank: "",

    // 갤러리 이미지 URLs (Firebase Storage)
    galleryImages: [],

    // 타이틀 이미지 URL (Base64) - 1장만
    titleImage: "",

    // 선택된 디자인 ID
    designId: null
  });

  const banks = [
    "국민은행",
    "신한은행",
    "우리은행",
    "하나은행",
    "KEB하나은행",
    "농협은행",
    "기업은행",
    "씨티은행",
    "SC제일은행",
    "경남은행",
    "광주은행",
    "대구은행",
    "부산은행",
    "전북은행",
    "제주은행",
    "케이뱅크",
    "카카오뱅크",
    "토스뱅크",
    "새마을금고",
    "신협",
  ];

  // 호칭 옵션
  const titleOptions = ["", "故"];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 시간 입력 시 5분 단위로 자동 조정
  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    if (timeValue) {
      const [hours, minutes] = timeValue.split(':');
      const adjustedMinutes = Math.round(parseInt(minutes) / 5) * 5;
      const adjustedTime = `${hours}:${adjustedMinutes.toString().padStart(2, '0')}`;
      handleInputChange("weddingTime", adjustedTime);
    } else {
      handleInputChange("weddingTime", timeValue);
    }
  };

  // 이미지 업로드 완료 핸들러
  const handleImageUploadComplete = (uploadedUrls) => {
    console.log('🖼️ 이미지 업로드 완료:', uploadedUrls);
    console.log('📊 현재 갤러리 이미지 개수:', formData.galleryImages.length);

    setFormData(prev => {
      const newGalleryImages = [...prev.galleryImages, ...uploadedUrls];
      console.log('✅ 업데이트된 갤러리 이미지:', newGalleryImages);
      return {
        ...prev,
        galleryImages: newGalleryImages
      };
    });
  };

  // 이미지 삭제 핸들러
  const handleImageRemove = (indexToRemove) => {
    console.log('🗑️ 이미지 삭제 요청 - 인덱스:', indexToRemove);

    setFormData(prev => {
      const updatedImages = prev.galleryImages.filter((_, index) => index !== indexToRemove);
      console.log('✅ 삭제 후 갤러리 이미지:', updatedImages);
      return {
        ...prev,
        galleryImages: updatedImages
      };
    });
  };

  // 타이틀 이미지 업로드 완료 핸들러 (1장만)
  const handleTitleImageUploadComplete = (uploadedUrls) => {
    console.log('🖼️ 타이틀 이미지 업로드 완료:', uploadedUrls);

    if (uploadedUrls && uploadedUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        titleImage: uploadedUrls[0] // 첫 번째 이미지만 사용
      }));
      console.log('✅ 타이틀 이미지 설정됨:', uploadedUrls[0]);
    }
  };

  // 타이틀 이미지 삭제 핸들러
  const handleTitleImageRemove = () => {
    console.log('🗑️ 타이틀 이미지 삭제');
    setFormData(prev => ({
      ...prev,
      titleImage: ""
    }));
  };

  // 폼 제출 핸들러 (localStorage에 직접 저장)
  const handleSubmit = async () => {
    try {
      // 필수 필드 검증
      if (!formData.groomKorName || !formData.brideKorName || !formData.weddingDate || !formData.venue) {
        alert('필수 정보를 모두 입력해주세요.');
        return false;
      }

      // localStorage에 저장할 데이터 구성
      const invitationData = {
        groom_kor_name: formData.groomKorName,
        groom_eng_name: formData.groomEngName,
        bride_kor_name: formData.brideKorName,
        bride_eng_name: formData.brideEngName,
        groom_phone: formData.groomPhone,
        bride_phone: formData.bridePhone,
        wedding_date: formData.weddingDate,
        wedding_time: formData.weddingTime,
        venue: formData.venue,
        venue_address: formData.venueAddress,
        message: formData.message,
        groom_father_name: formData.groomFatherName,
        groom_father_title: formData.groomFatherTitle,
        groom_mother_name: formData.groomMotherName,
        groom_mother_title: formData.groomMotherTitle,
        bride_father_name: formData.brideFatherName,
        bride_father_title: formData.brideFatherTitle,
        bride_mother_name: formData.brideMotherName,
        bride_mother_title: formData.brideMotherTitle,
        account_info: {
          groom: { account: formData.groomAccount, bank: formData.groomBank },
          bride: { account: formData.brideAccount, bank: formData.brideBank },
          groomFather: { account: formData.groomFatherAccount, bank: formData.groomFatherBank },
          groomMother: { account: formData.groomMotherAccount, bank: formData.groomMotherBank },
          brideFather: { account: formData.brideFatherAccount, bank: formData.brideFatherBank },
          brideMother: { account: formData.brideMotherAccount, bank: formData.brideMotherBank }
        },
        gallery_images: formData.galleryImages,
        title_image: formData.titleImage, // 타이틀 이미지 추가
        design_id: formData.designId,
        status: 'draft'
      };

      // localStorage에 직접 저장
      if (typeof window !== 'undefined') {
        const existingData = localStorage.getItem('evervow_invitations');
        const invitations = existingData ? JSON.parse(existingData) : [];

        const newInvitation = {
          ...invitationData,
          id: 'inv_' + Date.now(),
          share_url: Date.now().toString(36) + Math.random().toString(36).substring(2, 8),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        invitations.push(newInvitation);
        localStorage.setItem('evervow_invitations', JSON.stringify(invitations));

        console.log('청첩장이 저장되었습니다:', newInvitation);
        alert('청첩장 정보가 저장되었습니다. 다음 단계인 디자인 선택으로 이동합니다.');

        // 관리자 페이지로 이동 (옵션)
        // router.push('/admin');
      } else {
        throw new Error('브라우저 환경이 아닙니다.');
      }

      return true;
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다: ' + error.message);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await handleSubmit();
    if (isValid) {
      router.push("/design");
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-['Pretendard','Noto_Sans_KR',sans-serif]">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>뒤로가기</span>
            </Link>

            <div className="text-center flex items-center space-x-2">
              <Image
                src="/EverVowImage.png"
                alt="EverVow Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  청첩장 만들기
                </h1>
                <p className="text-sm text-gray-500">1단계 / 3단계</p>
              </div>
            </div>

            <div className="w-20"></div> {/* 균형을 위한 빈 공간 */}
          </div>

          {/* 진행률 바 */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <div className="space-y-8">
          {/* 페이지 제목 */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-light text-gray-800">
              청첩장 정보를 입력해주세요
            </h2>
            <p className="text-gray-600">입력하신 정보로 청첩장을 제작합니다</p>
          </div>

          {/* 커플 정보 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              🤵🏻👰🏻‍ 커플정보
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">🤵🏻 신랑</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    한글 이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.groomKorName}
                    onChange={(e) =>
                      handleInputChange("groomKorName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="김민수"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    영어 이름
                  </label>
                  <input
                    type="text"
                    value={formData.groomEngName}
                    onChange={(e) =>
                      handleInputChange("groomEngName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="Kim Min Su"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.groomPhone}
                    onChange={(e) =>
                      handleInputChange("groomPhone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">👰🏻 신부‍</h4>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    한글 이름 *
                  </label>
                  <input
                    type="text"
                    value={formData.brideKorName}
                    onChange={(e) =>
                      handleInputChange("brideKorName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="이지영"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    영어 이름
                  </label>
                  <input
                    type="text"
                    value={formData.brideEngName}
                    onChange={(e) =>
                      handleInputChange("brideEngName", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="Lee Ji Young"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    value={formData.bridePhone}
                    onChange={(e) =>
                      handleInputChange("bridePhone", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    placeholder="010-9876-5432"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 예식 정보 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              💒 예식 정보
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  예식 날짜 *
                </label>
                <input
                  type="date"
                  value={formData.weddingDate}
                  onChange={(e) =>
                    handleInputChange("weddingDate", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  예식 시간 * <span className="text-xs text-gray-400">(5분 단위로 자동 조정됩니다)</span>
                </label>
                <input
                  type="time"
                  value={formData.weddingTime}
                  onChange={handleTimeChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                예식장명 *
              </label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => handleInputChange("venue", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                placeholder="그랜드 하얏트 서울"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                예식장 주소 *
              </label>
              <input
                type="text"
                value={formData.venueAddress}
                onChange={(e) =>
                  handleInputChange("venueAddress", e.target.value)
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                placeholder="서울시 용산구 한강대로 322"
                required
              />
            </div>
          </div>

          {/* 인사말 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              💌 인사말
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                청첩장에 들어갈 인사말 (최대 200자)
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={5}
                maxLength={200}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300 resize-none"
                placeholder="두 사람이 만나 사랑을 키워온 시간만큼..."
              />
              <div className="text-right text-sm text-gray-400 mt-1">
                {formData.message.length} / 200자
              </div>
            </div>
          </div>

          {/* 가족 정보 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              👨‍👩‍👧‍👦 가족 정보
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <h4 className="font-medium text-gray-700">신랑 측</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      아버님 성함
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.groomFatherTitle}
                        onChange={(e) =>
                          handleInputChange("groomFatherTitle", e.target.value)
                        }
                        className="w-14 px-1 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300 text-xs text-center"
                      >
                        {titleOptions.map((title) => (
                          <option key={title} value={title}>
                            {title || "-"}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.groomFatherName}
                        onChange={(e) =>
                          handleInputChange("groomFatherName", e.target.value)
                        }
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                        placeholder="김아버지"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      어머님 성함
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.groomMotherTitle}
                        onChange={(e) =>
                          handleInputChange("groomMotherTitle", e.target.value)
                        }
                        className="w-14 px-1 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300 text-xs text-center"
                      >
                        {titleOptions.map((title) => (
                          <option key={title} value={title}>
                            {title || "-"}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.groomMotherName}
                        onChange={(e) =>
                          handleInputChange("groomMotherName", e.target.value)
                        }
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                        placeholder="김어머니"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h4 className="font-medium text-gray-700">신부 측</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      아버님 성함
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.brideFatherTitle}
                        onChange={(e) =>
                          handleInputChange("brideFatherTitle", e.target.value)
                        }
                        className="w-14 px-1 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300 text-xs text-center"
                      >
                        {titleOptions.map((title) => (
                          <option key={title} value={title}>
                            {title || "-"}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.brideFatherName}
                        onChange={(e) =>
                          handleInputChange("brideFatherName", e.target.value)
                        }
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                        placeholder="이아버지"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      어머님 성함
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={formData.brideMotherTitle}
                        onChange={(e) =>
                          handleInputChange("brideMotherTitle", e.target.value)
                        }
                        className="w-14 px-1 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300 text-xs text-center"
                      >
                        {titleOptions.map((title) => (
                          <option key={title} value={title}>
                            {title || "-"}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={formData.brideMotherName}
                        onChange={(e) =>
                          handleInputChange("brideMotherName", e.target.value)
                        }
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                        placeholder="이어머니"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 계좌 정보 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              💳 계좌 정보 (선택사항)
            </h3>

            <div className="space-y-6">
              {/* 신랑신부 계좌 */}
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">신랑 계좌</h4>
                  <div className="flex gap-3">
                    <select
                      value={formData.groomBank}
                      onChange={(e) =>
                        handleInputChange("groomBank", e.target.value)
                      }
                      className="w-32 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    >
                      <option value="">은행선택</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.groomAccount}
                      onChange={(e) =>
                        handleInputChange("groomAccount", e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                      placeholder="계좌번호"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700">신부 계좌</h4>
                  <div className="flex gap-3">
                    <select
                      value={formData.brideBank}
                      onChange={(e) =>
                        handleInputChange("brideBank", e.target.value)
                      }
                      className="w-32 px-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                    >
                      <option value="">은행선택</option>
                      {banks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={formData.brideAccount}
                      onChange={(e) =>
                        handleInputChange("brideAccount", e.target.value)
                      }
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold transition-all duration-300"
                      placeholder="계좌번호"
                    />
                  </div>
                </div>
              </div>

              {/* 양가 부모님 계좌 */}
              <div className="border-t border-gray-100 pt-6">
                <h4 className="font-medium text-gray-700 mb-4">양가 부모님 계좌</h4>
                <div className="grid grid-cols-1 gap-6">
                  {/* 신랑 부모님 */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-600">신랑 측</h5>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        아버님
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.groomFatherBank}
                          onChange={(e) =>
                            handleInputChange("groomFatherBank", e.target.value)
                          }
                          className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                        >
                          <option value="">은행</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={formData.groomFatherAccount}
                          onChange={(e) =>
                            handleInputChange("groomFatherAccount", e.target.value)
                          }
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                          placeholder="계좌번호"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        어머님
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.groomMotherBank}
                          onChange={(e) =>
                            handleInputChange("groomMotherBank", e.target.value)
                          }
                          className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                        >
                          <option value="">은행</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={formData.groomMotherAccount}
                          onChange={(e) =>
                            handleInputChange("groomMotherAccount", e.target.value)
                          }
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                          placeholder="계좌번호"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 신부 부모님 */}
                  <div className="space-y-4">
                    <h5 className="text-sm font-medium text-gray-600">신부 측</h5>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        아버님
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.brideFatherBank}
                          onChange={(e) =>
                            handleInputChange("brideFatherBank", e.target.value)
                          }
                          className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                        >
                          <option value="">은행</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={formData.brideFatherAccount}
                          onChange={(e) =>
                            handleInputChange("brideFatherAccount", e.target.value)
                          }
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                          placeholder="계좌번호"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        어머님
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.brideMotherBank}
                          onChange={(e) =>
                            handleInputChange("brideMotherBank", e.target.value)
                          }
                          className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                        >
                          <option value="">은행</option>
                          {banks.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={formData.brideMotherAccount}
                          onChange={(e) =>
                            handleInputChange("brideMotherAccount", e.target.value)
                          }
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold"
                          placeholder="계좌번호"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 타이틀 이미지 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              🌟 대표 이미지
            </h3>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                청첩장 메인 화면에 표시될 대표 이미지를 업로드하세요. (1장만)
              </p>

              <ImageUploader
                onUploadComplete={handleTitleImageUploadComplete}
                multiple={false}
                folder="title"
                maxFiles={1}
              />

              {/* 업로드된 타이틀 이미지 미리보기 */}
              {formData.titleImage && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    대표 이미지
                  </h4>
                  <div className="relative group max-w-xs mx-auto">
                    <img
                      src={formData.titleImage}
                      alt="대표 이미지"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                    <button
                      onClick={handleTitleImageRemove}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="이미지 삭제"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 갤러리 섹션 (Firebase Storage) */}
          <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
            <h3 className="text-lg font-medium text-gray-800 border-b border-gray-100 pb-3">
              📸 갤러리
            </h3>

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                청첩장에 들어갈 사진을 업로드하세요. (최대 10장)
              </p>

              <ImageUploader
                onUploadComplete={handleImageUploadComplete}
                multiple={true}
                folder="gallery"
                maxFiles={10}
              />

              {/* 업로드된 이미지 미리보기 */}
              {formData.galleryImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    업로드된 이미지 ({formData.galleryImages.length}장)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.galleryImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`갤러리 이미지 ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => handleImageRemove(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          title="이미지 삭제"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          <button
            type="button"
            className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            임시저장
          </button>
          <button
            onClick={handleNext}
            className="flex-1 py-4 bg-gold text-white rounded-xl font-medium hover:bg-opacity-90 hover:shadow-lg transition-all duration-300"
          >
            다음 단계
          </button>
        </div>
      </div>
    </div>
  );
}
