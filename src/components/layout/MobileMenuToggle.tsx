
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  onClick: () => void;
  isOpen?: boolean; // Adding the isOpen prop to the interface
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ onClick, isOpen }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
};

export default MobileMenuToggle;
