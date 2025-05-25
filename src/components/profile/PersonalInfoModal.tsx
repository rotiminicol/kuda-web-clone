
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X, Camera, User, Mail, Phone, MapPin, Calendar, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authAPI } from "@/services/api";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dateJoined: string;
  };
}

const PersonalInfoModal = ({ isOpen, onClose, profileData }: PersonalInfoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Here you would update user profile via Xano API
      // For now, we'll just simulate the call
      console.log('Updating profile with:', formData);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile Updated",
        description: "Your personal information has been updated successfully.",
      });
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full h-[95vh] sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border-0 shadow-2xl animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md border-b pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            Personal Information
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl font-bold">
                  {formData.firstName[0]}{formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-lg group-hover:scale-110 transition-all duration-200"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Tap camera icon to change</p>
              <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 font-medium">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="h-12 border-2 focus:border-violet-500 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 font-medium">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="h-12 border-2 focus:border-violet-500 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="h-3 w-3 text-blue-600" />
                </div>
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 border-2 focus:border-violet-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="h-3 w-3 text-green-600" />
                </div>
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 border-2 focus:border-violet-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-3 w-3 text-purple-600" />
                </div>
                Address
              </Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="h-12 border-2 focus:border-violet-500 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-gray-700 font-medium">
                <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-gray-600" />
                </div>
                Date Joined
              </Label>
              <Input 
                value={profileData.dateJoined} 
                disabled 
                className="h-12 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-500" 
              />
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
              disabled={isLoading}
              className="flex-1 h-12 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Save Changes
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalInfoModal;
