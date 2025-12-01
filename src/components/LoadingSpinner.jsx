const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-20 h-20 border-4 border-green-200 border-t-green-600 
                        rounded-full animate-spin"></div>
        
        {/* Center bouncing plant */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl animate-bounce">
            🌱
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;