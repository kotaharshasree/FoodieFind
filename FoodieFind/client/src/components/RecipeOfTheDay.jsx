import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Flame, ArrowRight, Heart } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

const RecipeOfTheDay = ({ recipes = [], onSelectRecipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!recipes || recipes.length === 0) return null;

  // Deterministic daily pick based on day of year
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now - startOfYear;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const dailyRecipe = recipes[dayOfYear % recipes.length];

  if (!dailyRecipe) return null;

  const favorited = isFavorite(dailyRecipe._id);

  return (
    <section className="py-6">
      <div className="container-custom">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-xl shadow-stone-900/10 border border-stone-700/50">
          {/* Subtle background ambient graphic */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-[#EA580C]/20 to-transparent pointer-events-none -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-10 items-center relative z-10">
            {/* Left Info Column */}
            <div className="md:col-span-7 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA580C]/20 text-orange-400 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                <Calendar size={14} />
                <span>Recipe of the Day</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {dailyRecipe.name}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 line-clamp-3 leading-relaxed max-w-xl">
                {dailyRecipe.description}
              </p>

              {/* Tag Strip */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-stone-300">
                <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700">
                  <Clock size={14} className="text-[#F97316]" />
                  <span>{dailyRecipe.cookingTime} mins</span>
                </span>
                <span className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700">
                  <Flame size={14} className="text-[#F97316]" />
                  <span>{dailyRecipe.difficulty}</span>
                </span>
                <span className="bg-[#FFE5D0] text-[#EA580C] px-3 py-1.5 rounded-full font-bold">
                  {dailyRecipe.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => onSelectRecipe(dailyRecipe)}
                  className="btn-primary !py-3 !px-6 text-sm font-bold shadow-lg shadow-orange-500/30"
                >
                  <span>Cook This Today</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => toggleFavorite(dailyRecipe)}
                  className={`p-3 rounded-full border transition-colors ${
                    favorited
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-rose-400'
                  }`}
                  aria-label="Favorite daily recipe"
                >
                  <Heart size={18} className={favorited ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="md:col-span-5">
              <div
                onClick={() => onSelectRecipe(dailyRecipe)}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-stone-700 cursor-pointer group relative"
              >
                <img
                  src={dailyRecipe.image}
                  alt={dailyRecipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeOfTheDay;
