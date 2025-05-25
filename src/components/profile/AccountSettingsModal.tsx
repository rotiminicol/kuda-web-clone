
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Settings, Shield, Key, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSettingsModal = ({ isOpen, onClose }: AccountSettingsModalProps) => {
  const { toast } = useToast();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pinData, setPinData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    // API call would go here
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const handlePinChange = () => {
    if (pinData.newPin !== pinData.confirmPin) {
      toast({
        title: "Error",
        description: "New PINs do not match.",
        variant: "destructive",
      });
      return;
    }
    // API call would go here
    toast({
      title: "Transaction PIN Updated",
      description: "Your transaction PIN has been changed successfully.",
    });
    setPinData({ currentPin: "", newPin: "", confirmPin: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary-600" />
            Account Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="security" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="security" className="space-y-6">
              {/* Password Change */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold">Change Password</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handlePasswordChange} className="w-full">
                    Update Password
                  </Button>
                </div>
              </div>

              {/* Transaction PIN Change */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold">Change Transaction PIN</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="currentPin">Current PIN</Label>
                    <Input
                      id="currentPin"
                      type="password"
                      maxLength={4}
                      value={pinData.currentPin}
                      onChange={(e) => setPinData(prev => ({ ...prev, currentPin: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPin">New PIN</Label>
                    <Input
                      id="newPin"
                      type="password"
                      maxLength={4}
                      value={pinData.newPin}
                      onChange={(e) => setPinData(prev => ({ ...prev, newPin: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirmPin">Confirm New PIN</Label>
                    <Input
                      id="confirmPin"
                      type="password"
                      maxLength={4}
                      value={pinData.confirmPin}
                      onChange={(e) => setPinData(prev => ({ ...prev, confirmPin: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handlePinChange} className="w-full">
                    Update PIN
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary-600" />
                  <h3 className="text-lg font-semibold">App Preferences</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Biometric Login</p>
                      <p className="text-sm text-gray-600">Use fingerprint or face ID</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-600">Switch to dark theme</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Toggle
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Auto-Lock</p>
                      <p className="text-sm text-gray-600">Lock app after inactivity</p>
                    </div>
                    <Button variant="outline" size="sm">
                      5 mins
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

export default AccountSettingsModal;
