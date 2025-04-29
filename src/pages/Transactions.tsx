
import React, { useState } from "react";
import Layout from "@/components/Layout";
import TransactionList from "@/components/TransactionList";
import AddTransactionForm from "@/components/AddTransactionForm";
import { mockTransactions } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Upload, SlidersHorizontal } from "lucide-react";
import TransactionSummary from "@/components/TransactionSummary";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [filterOpen, setFilterOpen] = useState(false);
  const { toast } = useToast();

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
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

  // Calculate total income and expenses
  const totalIncome = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpenses = Math.abs(
    transactions
      .filter((tx) => tx.amount < 0)
      .reduce((sum, tx) => sum + tx.amount, 0)
  );

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold text-royal-darkPurple">Transactions</h2>
        
        <TransactionSummary 
          income={totalIncome} 
          expenses={totalExpenses} 
        />
        
        <div className="flex items-center justify-between">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <TransactionList
                transactions={transactions}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
            
            <TabsContent value="income">
              <TransactionList
                transactions={transactions.filter(tx => tx.amount > 0)}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
            
            <TabsContent value="expenses">
              <TransactionList
                transactions={transactions.filter(tx => tx.amount < 0)}
                onDelete={handleDeleteTransaction}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex space-x-3 mt-8">
          <Button variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      </div>
    </Layout>
  );
};

export default Transactions;
