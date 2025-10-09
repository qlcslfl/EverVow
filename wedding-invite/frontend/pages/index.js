export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">모바일 청첩장 서비스</h1>
        <ul className="list-disc ml-6 mb-6 text-lg text-gray-700">
          <li>고객 정보 입력 폼 제공</li>
          <li>여러 디자인 중 선택 가능</li>
          <li>꾸미기(스티커 등) 기능 지원</li>
          <li>샘플 제작 및 미리보기 제공</li>
          <li>정보/디자인 수정 가능</li>
          <li>최종본 링크 제공</li>
        </ul>
        <a href="/form" className="block w-full text-center bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg shadow transition">청첩장 만들기 시작</a>
      </div>
    </main>
  );
}

