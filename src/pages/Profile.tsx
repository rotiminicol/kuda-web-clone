
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Settings, 
  Bell, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Edit,
  Shield,
  CreditCard,
  Smartphone,
  Mail,
  Phone,
  MapPin,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import PersonalInfoModal from "@/components/profile/PersonalInfoModal";
import AccountSettingsModal from "@/components/profile/AccountSettingsModal";
import NotificationsModal from "@/components/profile/NotificationsModal";
import HelpSupportModal from "@/components/profile/HelpSupportModal";

const Profile = () => {
  const { toast } = useToast();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const profileData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+234 801 234 5678",
    address: "Lagos, Nigeria",
    dateJoined: "January 2024",
    accountNumber: "1234567890",
    bank: "Kuda Microfinance Bank",
    accountType: "Savings",
    bvn: "***********",
    tier: "Tier 2",
    balance: "₦150,000.00"
  };

  const quickActions = [
    { 
      icon: User, 
      label: "Personal Information", 
      subtitle: "Update your basic information",
      action: () => setActiveModal("personal"),
      color: "bg-blue-50 text-blue-600"
    },
    { 
      icon: Settings, 
      label: "Account Settings", 
      subtitle: "Security and preferences",
      action: () => setActiveModal("settings"),
      color: "bg-green-50 text-green-600"
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      subtitle: "Manage your alerts",
      action: () => setActiveModal("notifications"),
      color: "bg-yellow-50 text-yellow-600"
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      subtitle: "Get assistance",
      action: () => setActiveModal("help"),
      color: "bg-purple-50 text-purple-600"
    },
  ];

  const accountStats = [
    { label: "Total Balance", value: profileData.balance, icon: CreditCard },
    { label: "Account Tier", value: profileData.tier, icon: Shield },
    { label: "Active Cards", value: "2", icon: CreditCard },
    { label: "Monthly Transactions", value: "47", icon: Smartphone },
  ];

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleEditProfile = () => {
    setActiveModal("personal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-6 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          </div>
          <Button 
            onClick={handleEditProfile}
            size="sm" 
            className="bg-primary-600 hover:bg-primary-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          <CardContent className="p-8 relative z-10">
            <div className="flex items-start gap-6">
              <Avatar className="w-20 h-20 border-4 border-white/20">
                <AvatarImage src="/placeholder-avatar.jpg" alt={`${profileData.firstName} ${profileData.lastName}`} />
                <AvatarFallback className="bg-white text-primary-600 text-2xl font-bold">
                  {profileData.firstName[0]}{profileData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{profileData.firstName} {profileData.lastName}</h2>
                <div className="flex items-center gap-4 text-white/90 mb-3">
                  <div className="flex items-center gap-1">
                    <Mail className="h-4 w-4" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {profileData.tier} Verified
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {profileData.dateJoined}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {accountStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Account Information */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Account Number</span>
                <span className="font-semibold">{profileData.accountNumber}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Bank</span>
                <span className="font-semibold">{profileData.bank}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">Account Type</span>
                <span className="font-semibold">{profileData.accountType}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 font-medium">BVN</span>
                <span className="font-semibold">{profileData.bvn}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-8 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((item, index) => (
              <div
                key={index}
                onClick={item.action}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">{item.label}</span>
                    <span className="text-sm text-gray-500">{item.subtitle}</span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 border-2"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      <Navigation />

      {/* Modals */}
      <PersonalInfoModal 
        isOpen={activeModal === "personal"} 
        onClose={() => setActiveModal(null)}
        profileData={profileData}
      />
      <AccountSettingsModal 
        isOpen={activeModal === "settings"} 
        onClose={() => setActiveModal(null)}
      />
      <NotificationsModal 
        isOpen={activeModal === "notifications"} 
        onClose={() => setActiveModal(null)}
      />
      <HelpSupportModal 
        isOpen={activeModal === "help"} 
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default Profile;
