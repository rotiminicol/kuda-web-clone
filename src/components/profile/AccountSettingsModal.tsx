
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { X, Shield, Key, Smartphone, Eye, EyeOff, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSettingsModal = ({ isOpen, onClose }: AccountSettingsModalProps) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    biometricLogin: false,
    smsAlerts: true,
    emailAlerts: true,
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSave = () => {
    // API call to Xano PUT /user/settings
    toast({
      title: "Settings Updated",
      description: "Your account settings have been saved successfully.",
    });
    onClose();
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    // API call to Xano PUT /user/change-password
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full h-[95vh] sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border-0 shadow-2xl animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md border-b pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            Account Settings
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {/* Security Settings */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Security & Privacy
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Extra security for your account</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, twoFactorAuth: checked }))}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Fingerprint className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Biometric Login</p>
                    <p className="text-sm text-gray-500">Use fingerprint or face ID</p>
                  </div>
                </div>
                <Switch 
                  checked={settings.biometricLogin}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, biometricLogin: checked }))}
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Key className="h-5 w-5 text-amber-600" />
              Change Password
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwords.current}
                    onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                    className="h-12 border-2 focus:border-emerald-500 rounded-xl pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwords.new}
                    onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                    className="h-12 border-2 focus:border-emerald-500 rounded-xl pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  className="h-12 border-2 focus:border-emerald-500 rounded-xl"
                />
              </div>

              <Button 
                onClick={handlePasswordChange}
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Change Password
              </Button>
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
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg"
            >
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettingsModal;
