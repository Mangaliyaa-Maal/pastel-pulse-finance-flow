
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Budget {
  id: string;
  title: string;
  spent: number;
  limit: number;
  color: string;
  categories: string[];
}

interface BudgetCategoryListProps {
  budgets: Budget[];
}

const BudgetCategoryList: React.FC<BudgetCategoryListProps> = ({ budgets }) => {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const percentage = (budget.spent / budget.limit) * 100;
        return (
          <Card key={budget.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: budget.color }}></div>
                  <h3 className="font-medium">{budget.title}</h3>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-1">
                <span>${budget.spent.toLocaleString()}</span>
                <span className="text-gray-500">of ${budget.limit.toLocaleString()}</span>
              </div>
              
              <Progress 
                value={percentage} 
                className="h-2 mb-3"
              />
              
              <div className="mt-3">
                <h4 className="text-xs text-gray-500 mb-1">Includes:</h4>
                <div className="flex flex-wrap gap-1">
                  {budget.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BudgetCategoryList;
