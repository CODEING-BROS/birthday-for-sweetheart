import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import FloatingHearts from "../FloatingHearts";
import MagicButton from "../MagicButton";

interface BirthdayCardScreenProps {
  onNext: () => void;
}

const BirthdayCardScreen = ({ onNext }: BirthdayCardScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const message = `My Dearest Sweetheart,

On this special day, I want you to know how incredibly grateful I am to have you in my life. Your smile lights up my world, and your love makes every moment magical.

You are not just another year older – you are another year more amazing, more beautiful, and more wonderful. Every day with you is a gift, and I cherish every single moment we share.

May this birthday bring you all the happiness you deserve and more. May your dreams come true and your heart be filled with joy.

Thank you for being you. Thank you for being mine.

With all my love and endless hugs,
Your Forever ❤️`;

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
          A Special Message For You 💌
        </span>
      </motion.h2>

      {/* Card Container */}
      <div className="relative perspective-1000" style={{ perspective: "1000px" }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Card */
            <motion.div
              key="closed"
              className="w-72 h-96 md:w-80 md:h-[28rem] cursor-pointer"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-full h-full card-romantic rounded-3xl overflow-hidden neon-border">
                {/* Card Cover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Decorative balloons */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <motion.span
                      className="text-3xl"
                      animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎈
                    </motion.span>
                    <motion.span
                      className="text-3xl"
                      animate={{ y: [0, -5, 0], rotate: [5, -5, 5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      🎈
                    </motion.span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.span
                      className="text-3xl"
                      animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    >
                      🎈
                    </motion.span>
                    <motion.span
                      className="text-3xl"
                      animate={{ y: [0, -5, 0], rotate: [5, -5, 5] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
                    >
                      🎈
                    </motion.span>
                  </div>

                  {/* Main content */}
                  <motion.span
                    className="text-7xl mb-4"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💝
                  </motion.span>
                  <h3 className="text-3xl font-romantic text-primary glow-text-pink mb-2">
                    Happy Birthday!
                  </h3>
                  <p className="text-soft-pink font-cute text-center">
                    Tap to open your card
                  </p>

                  {/* Sparkles */}
                  <motion.span
                    className="absolute bottom-8 left-8 text-2xl"
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                  <motion.span
                    className="absolute bottom-8 right-8 text-2xl"
                    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    ✨
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Open Card */
            <motion.div
              key="open"
              className="w-[90vw] max-w-2xl h-[70vh] max-h-[32rem]"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-full h-full card-romantic rounded-3xl overflow-hidden neon-border flex flex-col md:flex-row">
                {/* Left side - decorative */}
                <div className="hidden md:flex w-1/3 bg-gradient-to-b from-primary/20 to-accent/20 items-center justify-center border-r border-primary/20">
                  <motion.div
                    className="text-center"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="text-6xl block mb-4">🎂</span>
                    <span className="text-4xl block">💖</span>
                  </motion.div>
                </div>
                
                {/* Right side - message */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <pre className="font-cute text-soft-pink text-sm md:text-base whitespace-pre-wrap leading-relaxed">
                        {message}
                      </pre>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Next Button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <MagicButton onClick={onNext}>
              One More Surprise 🎁
            </MagicButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BirthdayCardScreen;
