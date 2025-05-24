
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ArrowLeft, Smartphone, Zap, Tv, GraduationCap, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Bills = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const categories = [
    { id: "airtime", name: "Airtime", icon: Smartphone, color: "bg-green-500" },
    { id: "electricity", name: "Electricity", icon: Zap, color: "bg-yellow-500" },
    { id: "tv", name: "TV Subscription", icon: Tv, color: "bg-blue-500" },
    { id: "education", name: "Education", icon: GraduationCap, color: "bg-purple-500" },
    { id: "gambling", name: "Betting", icon: Gamepad2, color: "bg-red-500" },
  ];

  const providers = {
    airtime: ["MTN", "Airtel", "Glo", "9mobile"],
    electricity: ["AEDC", "EKEDC", "IKEDC", "PHEDC"],
    tv: ["DStv", "GOtv", "StarTimes"],
    education: ["WAEC", "JAMB", "NECO"],
    gambling: ["Bet9ja", "SportyBet", "NairaBet", "BetKing"],
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `₦${amount} ${selectedCategory} payment completed.`,
      });
      setLoading(false);
      setAmount("");
      setPhone("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" asChild className="mr-2">
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Pay Bills</h1>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Category</h3>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedCategory === category.id
                    ? "ring-2 ring-primary-500 bg-primary-50"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-medium text-gray-900">{category.name}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Form */}
        {selectedCategory && (
          <Card className="mb-6">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="provider">Service Provider</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers[selectedCategory as keyof typeof providers]?.map((provider) => (
                      <SelectItem key={provider} value={provider.toLowerCase()}>
                        {provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {(selectedCategory === "airtime" || selectedCategory === "electricity") && (
                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {selectedCategory === "airtime" ? "Phone Number" : "Meter Number"}
                  </Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder={selectedCategory === "airtime" ? "080XXXXXXXX" : "Enter meter number"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                onClick={handlePayment}
                className="w-full h-12 bg-primary-600 hover:bg-primary-700"
                disabled={!amount || loading}
              >
                {loading ? "Processing..." : `Pay ₦${amount || "0"}`}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Amounts for Airtime */}
        {selectedCategory === "airtime" && (
          <Card>
            <CardContent className="p-6">
              <h4 className="font-medium text-gray-900 mb-3">Quick Amounts</h4>
              <div className="grid grid-cols-4 gap-2">
                {[100, 200, 500, 1000].map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="h-10"
                  >
                    ₦{quickAmount}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Bills;
