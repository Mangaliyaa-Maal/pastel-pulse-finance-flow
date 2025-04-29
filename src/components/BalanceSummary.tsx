
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BalanceSummaryProps {
  income: number;
  expenses: number;
  balance: number;
}

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  income,
  expenses,
  balance,
}) => {
  return (
    <Card className="shadow-md card-gradient">
      <CardContent className="p-5">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-1">Income</span>
            <div className="flex items-center text-green-500">
              <ArrowUp className="w-4 h-4 mr-1" />
              <span className="font-bold">${income.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-1">Expenses</span>
            <div className="flex items-center text-red-500">
              <ArrowDown className="w-4 h-4 mr-1" />
              <span className="font-bold">${expenses.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600 mb-1">Balance</span>
            <span className={`font-bold ${balance >= 0 ? "text-blue-500" : "text-red-500"}`}>
              ${balance.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;
