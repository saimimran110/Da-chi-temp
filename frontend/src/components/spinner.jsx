import React from 'react';

const LoadingSpinner = ({ 
  size = 'default', 
  light = false, 
  fullScreen = false,
  message = 'Loading...',
  className = ''
}) => {
  // Size variations for the spinner
  const sizeClasses = {
    xs: 'w-4 h-4',
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Base spinner component
  const Spinner = () => (
    <div className={`relative ${sizeClasses[size] || sizeClasses.default}`}>
      <div className="absolute inset-0 border-4 border-t-transparent border-solid rounded-full animate-spin-fast"></div>
      <div className="absolute inset-0 border-4 border-b-transparent border-solid rounded-full animate-spin-slow"></div>
    </div>
  );

  // If fullScreen is true, render with overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
        <Spinner />
        {message && <p className="mt-4 text-white text-lg">{message}</p>}
      </div>
    );
  }

  // Default centered spinner
  return (
    <div className="flex flex-col items-center justify-center">
      <Spinner />
      {message && (
        <p className={`mt-2 text-sm ${light ? 'text-white' : 'text-gray-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

// Add the CSS for the spinner animations
<style jsx>{`
  @keyframes spin-fast {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes spin-slow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-360deg); }
  }

  .animate-spin-fast {
    animation: spin-fast 0.8s linear infinite;
  }

  .animate-spin-slow {
    animation: spin-slow 1.6s linear infinite;
  }
`}</style>