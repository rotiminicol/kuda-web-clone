
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          {/* Logo */}
          <div className="mb-8 animate-fade-in">
            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-3xl font-bold text-white">K</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Kuda</h1>
          </div>

          {/* Hero Content */}
          <div className="max-w-md mx-auto mb-12 animate-slide-up">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              The bank of the free
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Join millions of Nigerians who save, spend and send money without fees.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-scale-in">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Free Transfers</h3>
              <p className="text-gray-600 text-sm">Send money to any bank in Nigeria for free</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Bill Payments</h3>
              <p className="text-gray-600 text-sm">Pay for airtime, data, electricity and more</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure Banking</h3>
              <p className="text-gray-600 text-sm">Bank-level security to keep your money safe</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md animate-slide-up">
            <Button asChild className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 text-lg">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-primary-300 text-primary-600 hover:bg-primary-50 py-3 text-lg">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
