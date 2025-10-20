import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { templateMetadata } from '../../utils/templates';

export default function Preview() {
	const router = useRouter();
	const { id, designId } = router.query;
	const [invitation, setInvitation] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		if (!id) return;
		setLoading(true);
		setTimeout(() => {
			if (typeof window !== "undefined") {
				const existingData = localStorage.getItem("evervow_invitations");
				const invitations = existingData ? JSON.parse(existingData) : [];
				const found = invitations.find((item) => item.id === id);
				setInvitation(found || null);
			}
			setLoading(false);
		}, 500);
	}, [id]);

	const template =
		templateMetadata.find((t) => t.id === Number(designId)) ||
		templateMetadata[0];
	const cardAnim = { animation: "fadeScaleIn 0.3s" };

	return (
		<div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
			<style jsx>{`
				@keyframes fadeScaleIn {
					0% {
						opacity: 0;
						transform: scale(0.95);
					}
					100% {
						opacity: 1;
						transform: scale(1);
					}
				}
				.skeleton {
					background: linear-gradient(
						90deg,
						#ececec 25%,
						#f3f3f3 50%,
						#ececec 75%
					);
					background-size: 200% 100%;
					animation: loading 1.5s infinite;
				}
				@keyframes loading {
					0% {
						background-position: 200% 0;
					}
					100% {
						background-position: -200% 0;
					}
				}
				.fade-in {
					animation: fadeIn 0.4s ease-in;
				}
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
			`}</style>

			{/* 헤더 */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 bg-white border-b border-gray-200">
				<div className="flex items-center justify-between">
					<button
						className="flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors"
						onClick={() => router.push("/design")}
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
						<span>디자인 선택으로 돌아가기</span>
					</button>
					<div className="text-center">
						<h1 className="text-lg font-semibold text-gray-800">미리보기</h1>
						<p className="text-sm text-gray-500">3단계 / 3단계</p>
					</div>
					<div className="w-40"></div>
				</div>
			</div>

			{/* 메인 콘텐츠 */}
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
				<div className="flex flex-col items-center justify-center min-h-[70vh]">
					<div
						className={`w-full max-w-md rounded-2xl shadow-lg bg-gradient-to-br ${template.color} p-8 relative border border-gray-100`}
						style={{
							...cardAnim,
							boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
						}}
					>
						{/* 오버레이 효과 */}
						<div className={`absolute inset-0 rounded-2xl ${template.overlayEffect}`}></div>

						{!isClient || loading ? (
							<div className="space-y-4 animate-pulse relative z-10">
								<div className="h-8 w-2/3 skeleton rounded"></div>
								<div className="h-6 w-1/2 skeleton rounded"></div>
								<div className="h-6 w-1/3 skeleton rounded"></div>
								<div className="h-32 w-full skeleton rounded"></div>
							</div>
						) : invitation ? (
							<div className="fade-in relative z-10">
								<div className="flex flex-col items-center mb-6">
									<div
										className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
										style={{ backgroundColor: template.accent + '20' }}
									>
										<span className="text-2xl">{template.icon}</span>
									</div>
									<span
										className={`text-2xl font-bold mb-2 ${template.fontStyle}`}
										style={{ color: template.accent }}
									>
										{invitation.groom_kor_name} ♥{" "}
										{invitation.bride_kor_name}
									</span>
									<span className={`text-sm mb-2 ${template.textColor}`}>
										{invitation.groom_eng_name} &{" "}
										{invitation.bride_eng_name}
									</span>
								</div>

								<div className="h-1 w-16 mx-auto rounded mb-6" style={{ backgroundColor: template.accent }}></div>

								<div className="text-center mb-4">
									<span className={`text-base font-semibold ${template.textColor}`}>
										{invitation.wedding_date} {invitation.wedding_time}
									</span>
								</div>
								<div className="text-center mb-4">
									<span className={`text-base ${template.textColor}`}>
										{invitation.venue}
									</span>
								</div>
								<div className="text-center mb-6">
									<span className={`text-sm ${template.textColor} opacity-80`}>
										{invitation.venue_address}
									</span>
								</div>
								<div className={`${template.cardBg} rounded-lg p-4 mb-4 text-sm whitespace-pre-line shadow-sm`}>
									<p className="text-gray-700">{invitation.message}</p>
								</div>
								<div className="text-xs text-right text-gray-600">
									디자인: {template.title}
								</div>
							</div>
						) : (
							<div className="space-y-4 animate-pulse relative z-10">
								<div className="h-8 w-2/3 skeleton rounded"></div>
								<div className="h-6 w-1/2 skeleton rounded"></div>
								<div className="h-6 w-1/3 skeleton rounded"></div>
								<div className="h-32 w-full skeleton rounded"></div>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* 하단 푸터 버튼 */}
			<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
				<div className="max-w-6xl mx-auto flex gap-4">
					<button
						className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-50 transition-colors"
						onClick={() => router.push("/design")}
					>
						수정하기
					</button>
					<button
						className="flex-1 py-4 rounded-xl font-medium bg-gold text-white hover:bg-opacity-90 hover:shadow-lg transition-all duration-300"
						onClick={() => router.push(`/invite/${id}?designId=${designId}`)}
					>
						다음 단계
					</button>
				</div>
			</div>
		</div>
	);
}
