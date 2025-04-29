
import React, { useState } from "react";
import Layout from "@/components/Layout";
import SpendingChart from "@/components/SpendingChart";
import TransactionList from "@/components/TransactionList";
import BudgetCarousel from "@/components/BudgetCarousel";
import AddTransactionButton from "@/components/AddTransactionButton";
import BalanceSummary from "@/components/BalanceSummary";
import { mockTransactions, mockBudgets, mockChartData, getIncome, getExpenses, getBalance } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const { toast } = useToast();
  
  const handleAddTransaction = () => {
    toast({
      title: "Add Transaction",
      description: "This feature will be available in the next update!",
      duration: 3000,
    });
  };
  
  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((tx) => tx.id !== id));
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed successfully.",
      duration: 3000,
    });
  };

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        
        <BalanceSummary 
          income={getIncome()} 
          expenses={getExpenses()} 
          balance={getBalance()} 
        />
        
        <SpendingChart data={mockChartData} />
        
        <BudgetCarousel budgets={mockBudgets} />
        
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction} 
        />
        
        <AddTransactionButton onClick={handleAddTransaction} />
      </div>
    </Layout>
  );
};

export default Index;
