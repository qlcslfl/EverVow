import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const DESIGN_TEMPLATES = [
	{
		id: 1,
		title: "Modern Minimal",
		accent: "#D4AF37",
		bg: "bg-gradient-to-br from-gray-100 to-gray-200",
	},
	{
		id: 2,
		title: "Classic Elegant",
		accent: "#be185d",
		bg: "bg-gradient-to-br from-rose-50 to-rose-100",
	},
	{
		id: 3,
		title: "Nature Garden",
		accent: "#059669",
		bg: "bg-gradient-to-br from-green-50 to-emerald-100",
	},
	{
		id: 4,
		title: "Vintage Romance",
		accent: "#c026d3",
		bg: "bg-gradient-to-br from-purple-50 to-pink-100",
	},
	{
		id: 5,
		title: "Luxury Gold",
		accent: "#d97706",
		bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
	},
	{
		id: 6,
		title: "Ocean Blue",
		accent: "#0891b2",
		bg: "bg-gradient-to-br from-blue-50 to-cyan-100",
	},
];

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
		DESIGN_TEMPLATES.find((t) => t.id === Number(designId)) ||
		DESIGN_TEMPLATES[0];
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
					animation: skeleton 1.2s infinite linear;
				}
				@keyframes skeleton {
					0% {
						background-position: 200% 0;
					}
					100% {
						background-position: -200% 0;
					}
				}
			`}</style>
			{/* 헤더: 엠블럼 + 제목 + 단계 */}
			<header className="bg-white border-b border-gray-200 sticky top-0 z-10">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
					<div className="flex items-center justify-between">
						<div className="w-20"></div>
						<div className="text-center flex items-center space-x-2">
							<img
								src="/EverVowImage.png"
								alt="EverVow Logo"
								width={24}
								height={24}
								className="rounded"
							/>
							<div>
								<h1 className="text-lg font-semibold text-gray-800">
									미리보기
								</h1>
								<p className="text-sm text-gray-500">3단계 / 3단계</p>
							</div>
						</div>
						<div className="w-20"></div>
					</div>
					{/* 진행률 바 */}
					<div className="mt-4">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-gold h-2 rounded-full transition-all duration-500"
								style={{ width: "100%" }}
							></div>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-xl mx-auto px-4 py-10">
				<div className="flex justify-center">
					<div
						className={`w-full max-w-md rounded-2xl shadow-lg ${template.bg} p-8 relative border border-gray-100`}
						style={{
							...cardAnim,
							boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)",
						}}
					>
						{!isClient || loading ? (
							<div className="space-y-4 animate-pulse">
								<div className="h-8 w-2/3 skeleton rounded"></div>
								<div className="h-6 w-1/2 skeleton rounded"></div>
								<div className="h-6 w-1/3 skeleton rounded"></div>
								<div className="h-32 w-full skeleton rounded"></div>
							</div>
						) : invitation ? (
							<div className="fade-in">
								<div className="flex flex-col items-center mb-4">
									<span
										className="text-2xl font-bold mb-1"
										style={{ color: template.accent }}
									>
										{invitation.groom_kor_name} ♥{" "}
										{invitation.bride_kor_name}
									</span>
									<span className="text-sm text-gray-500 mb-2">
										{invitation.groom_eng_name} &{" "}
										{invitation.bride_eng_name}
									</span>
								</div>
								<div className="text-center mb-2">
									<span className="text-base font-semibold text-gray-700">
										{invitation.wedding_date} {invitation.wedding_time}
									</span>
								</div>
								<div className="text-center mb-2">
									<span className="text-base text-gray-700">
										{invitation.venue}
									</span>
								</div>
								<div className="text-center mb-4">
									<span className="text-sm text-gray-400">
										{invitation.venue_address}
									</span>
								</div>
								<div className="bg-white/60 rounded-lg p-4 mb-4 text-gray-700 text-sm whitespace-pre-line shadow-sm">
									{invitation.message}
								</div>
								<div className="text-xs text-gray-400 text-right">
									디자인: {template.title}
								</div>
							</div>
						) : (
							<div className="space-y-4 animate-pulse">
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
						onClick={() => router.push(`/invite/${id}`)}
					>
						다음 단계
					</button>
				</div>
			</div>
		</div>
	);
}
