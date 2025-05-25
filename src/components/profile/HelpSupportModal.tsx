
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { X, HelpCircle, MessageCircle, Phone, Mail, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSupportModal = ({ isOpen, onClose }: HelpSupportModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    urgency: "normal"
  });

  const handleSubmit = () => {
    // API call to Xano POST /support/ticket
    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ subject: "", message: "", urgency: "normal" });
    onClose();
  };

  const faqs = [
    {
      question: "How do I transfer money?",
      answer: "Go to Transfer page, enter recipient details, amount, and confirm with your PIN."
    },
    {
      question: "What are the transfer limits?",
      answer: "Daily limit is ₦100,000 for Tier 2 accounts and ₦500,000 for Tier 3 accounts."
    },
    {
      question: "How do I pay bills?",
      answer: "Visit Bills section, select service provider, enter details and make payment."
    },
    {
      question: "How to upgrade my account?",
      answer: "Visit any Kuda branch with valid ID or complete BVN verification in-app."
    },
    {
      question: "What if I forget my PIN?",
      answer: "Use 'Forgot PIN' option or contact support to reset your transaction PIN."
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <Card className="w-full h-[95vh] sm:h-auto sm:max-w-lg sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl border-0 shadow-2xl animate-slide-up">
        <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md border-b pb-4">
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-white" />
            </div>
            Help & Support
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full w-10 h-10 p-0">
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {/* Tab Navigation */}
          <div className="flex border-b bg-gray-50">
            <button
              onClick={() => setActiveTab('contact')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'contact'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageCircle className="h-4 w-4 inline mr-2" />
              Contact Us
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              FAQ
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'contact' && (
              <div className="space-y-6">
                {/* Quick Contact Options */}
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="tel:+2347009009009"
                    className="flex flex-col items-center p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-700">Call Us</span>
                    <span className="text-xs text-green-600">700-900-9009</span>
                  </a>
                  
                  <a 
                    href="mailto:help@kuda.com"
                    className="flex flex-col items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-700">Email Us</span>
                    <span className="text-xs text-blue-600">help@kuda.com</span>
                  </a>
                </div>

                {/* Contact Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Send us a message</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of your issue"
                      className="h-12 border-2 focus:border-blue-500 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <select 
                      value={contactForm.urgency}
                      onChange={(e) => setContactForm(prev => ({ ...prev, urgency: e.target.value }))}
                      className="w-full h-12 px-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="normal">Normal - Standard support</option>
                      <option value="high">High - Account issue</option>
                      <option value="urgent">Urgent - Security concern</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your issue in detail..."
                      className="min-h-32 border-2 focus:border-blue-500 rounded-xl resize-none"
                    />
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl shadow-lg"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                    <details className="group">
                      <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Close Button */}
          <div className="p-6 border-t">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full h-12 rounded-xl border-2 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpSupportModal;
