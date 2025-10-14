export default function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className = "",
  ...props
}) {
  const inputId = `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-600"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-2xl transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-20 focus:border-gold
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-400'
            : 'border-gray-300 hover:border-gray-400'
          }
        `}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

