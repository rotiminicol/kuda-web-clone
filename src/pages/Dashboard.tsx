
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Plus, Send, CreditCard, Smartphone, Zap } from "lucide-react";
import Navigation from "@/components/Navigation";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);

  const quickActions = [
    { icon: Send, label: "Transfer", href: "/transfer", color: "bg-blue-500" },
    { icon: Smartphone, label: "Airtime", href: "/bills", color: "bg-green-500" },
    { icon: Zap, label: "Bills", href: "/bills", color: "bg-orange-500" },
    { icon: CreditCard, label: "Cards", href: "/cards", color: "bg-purple-500" },
  ];

  const recentTransactions = [
    { id: 1, type: "credit", amount: 50000, description: "Salary Payment", time: "2 hours ago" },
    { id: 2, type: "debit", amount: 2500, description: "Uber Ride", time: "5 hours ago" },
    { id: 3, type: "debit", amount: 1200, description: "Airtime Purchase", time: "1 day ago" },
    { id: 4, type: "credit", amount: 15000, description: "Transfer from John", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Good morning!</h1>
            <p className="text-gray-600">John Doe</p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profile">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">JD</span>
              </div>
            </Link>
          </Button>
        </div>

        {/* Balance Card */}
        <Card className="mb-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-primary-100 text-sm">Account Balance</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {showBalance ? "₦125,450.00" : "••••••••"}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-white hover:bg-white/20"
                  >
                    {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Plus className="h-4 w-4 mr-1" />
                Add Money
              </Button>
            </div>
            <div className="text-primary-100 text-sm">
              <p>Account: 1234567890</p>
              <p>Kuda Microfinance Bank</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <div className="text-center">
                  <div className={`w-14 h-14 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-2 hover:scale-105 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-xs text-gray-600">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/transfer">View All</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'credit' ? '+' : '-'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.time}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
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

export default Dashboard;
