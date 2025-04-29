
import React, { useState } from "react";
import { Trash } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const categoryIcons: Record<string, string> = {
  food: "🍔",
  transport: "🚗",
  shopping: "🛍️",
  entertainment: "🎬",
  health: "💊",
  other: "📋",
};

const categoryColors: Record<string, string> = {
  food: "bg-expense-food",
  transport: "bg-expense-transport",
  shopping: "bg-expense-shopping",
  entertainment: "bg-expense-entertainment",
  health: "bg-expense-health",
  other: "bg-expense-other",
};

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete,
}) => {
  const [activeSwipe, setActiveSwipe] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  
  const handleSwipeStart = (id: string) => {
    setActiveSwipe(id);
  };
  
  const handleSwipeReset = () => {
    setActiveSwipe(null);
  };
  
  const handleDelete = (id: string) => {
    onDelete(id);
    handleSwipeReset();
  };
  
  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="space-y-1 mt-6">
      <h2 className="text-lg font-bold px-2 mb-4">Recent Transactions</h2>
      
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-gray-400">
          <div className="text-3xl mb-2">📭</div>
          <p>No transactions yet</p>
        </div>
      ) : (
        transactions.map((transaction) => (
          <div key={transaction.id} className="relative overflow-hidden">
            <div
              className={`transaction-item ${
                activeSwipe === transaction.id ? "-translate-x-16" : ""
              }`}
              onTouchStart={() => handleSwipeStart(transaction.id)}
              onClick={() => toggleExpand(transaction.id)}
              style={{ touchAction: "pan-y", transition: "transform 0.3s ease" }}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                  categoryColors[transaction.category]
                } group-hover:animate-bounce`}
              >
                <span className="text-lg">{categoryIcons[transaction.category]}</span>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{transaction.title}</h3>
                <p className="text-xs text-gray-500">{transaction.date}</p>
                
                {expanded === transaction.id && (
                  <div className="mt-2 text-sm text-gray-600 animate-fade-in">
                    <p>Category: {transaction.category}</p>
                    <p>Added on: {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
              
              <span
                className={`font-medium ${
                  transaction.amount < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {transaction.amount < 0 ? "-" : "+"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </span>
            </div>
            
            <div
              className="transaction-item-action bg-red-500"
              onClick={() => handleDelete(transaction.id)}
            >
              <Trash className="w-5 h-5" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TransactionList;
