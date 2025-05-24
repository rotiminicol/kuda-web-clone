
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Send, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Transfer = () => {
  const [transferType, setTransferType] = useState("kuda");
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const recentRecipients = [
    { name: "Jane Smith", bank: "Kuda Bank", account: "1234567890" },
    { name: "Mike Johnson", bank: "GTBank", account: "0123456789" },
    { name: "Sarah Wilson", bank: "Access Bank", account: "9876543210" },
  ];

  const transactionHistory = [
    { id: 1, type: "sent", recipient: "Jane Smith", amount: 15000, date: "Today", status: "successful" },
    { id: 2, type: "received", sender: "Mike Johnson", amount: 25000, date: "Yesterday", status: "successful" },
    { id: 3, type: "sent", recipient: "Sarah Wilson", amount: 8500, date: "2 days ago", status: "successful" },
    { id: 4, type: "sent", recipient: "David Brown", amount: 12000, date: "3 days ago", status: "pending" },
  ];

  const handleTransfer = () => {
    if (!amount || !recipient) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Transfer Successful!",
        description: `₦${amount} sent to ${recipient}.`,
      });
      setLoading(false);
      setAmount("");
      setRecipient("");
      setDescription("");
    }, 2000);
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
          <h1 className="text-2xl font-bold text-gray-900">Transfer Money</h1>
        </div>

        {/* Transfer Type Selector */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={transferType === "kuda" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransferType("kuda")}
                className={transferType === "kuda" ? "bg-primary-600" : ""}
              >
                Kuda to Kuda
              </Button>
              <Button
                variant={transferType === "bank" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransferType("bank")}
                className={transferType === "bank" ? "bg-primary-600" : ""}
              >
                Other Banks
              </Button>
              <Button
                variant={transferType === "international" ? "default" : "outline"}
                size="sm"
                onClick={() => setTransferType("international")}
                className={transferType === "international" ? "bg-primary-600" : ""}
              >
                International
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transfer Form */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send Money
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">
                {transferType === "kuda" ? "Phone Number or Email" : "Account Number"}
              </Label>
              <Input
                id="recipient"
                placeholder={transferType === "kuda" ? "080XXXXXXXX or email" : "Enter account number"}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-12"
              />
            </div>

            {transferType !== "kuda" && (
              <div className="space-y-2">
                <Label htmlFor="bank">Bank</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gtbank">GTBank</SelectItem>
                    <SelectItem value="access">Access Bank</SelectItem>
                    <SelectItem value="zenith">Zenith Bank</SelectItem>
                    <SelectItem value="first">First Bank</SelectItem>
                    <SelectItem value="uba">UBA</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                placeholder="What's this for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12"
              />
            </div>

            <Button
              onClick={handleTransfer}
              className="w-full h-12 bg-primary-600 hover:bg-primary-700"
              disabled={loading}
            >
              {loading ? "Processing..." : `Send ₦${amount || "0"}`}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Recipients */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Recent Recipients</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {recentRecipients.map((recipient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setRecipient(recipient.account)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 font-medium">{recipient.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{recipient.name}</p>
                      <p className="text-sm text-gray-500">{recipient.bank}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{recipient.account}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {transactionHistory.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === "received" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      <span className={`text-sm ${
                        transaction.type === "received" ? "text-green-600" : "text-red-600"
                      }`}>
                        {transaction.type === "received" ? "+" : "-"}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {transaction.type === "received" 
                          ? `From ${transaction.sender}` 
                          : `To ${transaction.recipient}`
                        }
                      </p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "successful" 
                            ? "bg-green-100 text-green-600" 
                            : "bg-yellow-100 text-yellow-600"
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === "received" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.type === "received" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Transfer;
