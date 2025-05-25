
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
  Calendar,
  TrendingUp,
  Eye,
  Copy,
  Star
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import PersonalInfoModal from "@/components/profile/PersonalInfoModal";
import AccountSettingsModal from "@/components/profile/AccountSettingsModal";
import NotificationsModal from "@/components/profile/NotificationsModal";
import HelpSupportModal from "@/components/profile/HelpSupportModal";
import { authAPI, transactionAPI, cardAPI } from "@/services/api";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Xano
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, transactionsResponse, cardsResponse] = await Promise.all([
          authAPI.getMe(),
          transactionAPI.getAll().catch(() => []),
          cardAPI.getAll().catch(() => [])
        ]);
        
        setUserData(userResponse);
        setTransactions(transactionsResponse);
        setCards(cardsResponse);
        console.log('User data loaded:', userResponse);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [toast]);

  // Extract name parts from the user data
  const getNameParts = (userData: any) => {
    if (!userData) return { firstName: "User", lastName: "" };
    
    const fullName = userData.name || userData.firstName || "";
    const nameParts = fullName.trim().split(" ");
    
    return {
      firstName: nameParts[0] || "User",
      lastName: nameParts.slice(1).join(" ") || ""
    };
  };

  const { firstName, lastName } = getNameParts(userData);

  // Build profile data with proper fallbacks
  const profileData = {
    firstName,
    lastName,
    email: userData?.email || "user@email.com",
    phone: userData?.phone || "+234 801 234 5678",
    address: userData?.address || "Lagos, Nigeria",
    dateJoined: userData?.created_at ? new Date(userData.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "January 2024",
    accountNumber: userData?.accountNumber || "No account number",
    bank: "Kuda Microfinance Bank",
    accountType: "Savings",
    bvn: "***********",
    tier: "Tier 2",
    balance: userData?.balance ? `₦${userData.balance.toLocaleString()}` : "₦20,000"
  };

  const quickActions = [
    { 
      icon: User, 
      label: "Personal Information", 
      subtitle: "Update your basic information",
      action: () => setActiveModal("personal"),
      gradient: "from-violet-500 to-purple-600"
    },
    { 
      icon: Settings, 
      label: "Account Settings", 
      subtitle: "Security and preferences",
      action: () => setActiveModal("settings"),
      gradient: "from-emerald-500 to-teal-600"
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      subtitle: "Manage your alerts",
      action: () => setActiveModal("notifications"),
      gradient: "from-amber-500 to-orange-600"
    },
    { 
      icon: HelpCircle, 
      label: "Help & Support", 
      subtitle: "Get assistance",
      action: () => setActiveModal("help"),
      gradient: "from-blue-500 to-indigo-600"
    },
  ];

  const accountStats = [
    { label: "Account Balance", value: showBalance ? profileData.balance : "••••••", icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
    { label: "Account Tier", value: profileData.tier, icon: Shield, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Cards", value: cards.length.toString(), icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "This Month", value: transactions.length === 0 ? "No transactions" : `${transactions.length} transactions`, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
  ];

  const handleLogout = async () => {
    try {
      authAPI.logout();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const copyAccountNumber = () => {
    if (profileData.accountNumber === "No account number") {
      toast({
        title: "No account number",
        description: "Account number not available",
        variant: "destructive"
      });
      return;
    }
    
    navigator.clipboard.writeText(profileData.accountNumber);
    toast({
      title: "Copied!",
      description: "Account number copied to clipboard",
    });
  };

  // Get initials safely
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName && firstName.length > 0 ? firstName[0].toUpperCase() : 'U';
    const lastInitial = lastName && lastName.length > 0 ? lastName[0].toUpperCase() : '';
    return firstInitial + lastInitial;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-24 max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-3 rounded-full w-10 h-10 p-0">
              <Link to="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          </div>
          <Button 
            onClick={() => setActiveModal("personal")}
            size="sm" 
            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-full shadow-lg"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        {/* Profile Header Card */}
        <Card className="mb-6 border-0 shadow-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-3 border-white/20 shadow-xl">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={`${firstName} ${lastName}`} />
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-xl font-bold">
                    {getInitials(firstName, lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">{firstName} {lastName}</h2>
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <Mail className="h-3 w-3" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                    <Star className="h-3 w-3 mr-1" />
                    {profileData.tier} Verified
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-white/70">
                    <Calendar className="h-3 w-3" />
                    <span>Since {profileData.dateJoined}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {accountStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 truncate">{stat.value}</p>
                      {stat.label === "Account Balance" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowBalance(!showBalance)}
                          className="p-1 h-6 w-6"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Account Information */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-violet-600" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-semibold">{profileData.accountNumber}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAccountNumber}
                className="rounded-full w-8 h-8 p-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Bank</p>
                <p className="font-semibold text-sm">{profileData.bank}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Account Type</p>
                <p className="font-semibold text-sm">{profileData.accountType}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6 border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {quickActions.map((item, index) => (
              <div
                key={index}
                onClick={item.action}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors active:bg-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    <item.icon className="h-6 w-6 text-white" />
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
          className="w-full h-12 text-red-600 border-red-200 hover:bg-red-50 border-2 rounded-xl"
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
