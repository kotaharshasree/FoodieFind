import React from 'react';
import { motion } from 'framer-motion';
import {
  Coffee,
  Sun,
  Moon,
  Cookie,
  Cake,
  Leaf,
  Drumstick,
  Sparkles,
} from 'lucide-react';

export const categories = [
  { id: 'All', name: 'All Recipes', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
  { id: 'Breakfast', name: 'Breakfast', icon: Coffee, color: 'from-orange-400 to-amber-500' },
  { id: 'Lunch', name: 'Lunch', icon: Sun, color: 'from-amber-500 to-yellow-600' },
  { id: 'Dinner', name: 'Dinner', icon: Moon, color: 'from-orange-600 to-rose-600' },
  { id: 'Snacks', name: 'Snacks', icon: Cookie, color: 'from-yellow-500 to-orange-500' },
  { id: 'Desserts', name: 'Desserts', icon: Cake, color: 'from-pink-500 to-rose-500' },
  { id: 'Vegetarian', name: 'Vegetarian', icon: Leaf, color: 'from-lime-600 to-emerald-600' },
  { id: 'Non-Vegetarian', name: 'Non-Vegetarian', icon: Drumstick, color: 'from-red-500 to-orange-600' },
];

const CategoryFilter = ({ selectedCategory = 'All', onSelectCategory }) => {
  return (
    <section className="py-6">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#292524]">
              Explore Categories
            </h2>
            <p className="text-sm text-[#78716C]">
              Browse delicious curated dishes for every mood and moment
            </p>
          </div>
        </div>

        {/* Scrollable / Flexible category pill cards */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl font-semibold text-xs sm:text-sm whitespace-nowrap transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#EA580C] text-white border-[#EA580C] shadow-md shadow-orange-500/25'
                    : 'bg-white text-[#292524] border-[#FED7AA] hover:border-[#F97316] hover:bg-[#FFE5D0]/30'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[#FFE5D0] text-[#EA580C]'
                  }`}
                >
                  <Icon size={16} />
                </div>
                <span>{cat.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
