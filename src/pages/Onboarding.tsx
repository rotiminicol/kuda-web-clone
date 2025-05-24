
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePinChange = (value: string, isConfirm = false) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      if (isConfirm) {
        setConfirmPin(value);
      } else {
        setPin(value);
      }
    }
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (pin !== confirmPin) {
        toast({
          title: "Error",
          description: "PINs do not match",
          variant: "destructive"
        });
        return;
      }
      if (pin.length !== 4) {
        toast({
          title: "Error",
          description: "PIN must be 4 digits",
          variant: "destructive"
        });
        return;
      }
      setStep(3);
    } else {
      setLoading(true);
      setTimeout(() => {
        toast({
          title: "Setup complete!",
          description: "Your Kuda account is ready to use.",
        });
        navigate("/dashboard");
        setLoading(false);
      }, 1500);
    }
  };

  const steps = [
    {
      title: "Welcome to Kuda!",
      description: "Let's set up your account in a few simple steps",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">🎉</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">You're almost ready!</h3>
            <p className="text-gray-600">We'll help you set up your transaction PIN and security features.</p>
          </div>
        </div>
      )
    },
    {
      title: "Create Transaction PIN",
      description: "This PIN will be used to authorize transactions",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Your Account</h3>
            <p className="text-gray-600 text-sm">Create a 4-digit PIN for transactions</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="pin">Transaction PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter 4-digit PIN"
                value={pin}
                onChange={(e) => handlePinChange(e.target.value)}
                className="h-12 text-center text-lg tracking-widest"
                maxLength={4}
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPin">Confirm PIN</Label>
              <Input
                id="confirmPin"
                type="password"
                placeholder="Confirm your PIN"
                value={confirmPin}
                onChange={(e) => handlePinChange(e.target.value, true)}
                className="h-12 text-center text-lg tracking-widest"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "All Set!",
      description: "Your account is ready for secure banking",
      content: (
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl">✅</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Setup Complete!</h3>
            <p className="text-gray-600">You can now start using your Kuda account to send money, pay bills, and more.</p>
          </div>
          <div className="bg-primary-50 p-4 rounded-lg">
            <p className="text-sm text-primary-700 font-medium">Your account number will be generated shortly</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-white">K</span>
          </div>
          <span className="ml-2 font-semibold text-gray-900">Kuda</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold">{steps[step - 1].title}</CardTitle>
            <CardDescription>{steps[step - 1].description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-6">
            {steps[step - 1].content}
          </CardContent>
          
          <div className="p-6 pt-0">
            <Button 
              onClick={handleNext}
              className="w-full h-12 bg-primary-600 hover:bg-primary-700"
              disabled={loading || (step === 2 && (pin.length !== 4 || confirmPin.length !== 4))}
            >
              {loading ? "Setting up..." : step === 3 ? "Get Started" : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
