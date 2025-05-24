
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CreditCard, Eye, EyeOff, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const Cards = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const { toast } = useToast();

  const cards = [
    {
      id: 1,
      type: "Virtual",
      number: "5399 1234 5678 9012",
      expiry: "12/28",
      cvv: "123",
      balance: 45000,
      status: "active"
    }
  ];

  const handleCardAction = (action: string) => {
    toast({
      title: `Card ${action}`,
      description: `Your card has been ${action.toLowerCase()}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" asChild className="mr-2">
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">My Cards</h1>
          </div>
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </Button>
        </div>

        {/* Virtual Card */}
        <div className="mb-6">
          {cards.map((card) => (
            <div key={card.id} className="relative">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white mb-4 shadow-lg">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-primary-100 text-sm">Virtual Card</p>
                    <p className="text-white font-medium">Kuda Debit Card</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-primary-200" />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-xl font-mono tracking-wider">
                      {showCardNumber ? card.number : "•••• •••• •••• " + card.number.slice(-4)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCardNumber(!showCardNumber)}
                      className="text-white hover:bg-white/20 p-1"
                    >
                      {showCardNumber ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-primary-200">Expiry</p>
                      <p className="font-mono">{card.expiry}</p>
                    </div>
                    <div>
                      <p className="text-primary-200">CVV</p>
                      <p className="font-mono">{showCardNumber ? card.cvv : "•••"}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-primary-100 text-sm">Available Balance</p>
                    <p className="text-2xl font-bold">₦{card.balance.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-200 text-xs">JOHN DOE</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Card Actions */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            variant="outline"
            className="h-12 flex items-center justify-center gap-2"
            onClick={() => handleCardAction("Frozen")}
          >
            <Lock className="h-4 w-4" />
            Freeze Card
          </Button>
          <Button
            variant="outline"
            className="h-12 flex items-center justify-center gap-2"
            onClick={() => handleCardAction("Settings Updated")}
          >
            <CreditCard className="h-4 w-4" />
            Card Settings
          </Button>
        </div>

        {/* Card Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Card Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {[
                { merchant: "Amazon", amount: 15000, date: "Today", type: "online" },
                { merchant: "Uber", amount: 2500, date: "Yesterday", type: "transport" },
                { merchant: "Shoprite", amount: 8500, date: "2 days ago", type: "shopping" },
              ].map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm">-</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.merchant}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <p className="font-medium text-red-600">-₦{transaction.amount.toLocaleString()}</p>
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

export default Cards;
