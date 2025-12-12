import { motion } from "framer-motion";
import FloatingHearts from "../FloatingHearts";
import Sparkles from "../Sparkles";
import MagicButton from "../MagicButton";

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  // Kawaii Panda Character
  const PandaCharacter = () => (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div>
        <img src="/public/cute.gif"/>
      </div>
      
      {/* Sparkles around panda */}
      <motion.div
        className="absolute -top-2 -right-2 text-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-1/2 -left-4 text-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
      >
        💖
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      className="fixed inset-0 gradient-romantic flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingHearts count={15} />
      <Sparkles count={20} />

      <PandaCharacter />

      {/* Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-romantic text-center mt-8 mb-4 glow-text-pink"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="bg-gradient-to-r from-primary via-soft-pink to-accent bg-clip-text text-transparent">
          Hey Sweetheart! 💝
        </span>
      </motion.h1>

      {/* Subtitle with typing effect simulation */}
      <motion.p
        className="text-lg md:text-xl text-soft-pink text-center max-w-md mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        I have a little surprise waiting just for you...
      </motion.p>

      <MagicButton onClick={onNext} delay={1.2}>
        Start the Surprise ✨
      </MagicButton>
    </motion.div>
  );
};

export default IntroScreen;
