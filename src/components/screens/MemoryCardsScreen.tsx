import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";
import FloatingHearts from "../FloatingHearts";
import MagicButton from "../MagicButton";

interface MemoryCardsScreenProps {
  onNext: () => void;
}

const MemoryCardsScreen = ({ onNext }: MemoryCardsScreenProps) => {
  const memories = [
  {
    id: 1,
    emoji: "🌟",
    text: "Every moment with you is magical",
    img: "/1.jpeg"
  },
  {
    id: 2,
    emoji: "💕",
    text: "You make my heart smile",
    img: "/2.jpeg"
  },
  {
    id: 3,
    emoji: "🌸",
    text: "You're my favorite person",
    img: "/3.jpeg"
  },
  {
    id: 4,
    emoji: "✨",
    text: "Dreams come true with you",
    img: "/4.jpeg"
  },
];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitX, setExitX] = useState(0);

  const handleDragEnd = (info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      setExitX(info.offset.x > 0 ? 300 : -300);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setExitX(0);
      }, 300);
    }
  };

  const isComplete = currentIndex >= memories.length;

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={12} />

      <motion.h2
        className="text-2xl md:text-4xl font-romantic text-center mb-8 glow-text-pink"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
          Swipe Through Memories 💝
        </span>
      </motion.h2>

      {/* Cards Stack */}
      <div className="relative w-72 h-96 md:w-80 md:h-[28rem]">
        <AnimatePresence>
          {!isComplete &&
            memories
              .slice(currentIndex, currentIndex + 3)
              .reverse()
              .map((memory, i) => {
                const isTop = i === memories.slice(currentIndex, currentIndex + 3).length - 1;
                return (
                  <motion.div
                    key={memory.id}
                    className="absolute inset-0 card-romantic rounded-3xl p-6 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
                    style={{
                      zIndex: i,
                      transformOrigin: "center center",
                    }}
                    initial={{ scale: 0.95 - i * 0.05, y: i * 10 }}
                    animate={{
                      scale: 1 - (2 - i) * 0.05,
                      y: (2 - i) * 10,
                      rotate: isTop ? 0 : (2 - i) * 2,
                      x: isTop ? exitX : 0,
                    }}
                    exit={{
                      x: exitX,
                      rotate: exitX > 0 ? 20 : -20,
                      opacity: 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    drag={isTop ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={(_, info) => isTop && handleDragEnd(info)}
                    whileHover={isTop ? { y: -10, boxShadow: "0 20px 50px hsl(320 100% 60% / 0.3)" } : {}}
                  >
                    {/* Decorative border */}
                    <div className="absolute inset-2 rounded-2xl border border-primary/30" />
                    
                    {/* Image */}
                    <motion.img
                      src={memory.img}
                      alt="memory"
                      className="w-40 h-40 md:w-48 md:h-48 object-cover rounded-2xl mb-6 shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />


                    {/* Content */}
                    <motion.span
                      className="text-6xl md:text-7xl mb-6"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {memory.emoji}
                    </motion.span>
                    <p className="text-xl md:text-2xl font-cute text-center text-soft-pink leading-relaxed">
                      {memory.text}
                    </p>
                    
                    {/* Swipe hint */}
                    {isTop && (
                      <motion.p
                        className="absolute bottom-6 text-muted-foreground text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ← Swipe to continue →
                      </motion.p>
                    )}
                  </motion.div>
                );
              })}
        </AnimatePresence>

        {/* Completion state */}
        {isComplete && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.span
              className="text-8xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              💖
            </motion.span>
            <p className="text-2xl font-romantic text-soft-pink glow-text-pink">
              You've seen them all!
            </p>
          </motion.div>
        )}
      </div>

      {/* Progress */}
      <motion.div
        className="flex gap-2 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {memories.map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < currentIndex ? "bg-primary" : "bg-muted"
            }`}
            animate={i < currentIndex ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* Next Button */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <MagicButton onClick={onNext}>
              Open My Message 💌
            </MagicButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MemoryCardsScreen;
