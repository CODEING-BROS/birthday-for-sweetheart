import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";

interface CountdownScreenProps {
  onComplete: () => void;
}

const CountdownScreen = ({ onComplete }: CountdownScreenProps) => {
  const [count, setCount] = useState(3);

  // total duration of 1 number frame
  const FRAME = 1600; // 1.6s – perfect for dramatic numbers

  useEffect(() => {
    if (count === 0) {
      const timer = setTimeout(onComplete, FRAME);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCount(prev => prev - 1);
    }, FRAME);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingHearts count={20} />
      <Sparkles count={30} />

      {/* Neon Ring */}
      <motion.div
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full neon-ring"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute inset-4 rounded-full border-2 border-accent/50"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-8 rounded-full border border-primary/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Countdown Number */}
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          className="relative z-10 text-9xl md:text-[13rem] font-romantic font-bold glow-text-pink"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.6 }}
          transition={{ duration: 0.8, ease: "easeInOut" }} // smooth + predictable
        >
          <span className="bg-gradient-to-b from-primary via-soft-pink to-accent bg-clip-text text-transparent">
            {count}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Shimmer Text */}
      <motion.p
        className="absolute bottom-20 text-xl md:text-2xl font-cute text-soft-pink glow-text-pink"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          className="inline-block"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨ Crafting your special moment... ✨
        </motion.span>
      </motion.p>
    </motion.div>
  );
};

export default CountdownScreen;
