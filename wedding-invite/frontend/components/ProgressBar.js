export default function ProgressBar({
  currentStep = 1,
  totalSteps = 3,
  showStepText = true,
  showPercentage = false,
  className = "",
  size = "medium",
  ...props
}) {
  const progress = (currentStep / totalSteps) * 100;

  const sizes = {
    small: "h-1",
    medium: "h-2",
    large: "h-3"
  };

  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {showStepText && (
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>{currentStep}단계 / {totalSteps}단계</span>
          {showPercentage && (
            <span>{Math.round(progress)}%</span>
          )}
        </div>
      )}

      <div className={`w-full bg-gray-200 rounded-full ${sizes[size]}`}>
        <div
          className={`bg-gold ${sizes[size]} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

