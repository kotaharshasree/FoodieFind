import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Heart, Search, Refrigerator, ArrowRight } from 'lucide-react';

const EmptyState = ({ type = 'search', onAction, actionText }) => {
  const configs = {
    search: {
      icon: Search,
      emoji: '🔍',
      title: 'No Matching Recipes Found',
      subtitle: 'Your next delicious discovery is just around the corner! Try clearing filters or searching for different keywords.',
      defaultBtn: 'Clear All Filters',
    },
    favorites: {
      icon: Heart,
      emoji: '❤️',
      title: 'No Favorite Recipes Yet',
      subtitle: 'Explore recipes and tap the heart icon on any dish to save it here for quick kitchen access anytime!',
      defaultBtn: 'Discover Recipes',
    },
    kitchen: {
      icon: Refrigerator,
      emoji: '🥦',
      title: 'Your Kitchen Pantry is Empty',
      subtitle: 'Add ingredients from your kitchen cupboards above to see what amazing meals you can whip up!',
      defaultBtn: 'Add Ingredients',
    },
    general: {
      icon: Utensils,
      emoji: '🍲',
      title: 'No Recipes Available',
      subtitle: 'Be the first to add a delicious recipe or reseed the database with realistic sample dishes.',
      defaultBtn: 'Add a Recipe',
    },
  };

  const current = configs[type] || configs.general;
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-10 sm:p-14 rounded-3xl border border-[#FED7AA] text-center max-w-md mx-auto shadow-sm my-8"
    >
      <div className="w-16 h-16 rounded-2xl bg-[#FFE5D0] text-[#EA580C] flex items-center justify-center mx-auto mb-4 text-3xl">
        <span>{current.emoji}</span>
      </div>

      <h3 className="font-display font-bold text-xl text-[#292524] mb-2">
        {current.title}
      </h3>

      <p className="text-xs sm:text-sm text-[#78716C] leading-relaxed mb-6">
        {current.subtitle}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary !py-2.5 !px-6 text-xs sm:text-sm font-semibold mx-auto"
        >
          <span>{actionText || current.defaultBtn}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;
