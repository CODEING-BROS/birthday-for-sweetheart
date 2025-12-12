import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "../FloatingHearts";
import MagicButton from "../MagicButton";

interface BalloonScreenProps {
  onNext: () => void;
}

const BalloonScreen = ({ onNext }: BalloonScreenProps) => {
  const [poppedBalloons, setPoppedBalloons] = useState<number[]>([]);

  const balloons = [
    { id: 1, x: 15, y: 30, color: "#ff6b9d", delay: 0 },
    { id: 2, x: 35, y: 20, color: "#a855f7", delay: 0.2 },
    { id: 3, x: 50, y: 35, color: "#ff9ecd", delay: 0.4 },
    { id: 4, x: 65, y: 25, color: "#c084fc", delay: 0.6 },
    { id: 5, x: 85, y: 30, color: "#db2777", delay: 0.8 },
  ];

  const popBalloon = (id: number) => {
    if (poppedBalloons.includes(id)) return;
    
    setPoppedBalloons((prev) => [...prev, id]);
    
    // Mini confetti burst
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { x: balloons.find(b => b.id === id)!.x / 100, y: 0.4 },
      colors: ["#ff6b9d", "#a855f7", "#ffd700"],
    });
  };

  const allPopped = poppedBalloons.length === balloons.length;

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={10} />

      <motion.h2
        className="text-2xl md:text-4xl font-romantic text-center mb-8 glow-text-pink"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
          Pop All the Balloons! 🎈
        </span>
      </motion.h2>

      {/* Balloons Container */}
      <div className="relative w-full h-64 md:h-80 max-w-lg">
        {balloons.map((balloon) => (
          <AnimatePresence key={balloon.id}>
            {!poppedBalloons.includes(balloon.id) && (
              <motion.div
                className="absolute cursor-pointer"
                style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
                initial={{ scale: 0, y: 100, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  y: [0, -10, 0], 
                  opacity: 1,
                }}
                exit={{ scale: [1, 1.5, 0], opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: balloon.delay,
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [-5, 5, -5, 5, 0],
                  transition: { rotate: { duration: 0.5, repeat: Infinity } }
                }}
                onClick={() => popBalloon(balloon.id)}
              >
                <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
                  {/* Balloon */}
                  <ellipse
                    cx="30"
                    cy="30"
                    rx="28"
                    ry="35"
                    fill={balloon.color}
                    className="drop-shadow-lg"
                  />
                  {/* Shine */}
                  <ellipse
                    cx="20"
                    cy="20"
                    rx="8"
                    ry="12"
                    fill="white"
                    opacity="0.4"
                  />
                  {/* Knot */}
                  <polygon points="30,65 26,70 34,70" fill={balloon.color} />
                  {/* String */}
                  <path
                    d="M30 70 Q 32 75, 28 80 Q 26 85, 30 90"
                    stroke="#c084fc"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        ))}

        {/* Pop effects */}
        {poppedBalloons.map((id) => {
          const balloon = balloons.find(b => b.id === id)!;
          return (
            <motion.div
              key={`pop-${id}`}
              className="absolute text-4xl"
              style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: [1, 2], opacity: [1, 0] }}
              transition={{ duration: 0.5 }}
            >
              💥
            </motion.div>
          );
        })}
      </div>

      {/* Progress */}
      <motion.p
        className="text-soft-pink font-cute text-lg mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {poppedBalloons.length} / {balloons.length} popped
      </motion.p>

      {/* Next Button */}
      <AnimatePresence>
        {allPopped && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <MagicButton onClick={onNext}>
              Next 💫
            </MagicButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BalloonScreen;
