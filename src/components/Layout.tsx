
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Wallet, BarChart2, Settings } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      <header className="py-4 px-5 flex items-center justify-between">
        <h1 className="text-xl font-bold">Pulse Finance</h1>
      </header>
      
      <main className="flex-1 container max-w-md mx-auto pb-20">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 rounded-t-xl z-50">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full grid grid-cols-4 h-16">
            <TabsTrigger value="home" className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent">
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent">
              <Wallet className="w-5 h-5" />
              <span className="text-xs">Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent">
              <BarChart2 className="w-5 h-5" />
              <span className="text-xs">Budgets</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex flex-col items-center justify-center gap-1 data-[state=active]:bg-transparent">
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
