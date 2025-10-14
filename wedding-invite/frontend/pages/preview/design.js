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

export default function PreviewDesign() {
  const router = useRouter();
  const { invitationId, designId } = router.query;
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!invitationId || !designId) return;
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const existingData = localStorage.getItem("evervow_invitations");
        const invitations = existingData ? JSON.parse(existingData) : [];
        const found = invitations.find((item) => item.id === invitationId);
        setInvitation(found || null);
      }
      setLoading(false);
    }, 600); // skeleton 애니메이션용 딜레이
  }, [invitationId, designId]);

  const template = DESIGN_TEMPLATES.find(t => t.id === Number(designId));

  // 애니메이션 스타일
  const cardAnim = {
    animation: "fadeScaleIn 0.3s"
  };

  return (
    <div style={{ background: "#F9F9F9", minHeight: "100vh" }}>
      <style jsx>{`
        @keyframes fadeScaleIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .skeleton {
          background: linear-gradient(90deg, #ececec 25%, #f3f3f3 50%, #ececec 75%);
          background-size: 200% 100%;
          animation: skeleton 1.2s infinite linear;
        }
        @keyframes skeleton {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
      <div className="max-w-xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">미리보기</h2>
        <div className="flex justify-center">
          <div
            className={`w-full max-w-md rounded-2xl shadow-md ${template?.bg || 'bg-white'} p-8 relative`}
            style={{ ...cardAnim, boxShadow: "0 2px 16px 0 rgba(0,0,0,0.07)" }}
          >
            {loading || !invitation ? (
              <div className="space-y-4">
                <div className="h-8 w-2/3 skeleton rounded"></div>
                <div className="h-6 w-1/2 skeleton rounded"></div>
                <div className="h-6 w-1/3 skeleton rounded"></div>
                <div className="h-32 w-full skeleton rounded"></div>
              </div>
            ) : (
              <div className="fade-in">
                <div className="text-xl font-semibold mb-2" style={{ color: template?.accent }}>{invitation.groom_kor_name} ♥ {invitation.bride_kor_name}</div>
                <div className="text-gray-700 mb-1">{invitation.wedding_date} {invitation.wedding_time}</div>
                <div className="text-gray-700 mb-1">{invitation.venue}</div>
                <div className="text-gray-500 mb-4">{invitation.venue_address}</div>
                <div className="text-gray-700 whitespace-pre-line mb-4">{invitation.message}</div>
                <div className="text-xs text-gray-400">디자인: {template?.title}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-4 mt-10 justify-center">
          <button
            className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 font-semibold transition-colors duration-200 hover:bg-gray-300"
            onClick={() => router.push(`/form?id=${invitationId}`)}
          >
            수정하기
          </button>
          <button
            className="px-6 py-3 rounded-full bg-gold text-white font-semibold transition-colors duration-200 hover:bg-yellow-500"
            onClick={() => router.push(`/admin`)}
          >
            다음 단계
          </button>
        </div>
      </div>
    </div>
  );
}

