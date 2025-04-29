
import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface SpendingChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  
  const handleMouseEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius={({ index }) => (activeIndex === index ? "80%" : "70%")}
            dataKey="value"
            stroke="none"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animationBegin={100}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-sm text-gray-500">Total Spent</p>
        <h2 className="text-3xl font-bold">${total.toLocaleString()}</h2>
        {activeIndex !== null && (
          <p className="text-sm font-medium mt-1">{data[activeIndex].name}: ${data[activeIndex].value}</p>
        )}
      </div>
    </div>
  );
};

export default SpendingChart;
