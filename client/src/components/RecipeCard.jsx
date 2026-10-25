import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ChefHat, Heart, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const RecipeCard = ({ recipe, matchData, onClick }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(recipe._id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(recipe)}
      className="food-card cursor-pointer group h-full flex flex-col justify-between"
    >
      {/* Image & Badges Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        <img
          src={recipe.image || fallbackImage}
          alt={recipe.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          {/* Veg / Non-Veg Indicator */}
          <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm flex items-center gap-1.5">
            <div className={`diet-indicator ${recipe.isVegetarian ? 'veg' : 'non-veg'}`}>
              <div className="diet-indicator-dot" />
            </div>
            <span className="text-[11px] font-bold text-[#292524]">
              {recipe.isVegetarian ? 'Veg' : 'Non-Veg'}
            </span>
          </div>

          {/* Favorite Heart Button */}
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={handleFavoriteClick}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md ${
              favorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 backdrop-blur-md text-[#78716C] hover:text-rose-500 hover:bg-white'
            }`}
            aria-label="Add to favorites"
          >
            <motion.div
              animate={favorited ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart size={18} className={favorited ? 'fill-current stroke-current' : ''} />
            </motion.div>
          </motion.button>
        </div>

        {/* Dynamic Match Percentage (when displayed from Kitchen Matcher) */}
        {matchData && (
          <div className="absolute bottom-3 left-3 z-10">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold shadow-md ${
                matchData.matchPercentage === 100
                  ? 'bg-emerald-600 text-white'
                  : matchData.matchPercentage >= 60
                  ? 'bg-lime-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              <Sparkles size={13} />
              <span>{matchData.matchPercentage}% Match</span>
            </div>
          </div>
        )}

        {/* Category Pill */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {recipe.category}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="font-display font-bold text-lg text-[#292524] group-hover:text-[#EA580C] transition-colors line-clamp-1 mb-1.5">
            {recipe.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#78716C] line-clamp-2 leading-relaxed mb-4">
            {recipe.description}
          </p>
        </div>

        {/* Ingredient Match Information (If provided) */}
        {matchData && (
          <div className="bg-[#FFF8F0] p-2.5 rounded-xl border border-[#FED7AA] mb-4 space-y-1.5 text-xs">
            <div className="flex items-center justify-between text-stone-600">
              <span className="flex items-center gap-1 font-semibold text-[#65A30D]">
                <CheckCircle2 size={13} /> {matchData.availableCount} available
              </span>
              <span className="flex items-center gap-1 font-semibold text-[#EA580C]">
                <AlertCircle size={13} /> {matchData.missingIngredients.length} missing
              </span>
            </div>
            {matchData.missingIngredients.length > 0 && (
              <p className="text-[11px] text-[#78716C] line-clamp-1">
                <span className="font-semibold text-stone-700">Need: </span>
                {matchData.missingIngredients.slice(0, 3).join(', ')}
                {matchData.missingIngredients.length > 3 && '...'}
              </p>
            )}
          </div>
        )}

        {/* Metadata Footer: Cooking Time, Difficulty */}
        <div className="pt-3 border-t border-[#FED7AA]/40 flex items-center justify-between text-xs text-[#78716C] font-medium">
          <div className="flex items-center gap-1.5">
            <Clock size={14} className="text-[#F97316]" />
            <span>{recipe.cookingTime} mins</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ChefHat size={14} className="text-[#F97316]" />
            <span
              className={`font-semibold ${
                recipe.difficulty === 'Easy'
                  ? 'text-emerald-600'
                  : recipe.difficulty === 'Medium'
                  ? 'text-amber-600'
                  : 'text-rose-600'
              }`}
            >
              {recipe.difficulty}
            </span>
          </div>

          <span className="text-[11px] bg-[#FFE5D0]/60 text-[#EA580C] px-2 py-0.5 rounded-md font-semibold">
            {recipe.ingredients?.length || 0} items
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
