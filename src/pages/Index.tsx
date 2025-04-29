
import React, { useState } from "react";
import Layout from "@/components/Layout";
import SpendingChart from "@/components/SpendingChart";
import TransactionList from "@/components/TransactionList";
import BudgetCarousel from "@/components/BudgetCarousel";
import AddTransactionForm from "@/components/AddTransactionForm";
import BalanceSummary from "@/components/BalanceSummary";
import { mockTransactions, mockBudgets, mockChartData, getIncome, getExpenses, getBalance } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CalendarDays, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [view, setView] = useState("all");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAddTransaction = (newTransaction: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    const transaction = {
      ...newTransaction,
      id: `tx-${Date.now()}`,
    };
    setTransactions([transaction, ...transactions]);
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed successfully.",
      duration: 3000,
    });
  };

  // Get the current date formatted
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500">{formattedDate}</p>
          <h2 className="text-2xl font-bold text-royal-darkPurple">Dashboard</h2>
        </div>
        
        <BalanceSummary 
          income={getIncome()} 
          expenses={getExpenses()} 
          balance={getBalance()} 
        />
        
        <Card className="royal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-royal-darkPurple">Spending Overview</CardTitle>
            <Tabs defaultValue="month" className="w-full">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <SpendingChart data={mockChartData} />
          </CardContent>
        </Card>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-royal-darkPurple">Budget Status</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-royal-purple text-xs flex items-center"
              onClick={() => navigate('/budgets')}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <BudgetCarousel budgets={mockBudgets} />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-royal-darkPurple">Recent Transactions</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-royal-purple text-xs flex items-center"
              onClick={() => navigate('/transactions')}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue={view} onValueChange={setView}>
            <TabsList className="w-full grid grid-cols-3 mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <TransactionList 
                transactions={transactions.slice(0, 3)} 
                onDelete={handleDeleteTransaction} 
              />
            </TabsContent>
            
            <TabsContent value="income">
              <TransactionList 
                transactions={transactions.filter(tx => tx.amount > 0).slice(0, 3)} 
                onDelete={handleDeleteTransaction} 
              />
            </TabsContent>
            
            <TabsContent value="expense">
              <TransactionList 
                transactions={transactions.filter(tx => tx.amount < 0).slice(0, 3)} 
                onDelete={handleDeleteTransaction} 
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate('/transactions')}
            className="py-8 flex flex-col h-auto items-center justify-center border-royal-purple/20 hover:border-royal-purple"
          >
            <Wallet className="h-6 w-6 mb-2 text-royal-purple" />
            <span className="text-royal-darkPurple">All Transactions</span>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/settings')} 
            className="py-8 flex flex-col h-auto items-center justify-center border-royal-purple/20 hover:border-royal-purple"
          >
            <CalendarDays className="h-6 w-6 mb-2 text-royal-purple" />
            <span className="text-royal-darkPurple">Financial Calendar</span>
          </Button>
        </div>
        
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      </div>
    </Layout>
  );
};

export default Index;
