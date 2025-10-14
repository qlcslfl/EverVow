export default function SectionTitle({
  children,
  subtitle,
  align = "center",
  size = "large",
  className = "",
  showLine = false,
  ...props
}) {
  const alignments = {
    left: "text-left",
    center: "text-center",
    right: "text-right"
  };

  const sizes = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-3xl lg:text-4xl"
  };

  const containerClasses = `space-y-2 ${alignments[align]} ${className}`;
  const titleClasses = `${sizes[size]} font-light text-gray-800`;

  return (
    <div className={containerClasses} {...props}>
      <h2 className={titleClasses}>
        {children}
      </h2>

      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {showLine && (
        <div className="w-16 h-px bg-gold mx-auto"></div>
      )}
    </div>
  );
}

