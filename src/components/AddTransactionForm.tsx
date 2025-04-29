
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { X, Calendar, Plus } from "lucide-react";

interface AddTransactionFormProps {
  onAddTransaction: (transaction: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => void;
}

const categories = [
  { value: "food", label: "Food", emoji: "🍔" },
  { value: "transport", label: "Transport", emoji: "🚗" },
  { value: "shopping", label: "Shopping", emoji: "🛍️" },
  { value: "entertainment", label: "Entertainment", emoji: "🎬" },
  { value: "health", label: "Health", emoji: "💊" },
  { value: "other", label: "Other", emoji: "📋" },
];

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onAddTransaction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid number for amount",
        variant: "destructive",
      });
      return;
    }
    
    const newTransaction = {
      title,
      amount: numAmount,
      category,
      date: new Date().toISOString(),
    };
    
    onAddTransaction(newTransaction);
    setIsOpen(false);
    resetForm();
    
    toast({
      title: "Transaction added",
      description: "Your transaction has been added successfully",
    });
  };
  
  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("food");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-24 right-6 rounded-full w-14 h-14 p-0 shadow-lg ripple-container bg-royal-purple hover:bg-royal-darkPurple"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="royal-card p-0 overflow-hidden">
        <DialogHeader className="bg-royal-purple text-white p-4">
          <DialogTitle className="flex justify-between items-center">
            <span>Add New Transaction</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-white" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Grocery shopping"
              className="border-royal-purple/20 focus-visible:ring-royal-purple"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input 
              id="amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="24.99"
              type="number"
              step="0.01"
              className="border-royal-purple/20 focus-visible:ring-royal-purple"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Category</Label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.value)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border transition-all ${
                    category === cat.value 
                      ? "border-royal-purple bg-royal-purple/10" 
                      : "border-gray-200"
                  }`}
                >
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-xs mt-1">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" /> 
              <span>Today</span>
            </div>
            <Button 
              type="submit"
              className="bg-royal-purple hover:bg-royal-darkPurple"
            >
              Add Transaction
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionForm;
