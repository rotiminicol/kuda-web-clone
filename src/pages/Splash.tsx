
import { useEffect, useState } from "react";

const Splash = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
      <div className="text-center">
        <div className={`transition-all duration-1000 ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-4xl font-bold text-primary-600">K</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Kuda</h1>
          <p className="text-white/80 text-lg">The bank of the free</p>
        </div>
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
