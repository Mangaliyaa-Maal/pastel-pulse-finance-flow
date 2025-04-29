
import React, { useState } from "react";
import Layout from "@/components/Layout";
import BudgetCarousel from "@/components/BudgetCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockBudgets } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BudgetCategoryList from "@/components/BudgetCategoryList";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const Budgets = () => {
  const [timePeriod, setTimePeriod] = useState("month");
  const navigate = useNavigate();
  
  // Calculate total budget and spent amounts
  const totalBudget = mockBudgets.reduce((sum, budget) => sum + budget.limit, 0);
  const totalSpent = mockBudgets.reduce((sum, budget) => sum + budget.spent, 0);
  const percentSpent = (totalSpent / totalBudget) * 100;
  
  // Calculate remaining days in month
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const currentDay = new Date().getDate();
  const remainingDays = daysInMonth - currentDay;

  return (
    <Layout>
      <div className="p-5 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-royal-darkPurple">Budgets</h2>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card className="royal-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg text-royal-darkPurple">Budget Overview</CardTitle>
                  <div className="flex space-x-1 text-xs">
                    <Button 
                      variant={timePeriod === "week" ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setTimePeriod("week")}
                      className={timePeriod === "week" ? "bg-royal-purple text-white" : ""}
                    >
                      Week
                    </Button>
                    <Button 
                      variant={timePeriod === "month" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setTimePeriod("month")}
                      className={timePeriod === "month" ? "bg-royal-purple text-white" : ""}
                    >
                      Month
                    </Button>
                  </div>
                </div>
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
                <div className="flex justify-between mt-4 mb-1">
                  <div className="text-sm">
                    <p className="text-gray-500">Remaining</p>
                    <p className="font-semibold text-royal-purple">${(totalBudget - totalSpent).toLocaleString()}</p>
                  </div>
                  <div className="text-sm text-right">
                    <p className="text-gray-500">Daily Budget</p>
                    <p className="font-semibold text-royal-purple">${Math.round((totalBudget - totalSpent) / remainingDays).toLocaleString()}/day</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  {percentSpent < 75 
                    ? `You've used ${Math.round(percentSpent)}% of your ${timePeriod}ly budget. ${remainingDays} days remaining.` 
                    : `Warning: You've used ${Math.round(percentSpent)}% of your ${timePeriod}ly budget! ${remainingDays} days remaining.`}
                </p>
              </CardContent>
            </Card>
            
            <BudgetCarousel budgets={mockBudgets} />
            
            <Button 
              onClick={() => navigate('/settings')} 
              variant="outline" 
              className="w-full border-dashed border-2 border-royal-purple/30 hover:border-royal-purple py-6"
            >
              <Plus className="mr-2 w-5 h-5 text-royal-purple" />
              <span className="text-royal-purple">Add Budget Category</span>
            </Button>
          </TabsContent>
          
          <TabsContent value="categories">
            <BudgetCategoryList budgets={mockBudgets} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Budgets;
