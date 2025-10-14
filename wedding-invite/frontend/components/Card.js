export default function Card({
  children,
  className = "",
  padding = "medium",
  shadow = "medium",
  hover = false,
  ...props
}) {
  const baseStyles = "bg-white rounded-2xl transition-all duration-300";

  const paddings = {
    small: "p-4",
    medium: "p-6",
    large: "p-8"
  };

  const shadows = {
    none: "",
    small: "shadow-sm",
    medium: "shadow-md",
    large: "shadow-lg"
  };

  const hoverStyles = hover ? "hover:shadow-lg hover:-translate-y-1" : "";

  const cardClasses = `${baseStyles} ${paddings[padding]} ${shadows[shadow]} ${hoverStyles} ${className}`;

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
}

