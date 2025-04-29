
import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { PieChart } from "lucide-react";

interface Budget {
  id: string;
  title: string;
  spent: number;
  limit: number;
  color: string;
  categories: string[];
}

interface BudgetCarouselProps {
  budgets: Budget[];
}

const BudgetCarousel: React.FC<BudgetCarouselProps> = ({ budgets }) => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});
  
  const toggleFlip = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold px-2 mb-4">Your Budgets</h2>
      
      <div className="flex overflow-x-auto snap-x snap-mandatory pb-6 px-2 -mx-2 scrollbar-none">
        {budgets.map((budget) => (
          <div
            key={budget.id}
            className={`budget-card snap-center ${
              flipped[budget.id] ? "flip" : "flip-back"
            }`}
            onClick={() => toggleFlip(budget.id)}
            style={{ backgroundColor: budget.color }}
          >
            <div className="budget-card-front">
              <h3 className="font-bold text-lg mb-1">{budget.title}</h3>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm opacity-80">
                  ${budget.spent} of ${budget.limit}
                </span>
                <span className="text-xs px-2 py-1 bg-black bg-opacity-10 rounded-full">
                  {Math.round((budget.spent / budget.limit) * 100)}%
                </span>
              </div>
              
              <Progress
                value={(budget.spent / budget.limit) * 100}
                className="h-2 mb-3 bg-black/10"
              />
              
              <div className="mt-auto text-xs opacity-60 flex items-center">
                <PieChart className="w-4 h-4 mr-1" />
                <span>Tap for details</span>
              </div>
            </div>
            
            <div className="budget-card-back">
              <h3 className="font-bold mb-2">Category Breakdown</h3>
              <ul className="text-sm space-y-1">
                {budget.categories.map((category, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{category}</span>
                    <span>${Math.floor(budget.spent / budget.categories.length)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetCarousel;
