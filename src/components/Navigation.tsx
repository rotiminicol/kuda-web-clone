
import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Send, User, Smartphone } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/dashboard" },
    { icon: Send, label: "Transfer", href: "/transfer" },
    { icon: Smartphone, label: "Bills", href: "/bills" },
    { icon: CreditCard, label: "Cards", href: "/cards" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
