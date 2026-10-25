import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Trophy,
  Timer as TimerIcon,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import CookingTimer from './CookingTimer';

const CookingModeModal = ({ recipe, isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTimer, setShowTimer] = useState(false);

  const instructions = recipe?.instructions || [];
  const totalSteps = instructions.length;

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        if (currentStep < totalSteps - 1) {
          setCurrentStep((prev) => prev + 1);
        } else if (currentStep === totalSteps - 1) {
          triggerCelebration();
        }
      } else if (e.key === 'ArrowLeft') {
        if (currentStep > 0) {
          setCurrentStep((prev) => prev - 1);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep, totalSteps, onClose]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      triggerCelebration();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen || !recipe) return null;

  const isLastStep = currentStep === totalSteps - 1;
  const progressPercent = Math.round(((currentStep + 1) / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 bg-[#292524] text-white flex flex-col justify-between overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-6 border-b border-stone-800 flex items-center justify-between bg-stone-900/60 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EA580C] text-white flex items-center justify-center font-bold">
            <Flame size={22} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-orange-400 font-bold">
              Cooking Focus Mode
            </span>
            <h2 className="font-display font-bold text-lg sm:text-xl text-white truncate max-w-xs sm:max-w-md">
              {recipe.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowTimer(!showTimer)}
            className={`p-2.5 rounded-full border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              showTimer
                ? 'bg-[#EA580C] text-white border-[#EA580C]'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <TimerIcon size={16} />
            <span className="hidden sm:inline">Timer</span>
          </button>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Exit cooking mode"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-800 h-2">
        <motion.div
          className="bg-gradient-to-r from-[#F97316] to-[#EA580C] h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Focus Stage */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 max-w-4xl mx-auto w-full relative">
        {/* Step Indicator */}
        <div className="mb-6 flex items-center gap-2">
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/40 text-xs sm:text-sm font-bold px-3 py-1 rounded-full">
            Step {currentStep + 1} of {totalSteps}
          </span>
          <span className="text-xs text-stone-400 font-medium">({progressPercent}% Complete)</span>
        </div>

        {/* Large Instruction Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <p className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 leading-snug sm:leading-relaxed">
              "{instructions[currentStep]}"
            </p>
          </motion.div>
        </AnimatePresence>

        {isLastStep && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 flex items-center gap-2 text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-4 py-2 rounded-xl text-sm font-semibold"
          >
            <Trophy size={18} />
            <span>Final Step! Your delicious dish is ready to serve!</span>
          </motion.div>
        )}

        {/* Slide-out floating timer drawer */}
        <AnimatePresence>
          {showTimer && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-6 right-6 z-30 max-w-xs w-full shadow-2xl"
            >
              <div className="relative">
                <CookingTimer
                  initialMinutes={recipe.cookingTime > 15 ? 10 : recipe.cookingTime}
                  onComplete={() => triggerCelebration()}
                />
                <button
                  onClick={() => setShowTimer(false)}
                  className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="p-4 sm:p-6 border-t border-stone-800 bg-stone-900/60 backdrop-blur-md flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm sm:text-base transition-all ${
            currentStep === 0
              ? 'opacity-30 cursor-not-allowed text-stone-500'
              : 'bg-stone-800 hover:bg-stone-700 text-white'
          }`}
        >
          <ChevronLeft size={20} />
          <span>Previous Step</span>
        </button>

        <span className="text-xs text-stone-400 hidden sm:block">
          Use <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700">←</kbd> and{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-stone-800 border border-stone-700">→</kbd> arrow keys to navigate
        </span>

        <button
          onClick={handleNext}
          className={`flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm sm:text-base shadow-lg transition-all ${
            isLastStep
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40'
              : 'bg-[#EA580C] hover:bg-[#F97316] text-white shadow-orange-950/40'
          }`}
        >
          <span>{isLastStep ? 'Finish & Celebrate! 🎉' : 'Next Step'}</span>
          {!isLastStep && <ChevronRight size={20} />}
        </button>
      </div>
    </div>
  );
};

export default CookingModeModal;
