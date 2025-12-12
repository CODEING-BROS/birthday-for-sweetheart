import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";
import MagicButton from "../MagicButton";

interface CakeScreenProps {
  onNext: () => void;
}

const CakeScreen = ({ onNext }: CakeScreenProps) => {
  const [step, setStep] = useState<"appear" | "decorate" | "candle" | "complete">("appear");

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#ff6b9d", "#a855f7", "#ffd700", "#ff9ecd", "#c084fc"],
    });
  };

  const handleDecorate = () => setStep("decorate");
  const handleLightCandle = () => {
    triggerConfetti();
    setStep("candle");
    setTimeout(() => setStep("complete"), 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={12} />
      <Sparkles count={15} />

      {/* Cake Container */}
      <div className="relative w-72 h-80 md:w-96 md:h-96">
        {/* Bunting Flags - Only show after decorate */}
        <AnimatePresence>
          {(step === "decorate" || step === "candle" || step === "complete") && (
            <>
              <motion.div
                className="absolute -left-10 top-0 flex gap-2"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {["🎀", "💕", "🎀", "💕"].map((flag, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  >
                    {flag}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="absolute -right-10 top-0 flex gap-2"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {["💕", "🎀", "💕", "🎀"].map((flag, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{ rotate: [5, -5, 5] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                  >
                    {flag}
                  </motion.span>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Cake SVG */}
        <motion.svg
          viewBox="0 0 200 220"
          className="w-full h-full"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Plate */}
          <ellipse cx="100" cy="210" rx="90" ry="10" fill="#2d1b4e" />
          
          {/* Bottom Layer */}
          <rect x="20" y="150" width="160" height="60" rx="10" fill="url(#cakeGradient1)" />
          <rect x="20" y="150" width="160" height="8" rx="4" fill="#ff9ecd" opacity="0.5" />
          
          {/* Middle Layer */}
          <rect x="35" y="100" width="130" height="55" rx="8" fill="url(#cakeGradient2)" />
          <rect x="35" y="100" width="130" height="6" rx="3" fill="#c084fc" opacity="0.5" />
          
          {/* Top Layer */}
          <rect x="50" y="60" width="100" height="45" rx="6" fill="url(#cakeGradient3)" />
          <rect x="50" y="60" width="100" height="5" rx="2" fill="#ff6b9d" opacity="0.5" />
          
          {/* Dripping Frosting */}
          <AnimatePresence>
            {(step === "decorate" || step === "candle" || step === "complete") && (
              <motion.g
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M55 60 Q55 75 50 85 Q48 90 50 92 Q55 90 58 85 Q60 75 60 60" fill="#ff9ecd" />
                <path d="M85 60 Q85 80 80 95 Q78 100 80 102 Q85 100 88 95 Q92 80 90 60" fill="#ff9ecd" />
                <path d="M115 60 Q115 78 110 90 Q108 95 110 97 Q115 95 118 90 Q122 78 120 60" fill="#ff9ecd" />
                <path d="M140 60 Q140 72 136 82 Q134 86 136 88 Q140 86 143 82 Q146 72 145 60" fill="#ff9ecd" />
              </motion.g>
            )}
          </AnimatePresence>
          
          {/* Sprinkles */}
          <AnimatePresence>
            {(step === "decorate" || step === "candle" || step === "complete") && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, staggerChildren: 0.05 }}
              >
                {[
                  { x: 65, y: 70, color: "#ffd700" },
                  { x: 80, y: 75, color: "#ff6b9d" },
                  { x: 95, y: 68, color: "#a855f7" },
                  { x: 110, y: 73, color: "#00d4ff" },
                  { x: 125, y: 69, color: "#ffd700" },
                  { x: 140, y: 74, color: "#ff6b9d" },
                ].map((sprinkle, i) => (
                  <motion.rect
                    key={i}
                    x={sprinkle.x}
                    y={sprinkle.y}
                    width="4"
                    height="2"
                    rx="1"
                    fill={sprinkle.color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>
          
          {/* Candle */}
          <rect x="95" y="35" width="10" height="30" fill="#ff9ecd" rx="2" />
          <rect x="97" y="35" width="3" height="30" fill="#ffc0d8" opacity="0.5" />
          
          {/* Flame */}
          <AnimatePresence>
            {(step === "candle" || step === "complete") && (
              <motion.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow */}
                <motion.ellipse
                  cx="100"
                  cy="25"
                  rx="20"
                  ry="25"
                  fill="url(#flameGlow)"
                  opacity="0.5"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
                {/* Flame */}
                <motion.path
                  d="M100 10 Q108 20 105 28 Q102 35 100 35 Q98 35 95 28 Q92 20 100 10"
                  fill="url(#flameGradient)"
                  animate={{
                    d: [
                      "M100 10 Q108 20 105 28 Q102 35 100 35 Q98 35 95 28 Q92 20 100 10",
                      "M100 8 Q106 18 104 26 Q102 33 100 33 Q98 33 96 26 Q94 18 100 8",
                      "M100 10 Q108 20 105 28 Q102 35 100 35 Q98 35 95 28 Q92 20 100 10",
                    ],
                  }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                />
              </motion.g>
            )}
          </AnimatePresence>
          
          <defs>
            <linearGradient id="cakeGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="cakeGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="cakeGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
            <radialGradient id="flameGlow">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ff6b35" />
              <stop offset="50%" stopColor="#ffd700" />
              <stop offset="100%" stopColor="#fff9c4" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Birthday Text */}
      <AnimatePresence>
        {step === "complete" && (
          <motion.h1
            className="text-3xl md:text-5xl font-romantic text-center mt-4 glow-text-pink"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [0, -5, 0],
            }}
            transition={{ 
              duration: 0.8,
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
              Happy Birthday, Sweetheart! 🎂
            </span>
          </motion.h1>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          {step === "appear" && (
            <MagicButton key="decorate" onClick={handleDecorate}>
              Decorate the Cake 🎨
            </MagicButton>
          )}
          {step === "decorate" && (
            <MagicButton key="light" onClick={handleLightCandle}>
              Light the Candle 🕯️
            </MagicButton>
          )}
          {step === "complete" && (
            <MagicButton key="next" onClick={onNext} delay={0.5}>
              Continue 💝
            </MagicButton>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CakeScreen;
