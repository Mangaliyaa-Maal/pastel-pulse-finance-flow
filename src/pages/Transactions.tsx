
import React, { useState } from "react";
import Layout from "@/components/Layout";
import TransactionList from "@/components/TransactionList";
import AddTransactionForm from "@/components/AddTransactionForm";
import { mockTransactions } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
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

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-royal-darkPurple">Transactions</h2>
        
        <TransactionList
          transactions={transactions}
          onDelete={handleDeleteTransaction}
        />
        
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      </div>
    </Layout>
  );
};

export default Transactions;
