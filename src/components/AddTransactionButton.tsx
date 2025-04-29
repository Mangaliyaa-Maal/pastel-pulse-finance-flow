
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTransactionButtonProps {
  onClick: () => void;
}

const AddTransactionButton: React.FC<AddTransactionButtonProps> = ({ onClick }) => {
  const [isRippling, setIsRippling] = useState(false);
  const [rippleX, setRippleX] = useState(0);
  const [rippleY, setRippleY] = useState(0);
  
  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRippleX(x);
    setRippleY(y);
    setIsRippling(true);
    
    setTimeout(() => {
      setIsRippling(false);
    }, 600);
    
    onClick();
  };

  return (
    <Button
      onClick={createRipple}
      className="fixed bottom-24 right-6 rounded-full w-14 h-14 p-0 shadow-lg ripple-container"
    >
      <Plus className="w-6 h-6" />
      {isRippling && (
        <span
          className="ripple"
          style={{
            left: rippleX,
            top: rippleY,
          }}
        />
      )}
    </Button>
  );
};

export default AddTransactionButton;
