
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, HelpCircle, Phone, Mail, MessageCircle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpSupportModal = ({ isOpen, onClose }: HelpSupportModalProps) => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    email: "",
  });

  const faqs = [
    {
      question: "How do I transfer money to another bank?",
      answer: "Go to Transfer, select 'Other Banks', enter recipient details, amount, and your transaction PIN to complete the transfer.",
    },
    {
      question: "What are the transaction limits?",
      answer: "Daily transfer limit is ₦1,000,000 for Tier 2 accounts. For higher limits, upgrade to Tier 3 with additional verification.",
    },
    {
      question: "How do I upgrade my account tier?",
      answer: "Visit any Kuda office with valid ID, proof of address, and BVN. You can also start the process in-app under Account Settings.",
    },
    {
      question: "How do I block my card?",
      answer: "Go to Cards section, select your card, and tap 'Block Card'. You can also call our 24/7 hotline immediately.",
    },
    {
      question: "What should I do if I forget my transaction PIN?",
      answer: "Go to Profile > Account Settings > Change Transaction PIN. You'll need to verify your identity through SMS or email.",
    },
    {
      question: "How do I download my bank statement?",
      answer: "Go to Transaction History, tap the filter icon, select date range, and tap 'Export Statement' to download PDF.",
    },
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      description: "24/7 Customer Support",
      action: "+234 1 888 KUDA",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "We reply within 24 hours",
      action: "help@kuda.com",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  const handleContactSubmit = () => {
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // API call would go here
    toast({
      title: "Message Sent",
      description: "Your support request has been submitted. We'll get back to you soon.",
    });
    setContactForm({ subject: "", message: "", email: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary-600" />
            Help & Support
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contact Methods</h3>
                <div className="grid gap-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.color}`}>
                        <method.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{method.title}</h4>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        {method.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Send us a message</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your issue"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe your issue or question in detail..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    />
                  </div>
                  <Button onClick={handleContactSubmit} className="w-full">
                    Send Message
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Help us improve</h3>
                <p className="text-gray-600">Your feedback helps us make Kuda better for everyone.</p>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-5 w-5 text-primary-600" />
                      <h4 className="font-semibold">Rate our app</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">How would you rate your experience with Kuda?</p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button key={star} variant="outline" size="sm" className="w-10 h-10 p-0">
                          ⭐
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Suggest a feature</h4>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="What feature would you like to see in Kuda?"
                    />
                    <Button className="mt-3 w-full">
                      Submit Suggestion
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Report a bug</h4>
                    <textarea
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Describe the bug or issue you encountered..."
                    />
                    <Button className="mt-3 w-full">
                      Report Bug
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

export default HelpSupportModal;
