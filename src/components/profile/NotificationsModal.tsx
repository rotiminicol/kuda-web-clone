
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Bell, Mail, Smartphone, CreditCard, DollarSign, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    push: {
      transactions: true,
      security: true,
      bills: false,
      promotions: true,
    },
    email: {
      statements: true,
      security: true,
      marketing: false,
      updates: true,
    },
    sms: {
      transactions: true,
      security: true,
      otp: true,
      bills: false,
    }
  });

  const handleSave = () => {
    // API call to Xano PUT /user/notification-preferences
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
    onClose();
  };

  const updateNotification = (type: 'push' | 'email' | 'sms', key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [key]: value
      }
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full h-[95vh] sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border-0 shadow-2xl animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md border-b pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            Notifications
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {/* Push Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              Push Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Transactions</p>
                    <p className="text-sm text-gray-500">Money in, money out</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push.transactions}
                  onCheckedChange={(checked) => updateNotification('push', 'transactions', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900">Security Alerts</p>
                    <p className="text-sm text-gray-500">Login attempts, changes</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push.security}
                  onCheckedChange={(checked) => updateNotification('push', 'security', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Bill Reminders</p>
                    <p className="text-sm text-gray-500">Due dates & payments</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push.bills}
                  onCheckedChange={(checked) => updateNotification('push', 'bills', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Promotions</p>
                    <p className="text-sm text-gray-500">Special offers & updates</p>
                  </div>
                </div>
                <Switch 
                  checked={notifications.push.promotions}
                  onCheckedChange={(checked) => updateNotification('push', 'promotions', checked)}
                />
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              Email Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Monthly Statements</p>
                  <p className="text-sm text-gray-500">Account summaries</p>
                </div>
                <Switch 
                  checked={notifications.email.statements}
                  onCheckedChange={(checked) => updateNotification('email', 'statements', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Security Updates</p>
                  <p className="text-sm text-gray-500">Important security info</p>
                </div>
                <Switch 
                  checked={notifications.email.security}
                  onCheckedChange={(checked) => updateNotification('email', 'security', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Marketing</p>
                  <p className="text-sm text-gray-500">Product updates & tips</p>
                </div>
                <Switch 
                  checked={notifications.email.marketing}
                  onCheckedChange={(checked) => updateNotification('email', 'marketing', checked)}
                />
              </div>
            </div>
          </div>

          {/* SMS Notifications */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-purple-600" />
              SMS Notifications
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">Transaction Alerts</p>
                  <p className="text-sm text-gray-500">Instant transaction SMS</p>
                </div>
                <Switch 
                  checked={notifications.sms.transactions}
                  onCheckedChange={(checked) => updateNotification('sms', 'transactions', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900">OTP Codes</p>
                  <p className="text-sm text-gray-500">Verification codes</p>
                </div>
                <Switch 
                  checked={notifications.sms.otp}
                  onCheckedChange={(checked) => updateNotification('sms', 'otp', checked)}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 sticky bottom-0 bg-white/95 backdrop-blur-md border-t -mx-6 px-6 py-4">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="flex-1 h-12 rounded-xl border-2 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 rounded-xl shadow-lg"
            >
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsModal;
