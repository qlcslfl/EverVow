// 버튼 컴포넌트 예시
export default function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

