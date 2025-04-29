
import React from "react";
import Layout from "@/components/Layout";
import BudgetCarousel from "@/components/BudgetCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockBudgets } from "@/data/mockData";

const Budgets = () => {
  // Calculate total budget and spent amounts
  const totalBudget = mockBudgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const percentSpent = (totalSpent / totalBudget) * 100;

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-royal-darkPurple">Budgets</h2>
        
        <Card className="royal-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-royal-darkPurple">Monthly Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Total Spent</span>
              <span className="font-medium">${totalSpent.toLocaleString()} <span className="text-sm text-gray-500">/ ${totalBudget.toLocaleString()}</span></span>
            </div>
            <Progress
              value={percentSpent}
              className="h-2 mb-3"
            />
            <p className="text-sm text-gray-500 mt-2">
              {percentSpent < 75 
                ? `You've used ${Math.round(percentSpent)}% of your monthly budget.` 
                : `Warning: You've used ${Math.round(percentSpent)}% of your monthly budget!`}
            </p>
          </CardContent>
        </Card>
        
        <BudgetCarousel budgets={mockBudgets} />
        
        <div className="text-center mt-8">
          <span className="text-sm text-gray-500">
            Add and edit budget categories in the settings tab
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Budgets;
