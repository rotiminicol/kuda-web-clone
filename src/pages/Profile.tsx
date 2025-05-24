
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Settings, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();

  const profileItems = [
    { icon: User, label: "Personal Information", href: "#" },
    { icon: Settings, label: "Account Settings", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
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
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">JD</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">john.doe@email.com</p>
                <p className="text-sm text-gray-500">+234 801 234 5678</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Account Number</span>
              <span className="font-medium">1234567890</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bank</span>
              <span className="font-medium">Kuda Microfinance Bank</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type</span>
              <span className="font-medium">Savings</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">BVN</span>
              <span className="font-medium">***********</span>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="mb-6">
          <CardContent className="p-0">
            {profileItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Navigation />
    </div>
  );
};

export default Profile;
