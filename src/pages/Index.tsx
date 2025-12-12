import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CountdownScreen from "@/components/screens/CountdownScreen";
import IntroScreen from "@/components/screens/IntroScreen";
import CakeScreen from "@/components/screens/CakeScreen";
import BalloonScreen from "@/components/screens/BalloonScreen";
import WordAnimationScreen from "@/components/screens/WordAnimationScreen";
import MemoryCardsScreen from "@/components/screens/MemoryCardsScreen";
import BirthdayCardScreen from "@/components/screens/BirthdayCardScreen";
import FinalGiftScreen from "@/components/screens/FinalGiftScreen";

type Screen = 
  | "countdown"
  | "intro"
  | "cake"
  | "balloons"
  | "words"
  | "memories"
  | "card"
  | "gift";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("countdown");

  const goToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const replay = () => {
    setCurrentScreen("countdown");
  };

  return (
    <div className="min-h-screen overflow-hidden gradient-romantic">
      <AnimatePresence mode="wait">
        {currentScreen === "countdown" && (
          <CountdownScreen 
            key="countdown" 
            onComplete={() => goToScreen("intro")} 
          />
        )}
        {currentScreen === "intro" && (
          <IntroScreen 
            key="intro" 
            onNext={() => goToScreen("cake")} 
          />
        )}
        {currentScreen === "cake" && (
          <CakeScreen 
            key="cake" 
            onNext={() => goToScreen("balloons")} 
          />
        )}
        {currentScreen === "balloons" && (
          <BalloonScreen 
            key="balloons" 
            onNext={() => goToScreen("words")} 
          />
        )}
        {currentScreen === "words" && (
          <WordAnimationScreen 
            key="words" 
            onNext={() => goToScreen("memories")} 
          />
        )}
        {currentScreen === "memories" && (
          <MemoryCardsScreen 
            key="memories" 
            onNext={() => goToScreen("card")} 
          />
        )}
        {currentScreen === "card" && (
          <BirthdayCardScreen 
            key="card" 
            onNext={() => goToScreen("gift")} 
          />
        )}
        {currentScreen === "gift" && (
          <FinalGiftScreen 
            key="gift" 
            onReplay={replay} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
