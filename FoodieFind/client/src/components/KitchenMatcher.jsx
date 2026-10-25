import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Refrigerator,
  Plus,
  X,
  Search,
  Sparkles,
  SlidersHorizontal,
  Flame,
  ArrowUpDown,
  CheckCircle2,
} from 'lucide-react';
import { popularKitchenIngredients } from '../data/sampleIngredients';
import { calculateRecipeMatch, sortMatchedRecipes } from '../utils/ingredientMatcher';
import RecipeCard from './RecipeCard';

const KitchenMatcher = ({ allRecipes = [], onSelectRecipe, initialIngredient = '' }) => {
  const [selectedIngredients, setSelectedIngredients] = useState(() => {
    return initialIngredient ? [initialIngredient] : ['Tomato', 'Potato', 'Onion'];
  });
  const [inputVal, setInputVal] = useState('');
  const [sortBy, setSortBy] = useState('best_match'); // 'best_match', 'quickest', 'alphabetical'
  const [hasSearched, setHasSearched] = useState(true);

  // Add ingredient to chips
  const addIngredient = (name) => {
    if (!name || !name.trim()) return;
    const clean = name.trim();
    if (!selectedIngredients.some((i) => i.toLowerCase() === clean.toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, clean]);
      setHasSearched(true);
    }
    setInputVal('');
  };

  const removeIngredient = (name) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== name));
  };

  const clearAllIngredients = () => {
    setSelectedIngredients([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient(inputVal);
    }
  };

  // Run dynamic matching algorithm over all recipes
  const matchedResults = useMemo(() => {
    if (selectedIngredients.length === 0) return [];

    const evaluated = allRecipes.map((recipe) =>
      calculateRecipeMatch(recipe, selectedIngredients)
    );

    // Filter to recipes that have at least 1 matching ingredient
    const relevant = evaluated.filter((item) => item.availableCount > 0);

    return sortMatchedRecipes(relevant, sortBy);
  }, [allRecipes, selectedIngredients, sortBy]);

  return (
    <section id="kitchen-matcher" className="py-12 bg-gradient-to-b from-transparent via-[#FFE5D0]/30 to-transparent">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFE5D0] text-[#EA580C] text-xs font-bold mb-3">
            <Refrigerator size={15} />
            <span>Smart Kitchen Engine</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#292524] mb-3">
            What's in Your Kitchen?
          </h2>
          <p className="text-sm sm:text-base text-[#78716C]">
            Select or type ingredients you have right now. Our smart matching algorithm will uncover the delicious meals you can prepare immediately!
          </p>
        </div>

        {/* Input & Selected Chips Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-[#FED7AA] shadow-xl shadow-orange-950/5 max-w-3xl mx-auto mb-10">
          {/* Ingredient Type Input */}
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type any ingredient (e.g., Paneer, Garlic, Milk, Rice)..."
                className="w-full bg-[#FFF8F0] px-4 py-3 rounded-2xl border border-[#FED7AA] text-sm sm:text-base font-medium text-[#292524] placeholder:text-[#A8A29E] outline-none focus:border-[#F97316] transition-colors"
              />
            </div>
            <button
              onClick={() => addIngredient(inputVal)}
              disabled={!inputVal.trim()}
              className="btn-primary !py-3 !px-5 text-sm font-semibold rounded-2xl shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus size={18} />
              <span>Add</span>
            </button>
          </div>

          {/* Popular Clickable Staples */}
          <div className="mb-5">
            <p className="text-xs font-bold text-[#78716C] mb-2 uppercase tracking-wider">
              Quick tap kitchen staples:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularKitchenIngredients.slice(0, 12).map((item) => {
                const isSelected = selectedIngredients.some(
                  (i) => i.toLowerCase() === item.name.toLowerCase()
                );
                return (
                  <button
                    key={item.name}
                    onClick={() =>
                      isSelected ? removeIngredient(item.name) : addIngredient(item.name)
                    }
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-sm'
                        : 'bg-[#FFF8F0] text-[#292524] border-[#FED7AA] hover:bg-[#FFE5D0]'
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                    {isSelected ? <X size={12} /> : <Plus size={12} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Ingredients Chips Area */}
          <div className="pt-4 border-t border-[#FED7AA]/60">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#292524]">
                Your Pantry ({selectedIngredients.length} selected):
              </span>
              {selectedIngredients.length > 0 && (
                <button
                  onClick={clearAllIngredients}
                  className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {selectedIngredients.length === 0 ? (
              <p className="text-xs italic text-[#78716C]">
                No ingredients added yet. Pick from above or type ingredients to see matching dishes!
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                <AnimatePresence>
                  {selectedIngredients.map((ing) => (
                    <motion.span
                      key={ing}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="ingredient-chip bg-[#FFE5D0] text-[#292524] font-semibold text-xs sm:text-sm pl-3 pr-2 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm"
                    >
                      <span>{ing}</span>
                      <button
                        onClick={() => removeIngredient(ing)}
                        className="w-4 h-4 rounded-full bg-white/70 hover:bg-rose-500 hover:text-white flex items-center justify-center text-[#78716C] transition-colors"
                      >
                        <X size={10} />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* "Find My Recipes" Big Action Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setHasSearched(true)}
              className="btn-primary w-full sm:w-auto !py-3.5 !px-8 text-base font-bold shadow-lg shadow-orange-500/30"
            >
              <Sparkles size={18} />
              <span>Find My Recipes ({matchedResults.length} Found)</span>
            </button>
          </div>
        </div>

        {/* Matched Results Header & Sorters */}
        {selectedIngredients.length > 0 && (
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#292524] flex items-center gap-2">
                <span>Matching Recipes</span>
                <span className="text-xs font-bold bg-[#65A30D] text-white px-2.5 py-0.5 rounded-full font-sans">
                  {matchedResults.length} Ready to Cook
                </span>
              </h3>
              <p className="text-xs text-[#78716C] mt-0.5">
                Sorted dynamically based on your kitchen inventory
              </p>
            </div>

            {/* Sorter Dropdown / Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#78716C] flex items-center gap-1">
                <ArrowUpDown size={14} /> Sort By:
              </span>
              <div className="inline-flex rounded-xl bg-white border border-[#FED7AA] p-1 shadow-sm text-xs font-semibold">
                <button
                  onClick={() => setSortBy('best_match')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    sortBy === 'best_match'
                      ? 'bg-[#EA580C] text-white'
                      : 'text-[#78716C] hover:text-[#292524]'
                  }`}
                >
                  Best Match
                </button>
                <button
                  onClick={() => setSortBy('quickest')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    sortBy === 'quickest'
                      ? 'bg-[#EA580C] text-white'
                      : 'text-[#78716C] hover:text-[#292524]'
                  }`}
                >
                  Quickest
                </button>
                <button
                  onClick={() => setSortBy('alphabetical')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    sortBy === 'alphabetical'
                      ? 'bg-[#EA580C] text-white'
                      : 'text-[#78716C] hover:text-[#292524]'
                  }`}
                >
                  A-Z
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {selectedIngredients.length > 0 && matchedResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {matchedResults.map(({ recipe, ...matchInfo }) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                matchData={matchInfo}
                onClick={onSelectRecipe}
              />
            ))}
          </div>
        ) : selectedIngredients.length > 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#FED7AA] text-center max-w-lg mx-auto shadow-sm">
            <span className="text-4xl mb-3 block">🥦</span>
            <h4 className="font-display font-bold text-lg text-[#292524] mb-1">
              No Direct Matches Found
            </h4>
            <p className="text-xs text-[#78716C] leading-relaxed mb-4">
              We couldn't find a recipe that uses this specific combination. Try adding versatile items like <strong>Onion</strong>, <strong>Tomato</strong>, <strong>Garlic</strong>, or <strong>Rice</strong>!
            </p>
            <button
              onClick={() => setSelectedIngredients(['Tomato', 'Potato', 'Onion'])}
              className="btn-secondary text-xs !py-2 !px-4"
            >
              Reset to Popular Staples
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default KitchenMatcher;
