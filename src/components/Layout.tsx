
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wallet, Settings, ChartBar } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const getCurrentPath = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/transactions") return "transactions";
    if (path === "/budgets") return "budgets";
    if (path === "/settings") return "settings";
    return "home";
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="py-4 px-5 flex items-center justify-between bg-royal-purple text-white">
        <h1 className="text-xl font-bold">Pulse Finance</h1>
        <div className="flex items-center space-x-2">
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Premium</span>
        </div>
      </header>
      
      <main className="flex-1 container max-w-md mx-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 rounded-t-xl z-50">
        <Tabs value={getCurrentPath()} className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-16">
            <TabsTrigger 
              value="home" 
              onClick={() => navigate('/')}
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent data-[state=active]:text-royal-purple"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              onClick={() => navigate('/transactions')}
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent data-[state=active]:text-royal-purple"
            >
              <Wallet className="w-5 h-5" />
              <span className="text-xs">Transactions</span>
            </TabsTrigger>
            <TabsTrigger 
              value="budgets" 
              onClick={() => navigate('/budgets')}
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent data-[state=active]:text-royal-purple"
            >
              <ChartBar className="w-5 h-5" />
              <span className="text-xs">Budgets</span>
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              onClick={() => navigate('/settings')}
              className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent data-[state=active]:text-royal-purple"
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  );
};

export default Layout;
