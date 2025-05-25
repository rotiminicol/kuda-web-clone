
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { X, Bell, Mail, Smartphone, CreditCard, Gift, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: true,
    push: true,
    transactions: true,
    promotions: false,
    security: true,
  });

  const notifications = [
    {
      id: 1,
      title: "Transaction Alert",
      message: "You received ₦5,000 from John Smith",
      type: "transaction",
      time: "2 minutes ago",
      read: false,
      icon: CreditCard,
    },
    {
      id: 2,
      title: "Security Alert",
      message: "New device login detected",
      type: "security",
      time: "1 hour ago",
      read: false,
      icon: AlertCircle,
    },
    {
      id: 3,
      title: "Promotional Offer",
      message: "Get 5% cashback on your next bill payment",
      type: "promotion",
      time: "3 hours ago",
      read: true,
      icon: Gift,
    },
    {
      id: 4,
      title: "Payment Confirmation",
      message: "Airtime purchase successful - ₦500",
      type: "transaction",
      time: "1 day ago",
      read: true,
      icon: CreditCard,
    },
  ];

  const toggleSetting = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    toast({
      title: "Settings Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const markAllAsRead = () => {
    toast({
      title: "Notifications Read",
      description: "All notifications have been marked as read.",
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'transaction': return 'bg-green-50 text-green-600';
      case 'security': return 'bg-red-50 text-red-600';
      case 'promotion': return 'bg-blue-50 text-blue-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary-600" />
            Notifications
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="recent" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Recent Notifications</h3>
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark all read
                </Button>
              </div>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-white border-primary-200'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(notification.type)}`}>
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          {!notification.read && (
                            <Badge variant="default" className="bg-primary-600 text-xs">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                        <p className="text-xs text-gray-500">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <Button 
                      variant={notificationSettings.email ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleSetting('email')}
                    >
                      {notificationSettings.email ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive text messages</p>
                      </div>
                    </div>
                    <Button 
                      variant={notificationSettings.sms ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleSetting('sms')}
                    >
                      {notificationSettings.sms ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">App notifications</p>
                      </div>
                    </div>
                    <Button 
                      variant={notificationSettings.push ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleSetting('push')}
                    >
                      {notificationSettings.push ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Transaction Alerts</p>
                        <p className="text-sm text-gray-600">Payment notifications</p>
                      </div>
                    </div>
                    <Button 
                      variant={notificationSettings.transactions ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleSetting('transactions')}
                    >
                      {notificationSettings.transactions ? "On" : "Off"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Promotional Offers</p>
                        <p className="text-sm text-gray-600">Special deals and offers</p>
                      </div>
                    </div>
                    <Button 
                      variant={notificationSettings.promotions ? "default" : "outline"} 
                      size="sm"
                      onClick={() => toggleSetting('promotions')}
                    >
                      {notificationSettings.promotions ? "On" : "Off"}
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsModal;
