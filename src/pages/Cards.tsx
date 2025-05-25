
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CreditCard, Eye, EyeOff, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { cardAPI, authAPI } from "@/services/api";

const Cards = () => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [cards, setCards] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const [cardsResponse, userResponse] = await Promise.all([
          cardAPI.getAll().catch(() => []),
          authAPI.getMe().catch(() => null)
        ]);
        
        setCards(cardsResponse);
        setUserData(userResponse);
        console.log('Cards data loaded:', { cards: cardsResponse, user: userResponse });
      } catch (error) {
        console.error('Error fetching cards data:', error);
        toast({
          title: "Error",
          description: "Failed to load cards data",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCardsData();
  }, [toast]);

  const handleCardAction = (action: string) => {
    toast({
      title: `Card ${action}`,
      description: `Your card has been ${action.toLowerCase()}.`,
    });
  };

  const handleCreateCard = async () => {
    try {
      // This would create a new virtual card
      toast({
        title: "Card Creation",
        description: "Card creation feature coming soon!",
      });
    } catch (error) {
      console.error('Error creating card:', error);
      toast({
        title: "Error",
        description: "Failed to create card",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cards...</p>
        </div>
      </div>
    );
  }

  const userName = userData ? `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || "User" : "User";

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
          <Button size="sm" className="bg-primary-600 hover:bg-primary-700" onClick={handleCreateCard}>
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </Button>
        </div>

        {cards.length === 0 ? (
          /* No Cards State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No cards yet</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Create your first virtual card to start making online payments and shopping
            </p>
            <Button 
              size="lg" 
              className="bg-primary-600 hover:bg-primary-700"
              onClick={handleCreateCard}
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Virtual Card
            </Button>
          </div>
        ) : (
          <>
            {/* Virtual Cards */}
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
                          {showCardNumber ? (card.cardNumber || "5399 1234 5678 9012") : "•••• •••• •••• " + (card.cardNumber?.slice(-4) || "9012")}
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
                          <p className="font-mono">{card.expiry || "12/28"}</p>
                        </div>
                        <div>
                          <p className="text-primary-200">CVV</p>
                          <p className="font-mono">{showCardNumber ? (card.cvv || "123") : "•••"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-primary-100 text-sm">Available Balance</p>
                        <p className="text-2xl font-bold">₦{(card.balance || userData?.balance || 20000).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary-200 text-xs">{userName.toUpperCase()}</p>
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
                <div className="text-center py-8">
                  <p className="text-gray-500">No card transactions yet</p>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Cards;
