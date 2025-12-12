import { motion } from "framer-motion";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";
import MagicButton from "../MagicButton";

interface WordAnimationScreenProps {
  onNext: () => void;
}

const WordAnimationScreen = ({ onNext }: WordAnimationScreenProps) => {
  const words = ["You", "are", "my" , "cutie"];

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={12} />
      <Sparkles count={15} />

      {/* SVG with curved lines and words */}
      <div className="relative w-full max-w-lg h-80 md:h-96">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          {/* Curved lines from center bottom to each word */}
          {words.map((_, i) => {
            const startX = 200;
            const startY = 280;
            const endX = 60 + i * 100;
            const endY = 80;
            const controlX = startX + (endX - startX) * 0.3;
            const controlY = 180;
            
            return (
              <motion.path
                key={`line-${i}`}
                d={`M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="1000"
                strokeDashoffset="1000"
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: i * 0.3, ease: "easeOut" }}
              />
            );
          })}
          
          {/* Words */}
          {words.map((word, i) => (
            <motion.text
              key={word}
              x={60 + i * 100}
              y={60}
              textAnchor="middle"
              className="font-romantic text-3xl md:text-4xl"
              fill="url(#textGradient)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.4 }}
              filter="url(#glow)"
            >
              {word}
            </motion.text>
          ))}
          
          {/* Heart at center bottom */}
          <motion.text
            x="200"
            y="260"
            textAnchor="middle"
            className="text-4xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.2, 1], 
              opacity: 1,
            }}
            transition={{ 
              delay: 2.5,
              duration: 0.5,
              scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            💖
          </motion.text>
          
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff9ecd" />
              <stop offset="50%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      <MagicButton onClick={onNext} delay={3}>
        Continue 💕
      </MagicButton>
    </motion.div>
  );
};

export default WordAnimationScreen;
