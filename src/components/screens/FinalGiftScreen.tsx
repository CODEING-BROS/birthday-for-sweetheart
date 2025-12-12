import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";
import MagicButton from "../MagicButton";

interface FinalGiftScreenProps {
  onReplay: () => void;
}

const FinalGiftScreen = ({ onReplay }: FinalGiftScreenProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleGiftClick = () => {
    if (isOpened) return;
    
    setIsShaking(true);
    
    setTimeout(() => {
      setIsShaking(false);
      setIsOpened(true);
      
      // Big confetti burst
      const duration = 3000;
      const end = Date.now() + duration;
      
      const colors = ["#ff6b9d", "#a855f7", "#ffd700", "#ff9ecd", "#c084fc"];
      
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }, 600);
  };

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <FloatingHearts count={15} />
      <Sparkles count={25} />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* Gift Box */
          <motion.div
            key="gift"
            className="relative cursor-pointer"
            onClick={handleGiftClick}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ 
              scale: 1, 
              rotate: 0,
              y: isShaking ? [0, -5, 5, -5, 5, 0] : [0, -10, 0],
            }}
            transition={{
              scale: { type: "spring", stiffness: 200 },
              y: isShaking 
                ? { duration: 0.5 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.05 }}
          >
            <svg width="200" height="220" viewBox="0 0 200 220" className="drop-shadow-2xl">
              {/* Box Bottom */}
              <rect x="20" y="100" width="160" height="100" rx="10" fill="url(#boxGradient)" />
              <rect x="20" y="100" width="160" height="100" rx="10" fill="url(#boxShine)" opacity="0.3" />
              
              {/* Box Lid */}
              <motion.g
                animate={isShaking ? { y: -10, rotate: 5 } : {}}
                style={{ transformOrigin: "100px 100px" }}
              >
                <rect x="10" y="70" width="180" height="35" rx="8" fill="url(#lidGradient)" />
                <rect x="10" y="70" width="180" height="35" rx="8" fill="url(#lidShine)" opacity="0.3" />
              </motion.g>
              
              {/* Vertical Ribbon */}
              <rect x="90" y="70" width="20" height="130" fill="#ffd700" />
              <rect x="95" y="70" width="5" height="130" fill="#fff9c4" opacity="0.5" />
              
              {/* Horizontal Ribbon */}
              <rect x="10" y="78" width="180" height="15" fill="#ffd700" />
              <rect x="10" y="80" width="180" height="5" fill="#fff9c4" opacity="0.5" />
              
              {/* Bow */}
              <motion.g
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ transformOrigin: "100px 60px" }}
              >
                <ellipse cx="70" cy="55" rx="25" ry="18" fill="#ffd700" />
                <ellipse cx="130" cy="55" rx="25" ry="18" fill="#ffd700" />
                <ellipse cx="70" cy="55" rx="20" ry="12" fill="#fff9c4" opacity="0.4" />
                <ellipse cx="130" cy="55" rx="20" ry="12" fill="#fff9c4" opacity="0.4" />
                <circle cx="100" cy="60" r="12" fill="#ffd700" />
                <circle cx="100" cy="58" r="6" fill="#fff9c4" opacity="0.5" />
              </motion.g>
              
              {/* Sparkles */}
              <motion.circle
                cx="30"
                cy="60"
                r="3"
                fill="white"
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="170"
                cy="80"
                r="2"
                fill="white"
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="50"
                cy="180"
                r="2"
                fill="white"
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
              
              <defs>
                <linearGradient id="boxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b9d" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
                <linearGradient id="boxShine" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="50%" stopColor="transparent" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="lidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="lidShine" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="white" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
            
            <motion.p
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-soft-pink font-cute whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Tap to open! 🎁
            </motion.p>
          </motion.div>
        ) : (
          /* Final Message */
          <motion.div
            key="message"
            className="text-center max-w-lg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Card */}
            <motion.div
              className="relative card-romantic rounded-3xl p-8 neon-border"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span
                className="text-7xl block mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🥳
              </motion.span>
              
              <motion.h1
                className="text-3xl md:text-5xl font-romantic glow-text-pink mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
                  Lots of Love for You ❤️
                </span>
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-soft-pink font-cute leading-relaxed mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Once again, Happy Birthday!
                <br />
                Hope you loved your surprise.
              </motion.p>
              
              <motion.div
                className="flex justify-center gap-2 text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {["💖", "✨", "🎂", "✨", "💖"].map((emoji, i) => (
                  <motion.span
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <MagicButton onClick={onReplay}>
                Replay the Magic 🔄
              </MagicButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FinalGiftScreen;
