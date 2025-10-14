export default function Button({
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles = "font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold text-white hover:bg-opacity-90 hover:scale-105 shadow-md",
    outline: "border-2 border-gold text-gold bg-transparent hover:bg-gold hover:text-white",
    ghost: "text-gray-700 bg-transparent hover:bg-gray-100 hover:text-gold"
  };

  const sizes = {
    small: "px-4 py-2 text-sm rounded-xl",
    medium: "px-6 py-3 text-base rounded-2xl",
    large: "px-8 py-4 text-lg rounded-2xl"
  };

  const buttonClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

