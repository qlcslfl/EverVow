import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaCommentDots, FaUniversity } from "react-icons/fa";

const defaultMessage = "두 사람이 만나 사랑을 키워온 시간만큼, 소중한 분들과 함께하는 이 날이 더욱 특별해집니다. 축복해주셔서 감사합니다.";

const banks = [
  "국민은행", "신한은행", "우리은행", "하나은행", "농협", "기업은행", "카카오뱅크", "토스뱅크", "SC제일은행", "씨티은행", "부산은행", "경남은행", "대구은행", "광주은행", "전북은행", "제주은행", "새마을금고", "신협", "우체국", "산업은행", "수협", "한국증권금융", "삼성증권", "NH투자증권", "미래에셋증권", "한국투자증권", "키움증권", "신한투자증권", "KB증권", "하나증권", "대신증권", "유안타증권", "SK증권", "IBK투자증권"
];

function InputGroup({ title, children }) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6 mb-6 border border-slate-700">
      <h2 className="text-lg font-bold text-white mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function LabeledInput({ icon, label, ...props }) {
  return (
    <div className="flex items-center bg-slate-700 rounded-lg px-3 py-2">
      <span className="text-slate-300 mr-2 text-xl">{icon}</span>
      <label className="text-slate-200 font-semibold mr-3 min-w-[90px] text-base">{label}</label>
      <input className="flex-1 bg-transparent border-b border-slate-500 text-white px-2 py-1 focus:outline-none text-base" {...props} />
    </div>
  );
}

function AccountInput({ label, value, onChange, bank, onBankChange }) {
  return (
    <div className="flex items-center bg-slate-700 rounded-lg px-3 py-2">
      <span className="text-slate-300 mr-2 text-xl"><FaUniversity /></span>
      <label className="text-slate-200 font-semibold mr-3 min-w-[90px] text-base">{label}</label>
      <input className="flex-1 bg-transparent border-b border-slate-500 text-white px-2 py-1 focus:outline-none text-base" value={value} onChange={onChange} />
      <select className="ml-2 bg-slate-600 text-white rounded px-2 py-1 text-base" value={bank} onChange={onBankChange}>
        <option value="">금융사 선택</option>
        {banks.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
    </div>
  );
}

export default function Form() {
  const [form, setForm] = useState({
    groomKr: "", groomEn: "", brideKr: "", brideEn: "",
    location: "", locationDetail: "", date: "", time: "",
    message: defaultMessage,
    groomFather: "", groomMother: "", brideFather: "", brideMother: "",
    groomAccount: "", groomAccountBank: "",
    brideAccount: "", brideAccountBank: "",
    groomFatherAccount: "", groomFatherAccountBank: "",
    groomMotherAccount: "", groomMotherAccountBank: "",
    brideFatherAccount: "", brideFatherAccountBank: "",
    brideMotherAccount: "", brideMotherAccountBank: ""
  });
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // ...지도 검색 등은 추후 구현

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex justify-center items-center py-8">
      <form className="w-full max-w-2xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-2xl space-y-8">
        <InputGroup title="신랑/신부 정보">
          <LabeledInput icon={<FaUser />} label="신랑 한글" name="groomKr" value={form.groomKr} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신랑 영어" name="groomEn" value={form.groomEn} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신부 한글" name="brideKr" value={form.brideKr} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신부 영어" name="brideEn" value={form.brideEn} onChange={handleChange} />
        </InputGroup>
        <InputGroup title="웨딩홀/일시">
          <div className="flex gap-2">
            <LabeledInput icon={<FaMapMarkerAlt />} label="웨딩홀명" name="location" value={form.location} onChange={handleChange} />
            <button type="button" className="bg-pink-600 text-white px-3 py-2 rounded-lg shadow hover:bg-pink-700" onClick={() => setShowLocationPopup(true)}>
              <FaMapMarkerAlt />
            </button>
            <input className="flex-1 bg-slate-700 border-b border-slate-500 text-white px-2 py-1 rounded-lg ml-2" placeholder="선택된 주소" name="locationDetail" value={form.locationDetail} onChange={handleChange} />
          </div>
          <div className="flex gap-2">
            <LabeledInput icon={<FaCalendarAlt />} label="날짜" name="date" type="date" value={form.date} onChange={handleChange} />
            <LabeledInput icon={<FaClock />} label="시간" name="time" value={form.time} onChange={handleChange} />
          </div>
        </InputGroup>
        <InputGroup title="축하 메시지">
          <div className="bg-slate-700 rounded-lg p-4 flex items-start">
            <span className="text-slate-300 mr-2 text-xl"><FaCommentDots /></span>
            <textarea name="message" value={form.message} onChange={handleChange} maxLength={2000} className="flex-1 bg-transparent border-b border-slate-500 text-white px-2 py-1 focus:outline-none text-base min-h-[80px]" />
          </div>
        </InputGroup>
        <InputGroup title="부모님 성함">
          <LabeledInput icon={<FaUser />} label="신랑 아버지" name="groomFather" value={form.groomFather} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신랑 어머니" name="groomMother" value={form.groomMother} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신부 아버지" name="brideFather" value={form.brideFather} onChange={handleChange} />
          <LabeledInput icon={<FaUser />} label="신부 어머니" name="brideMother" value={form.brideMother} onChange={handleChange} />
        </InputGroup>
        <InputGroup title="계좌 정보">
          <AccountInput label="신랑" value={form.groomAccount} onChange={e => setForm({ ...form, groomAccount: e.target.value })} bank={form.groomAccountBank} onBankChange={e => setForm({ ...form, groomAccountBank: e.target.value })} />
          <AccountInput label="신부" value={form.brideAccount} onChange={e => setForm({ ...form, brideAccount: e.target.value })} bank={form.brideAccountBank} onBankChange={e => setForm({ ...form, brideAccountBank: e.target.value })} />
          <AccountInput label="신랑 아버지" value={form.groomFatherAccount} onChange={e => setForm({ ...form, groomFatherAccount: e.target.value })} bank={form.groomFatherAccountBank} onBankChange={e => setForm({ ...form, groomFatherAccountBank: e.target.value })} />
          <AccountInput label="신랑 어머니" value={form.groomMotherAccount} onChange={e => setForm({ ...form, groomMotherAccount: e.target.value })} bank={form.groomMotherAccountBank} onBankChange={e => setForm({ ...form, groomMotherAccountBank: e.target.value })} />
          <AccountInput label="신부 아버지" value={form.brideFatherAccount} onChange={e => setForm({ ...form, brideFatherAccount: e.target.value })} bank={form.brideFatherAccountBank} onBankChange={e => setForm({ ...form, brideFatherAccountBank: e.target.value })} />
          <AccountInput label="신부 어머니" value={form.brideMotherAccount} onChange={e => setForm({ ...form, brideMotherAccount: e.target.value })} bank={form.brideMotherAccountBank} onBankChange={e => setForm({ ...form, brideMotherAccountBank: e.target.value })} />
        </InputGroup>
        <button type="submit" className="w-full py-4 mt-4 bg-pink-600 text-white text-xl font-bold rounded-xl shadow-lg hover:bg-pink-700 transition-all duration-200">
          샘플 제작하기
        </button>
      </form>
      {/* 지도 검색 팝업 등은 추후 구현 */}
    </div>
  );
}
