import { useState, useEffect } from 'react';

const SuccessAlert = ({ 
  message = "Successfully completed!", 
  duration = 3000,
  onClose 
}) => {
  const [show, setShow] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after mount
    setTimeout(() => setAnimate(true), 100);

    // Auto close
    if (duration) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4 shadow-xl transform transition-all duration-300 scale-100">
        <div className="relative w-16 h-16">
          {/* Circle Border */}
          <div className={`absolute inset-0 border-2 border-black rounded-full transition-all duration-500 
            ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} 
          />
          
          {/* Checkmark */}
          <svg 
            className={`absolute inset-0 w-16 h-16 transition-all duration-500
              ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3}
              d="M5 13l4 4L19 7"
              className={`
                ${animate ? 'animate-[dash_0.5s_ease-out_0.2s_forwards]' : ''}
                [stroke-dasharray:30]
                [stroke-dashoffset:30]
              `}
            />
          </svg>
        </div>
        <p className="text-gray-800 font-medium text-lg text-center">
          {message}
        </p>
      </div>

      {/* Add the dash animation in the same component */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default SuccessAlert;