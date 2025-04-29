
import React from "react";
import { Card } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface TransactionSummaryProps {
  income: number;
  expenses: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ income, expenses }) => {
  const balance = income - expenses;
  
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="p-4 bg-green-50 border-green-100">
        <div className="flex items-center mb-1">
          <ArrowDownCircle className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-xs text-green-700">Income</span>
        </div>
        <p className="text-lg font-semibold text-green-700">${income.toFixed(2)}</p>
      </Card>
      
      <Card className="p-4 bg-red-50 border-red-100">
        <div className="flex items-center mb-1">
          <ArrowUpCircle className="w-4 h-4 text-red-500 mr-1" />
          <span className="text-xs text-red-700">Expenses</span>
        </div>
        <p className="text-lg font-semibold text-red-700">${expenses.toFixed(2)}</p>
      </Card>
      
      <Card className="p-4 bg-royal-purple/10 border-royal-purple/20">
        <div className="flex items-center mb-1">
          <span className="text-xs text-royal-darkPurple">Balance</span>
        </div>
        <p className={`text-lg font-semibold ${balance >= 0 ? 'text-green-700' : 'text-red-700'}`}>
          ${balance.toFixed(2)}
        </p>
      </Card>
    </div>
  );
};

export default TransactionSummary;
