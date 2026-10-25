import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Clock,
  ChefHat,
  Users,
  Heart,
  Play,
  Edit3,
  Trash2,
  CheckCircle,
  Sparkles,
  Flame,
} from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { scaleQuantity } from '../utils/servingScaler';
import CookingModeModal from './CookingModeModal';

const RecipeDetailModal = ({ recipe, isOpen, onClose, onEdit, onDelete }) => {
  const [servings, setServings] = useState(recipe?.servings || 2);
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = recipe ? isFavorite(recipe._id) : false;

  // Reset state when recipe changes
  React.useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 2);
      setCheckedIngredients({});
      setShowDeleteConfirm(false);
    }
  }, [recipe]);

  if (!isOpen || !recipe) return null;

  const toggleIngredientCheck = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleServingChange = (delta) => {
    setServings((prev) => Math.max(1, prev + delta));
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

  return (
    <>
      <div className="modal-overlay">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-[#FED7AA]"
        >
          {/* Header Image with Badges */}
          <div className="relative h-64 sm:h-80 w-full overflow-hidden shrink-0 bg-stone-100">
            <img
              src={recipe.image || fallbackImage}
              alt={recipe.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = fallbackImage;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Favorite & Action Bar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#292524] flex items-center gap-1.5 shadow-md">
                <div className={`diet-indicator ${recipe.isVegetarian ? 'veg' : 'non-veg'}`}>
                  <div className="diet-indicator-dot" />
                </div>
                <span>{recipe.isVegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</span>
              </span>

              <span className="bg-[#EA580C] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {recipe.category}
              </span>
            </div>

            {/* Bottom Title & Quick Details */}
            <div className="absolute bottom-4 left-6 right-6 text-white z-20">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs uppercase tracking-wider text-orange-200 font-bold">
                  {recipe.difficulty} Level
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {recipe.name}
              </h1>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Description & Action Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#FED7AA]/50">
              <p className="text-sm sm:text-base text-[#78716C] leading-relaxed max-w-2xl font-normal">
                {recipe.description}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(recipe)}
                  className={`btn-secondary !py-2 !px-3.5 text-xs font-semibold ${
                    favorited ? '!text-rose-500 !border-rose-200 !bg-rose-50' : ''
                  }`}
                >
                  <Heart size={16} className={favorited ? 'fill-current text-rose-500' : ''} />
                  <span>{favorited ? 'Favorited' : 'Favorite'}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => onEdit(recipe)}
                  className="btn-secondary !py-2 !px-3 text-xs font-semibold"
                  title="Edit this recipe"
                >
                  <Edit3 size={15} />
                  <span className="hidden sm:inline">Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="btn-ghost !text-red-500 hover:!bg-red-50 !py-2 !px-2.5 text-xs font-semibold"
                  title="Delete recipe"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Metadata Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FFF8F0] p-4 rounded-2xl border border-[#FED7AA]">
              <div className="text-center p-2 border-r border-[#FED7AA]/60 last:border-none">
                <Clock size={18} className="mx-auto text-[#EA580C] mb-1" />
                <p className="text-[11px] text-[#78716C] font-medium uppercase">Cooking Time</p>
                <p className="text-base font-bold text-[#292524]">{recipe.cookingTime} mins</p>
              </div>
              <div className="text-center p-2 sm:border-r border-[#FED7AA]/60 last:border-none">
                <ChefHat size={18} className="mx-auto text-[#EA580C] mb-1" />
                <p className="text-[11px] text-[#78716C] font-medium uppercase">Prep Time</p>
                <p className="text-base font-bold text-[#292524]">{recipe.preparationTime || 10} mins</p>
              </div>
              <div className="text-center p-2 border-r border-[#FED7AA]/60 last:border-none">
                <Flame size={18} className="mx-auto text-[#EA580C] mb-1" />
                <p className="text-[11px] text-[#78716C] font-medium uppercase">Difficulty</p>
                <p className="text-base font-bold text-[#292524]">{recipe.difficulty}</p>
              </div>
              <div className="text-center p-2">
                <Users size={18} className="mx-auto text-[#EA580C] mb-1" />
                <p className="text-[11px] text-[#78716C] font-medium uppercase">Servings</p>
                <p className="text-base font-bold text-[#292524]">{servings} People</p>
              </div>
            </div>

            {/* Servings Adjuster */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#FED7AA] shadow-sm">
              <div>
                <h4 className="font-bold text-sm text-[#292524]">Adjust Serving Size</h4>
                <p className="text-xs text-[#78716C]">
                  Quantities will dynamically scale to match your portion count.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleServingChange(-1)}
                  disabled={servings <= 1}
                  className="w-9 h-9 rounded-full bg-[#FFE5D0] text-[#EA580C] font-bold text-lg flex items-center justify-center hover:bg-orange-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  -
                </button>
                <span className="font-extrabold text-lg text-[#292524] min-w-[24px] text-center">
                  {servings}
                </span>
                <button
                  onClick={() => handleServingChange(1)}
                  className="w-9 h-9 rounded-full bg-[#FFE5D0] text-[#EA580C] font-bold text-lg flex items-center justify-center hover:bg-orange-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Ingredients Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-xl font-bold text-[#292524] flex items-center gap-2">
                  <span>Ingredients</span>
                  <span className="text-xs font-semibold bg-[#FFE5D0] text-[#EA580C] px-2.5 py-0.5 rounded-full font-sans">
                    {recipe.ingredients?.length || 0} items
                  </span>
                </h3>
                <span className="text-xs text-[#78716C] font-medium hidden sm:inline">
                  Click to check off prepped items
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recipe.ingredients?.map((ing, idx) => {
                  const isChecked = checkedIngredients[idx];
                  const scaledQty = scaleQuantity(ing.quantity, recipe.servings || 2, servings);

                  return (
                    <motion.div
                      key={idx}
                      onClick={() => toggleIngredientCheck(idx)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-200 text-stone-400 line-through'
                          : 'bg-[#FFF8F0]/40 border-[#FED7AA]/60 text-[#292524] hover:bg-[#FFE5D0]/30 hover:border-[#F97316]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <CheckCircle size={14} />}
                        </div>
                        <span className="text-sm font-semibold">{ing.name}</span>
                      </div>

                      {(scaledQty || ing.unit) && (
                        <span className="text-xs font-bold text-[#EA580C] bg-[#FFE5D0]/70 px-2.5 py-1 rounded-lg">
                          {scaledQty} {ing.unit}
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Cooking Instructions Section */}
            <div>
              <h3 className="font-display text-xl font-bold text-[#292524] mb-4">
                Step-by-Step Cooking Instructions
              </h3>

              <div className="space-y-4">
                {recipe.instructions?.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-2xl bg-[#FFF8F0]/50 border border-[#FED7AA]/60 hover:border-[#F97316] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#EA580C] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm shadow-orange-500/20">
                      {idx + 1}
                    </div>
                    <p className="text-sm sm:text-base text-[#292524] leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar with "Start Cooking" */}
          <div className="p-4 sm:p-5 border-t border-[#FED7AA] bg-[#FFF8F0] flex items-center justify-between gap-4">
            <button onClick={onClose} className="btn-secondary !py-2.5 !px-5 text-sm font-semibold">
              Close
            </button>

            <button
              onClick={() => setIsCookingModeOpen(true)}
              className="btn-primary !py-2.5 !px-7 text-sm font-bold shadow-lg shadow-orange-500/25 flex items-center gap-2"
            >
              <Play size={18} className="fill-current" />
              <span>Start Cooking (Step-by-Step)</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="modal-overlay z-[1000]">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-2xl max-w-sm w-full border border-red-200 shadow-2xl text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Trash2 size={24} />
              </div>
              <h3 className="font-display font-bold text-lg text-stone-900 mb-2">
                Delete "{recipe.name}"?
              </h3>
              <p className="text-xs text-stone-600 mb-6">
                Are you sure you want to permanently remove this recipe? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-secondary !py-2 !px-4 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    onDelete(recipe._id);
                  }}
                  className="btn-primary !bg-red-600 hover:!bg-red-700 !py-2 !px-4 text-xs font-semibold"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Focused Cooking Mode Modal */}
      <CookingModeModal
        recipe={recipe}
        isOpen={isCookingModeOpen}
        onClose={() => setIsCookingModeOpen(false)}
      />
    </>
  );
};

export default RecipeDetailModal;
