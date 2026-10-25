import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dices, Sparkles, X, ArrowRight, Clock, ChefHat } from 'lucide-react';
import confetti from 'canvas-confetti';

const SurpriseMeModal = ({ isOpen, onClose, recipes = [], onSelectRecipe }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRoll = () => {
    if (!recipes || recipes.length === 0) return;
    setIsRolling(true);
    setSelectedRecipe(null);

    // Roll animation timing
    let counter = 0;
    const interval = setInterval(() => {
      const tempPick = recipes[Math.floor(Math.random() * recipes.length)];
      setSelectedRecipe(tempPick);
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        const finalPick = recipes[Math.floor(Math.random() * recipes.length)];
        setSelectedRecipe(finalPick);
        setIsRolling(false);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      }
    }, 100);
  };

  React.useEffect(() => {
    if (isOpen) {
      handleRoll();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border-2 border-[#FED7AA] p-6 text-center relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full"
        >
          <X size={18} />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-orange-500/25">
          <motion.div
            animate={isRolling ? { rotate: [0, 90, 180, 270, 360], scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: isRolling ? Infinity : 0, duration: 0.4 }}
          >
            <Dices size={32} />
          </motion.div>
        </div>

        <h3 className="font-display text-2xl font-bold text-[#292524] mb-1">
          Surprise Me! 🎲
        </h3>
        <p className="text-xs text-[#78716C] mb-6">
          Can't decide what to eat? Let the food fate choose for you!
        </p>

        {selectedRecipe && (
          <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#FED7AA] mb-6 text-left">
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-3 bg-stone-100">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFE5D0] px-2 py-0.5 rounded-full">
                {selectedRecipe.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#78716C]">
                <Clock size={12} />
                <span>{selectedRecipe.cookingTime} mins</span>
              </div>
            </div>
            <h4 className="font-display font-bold text-lg text-[#292524] mb-1">
              {selectedRecipe.name}
            </h4>
            <p className="text-xs text-[#78716C] line-clamp-2">
              {selectedRecipe.description}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={handleRoll}
            disabled={isRolling}
            className="btn-secondary !py-2.5 !px-5 text-xs font-semibold"
          >
            <Dices size={16} />
            <span>Roll Again</span>
          </button>

          {selectedRecipe && (
            <button
              onClick={() => {
                onClose();
                onSelectRecipe(selectedRecipe);
              }}
              className="btn-primary !py-2.5 !px-6 text-xs font-bold"
            >
              <span>View Recipe</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SurpriseMeModal;
