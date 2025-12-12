import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MagicButtonProps {
  children: ReactNode;
  onClick: () => void;
  delay?: number;
  className?: string;
}

const MagicButton = ({ children, onClick, delay = 0, className = "" }: MagicButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`relative px-8 py-4 rounded-2xl font-cute font-semibold text-lg gradient-button glow-pink overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 50px hsl(320 100% 60% / 0.8), 0 0 100px hsl(320 100% 60% / 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "easeInOut",
        }}
      />
      <span className="relative z-10 text-primary-foreground">{children}</span>
    </motion.button>
  );
};

export default MagicButton;
