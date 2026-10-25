import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Clock,
  ChefHat,
  Leaf,
  Drumstick,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import { categories } from '../components/CategoryFilter';

const ExplorePage = ({ recipes = [], onSelectRecipe }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [dietFilter, setDietFilter] = useState('All'); // 'All', 'Veg', 'NonVeg'
  const [maxTime, setMaxTime] = useState(searchParams.get('maxTime') || '');
  const [difficulty, setDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'quickest', 'alphabetical'

  // Sync state with URL params if loaded with ?search=... or ?category=...
  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) setSearchTerm(s);
    const c = searchParams.get('category');
    if (c !== null) setSelectedCategory(c);
    const m = searchParams.get('maxTime');
    if (m !== null) setMaxTime(m);
  }, [searchParams]);

  // Reset all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setDietFilter('All');
    setMaxTime('');
    setDifficulty('All');
    setSortBy('newest');
    setSearchParams({});
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    dietFilter !== 'All' ||
    maxTime !== '' ||
    difficulty !== 'All';

  // Client-side filtering & sorting for instant snappy interaction
  const filteredRecipes = useMemo(() => {
    let result = [...recipes];

    // Search query
    if (searchTerm.trim() !== '') {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          r.ingredients?.some((i) => i.name.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Vegetarian') {
        result = result.filter((r) => r.isVegetarian === true);
      } else if (selectedCategory === 'Non-Vegetarian') {
        result = result.filter((r) => r.isVegetarian === false);
      } else {
        result = result.filter((r) => r.category === selectedCategory);
      }
    }

    // Diet filter
    if (dietFilter === 'Veg') {
      result = result.filter((r) => r.isVegetarian === true);
    } else if (dietFilter === 'NonVeg') {
      result = result.filter((r) => r.isVegetarian === false);
    }

    // Max Cooking Time
    if (maxTime && !isNaN(Number(maxTime))) {
      result = result.filter((r) => r.cookingTime <= Number(maxTime));
    }

    // Difficulty
    if (difficulty !== 'All') {
      result = result.filter((r) => r.difficulty === difficulty);
    }

    // Sorting
    if (sortBy === 'quickest') {
      result.sort((a, b) => a.cookingTime - b.cookingTime);
    } else if (sortBy === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Newest
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [recipes, searchTerm, selectedCategory, dietFilter, maxTime, difficulty, sortBy]);

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#292524] mb-2">
            Explore All Recipes
          </h1>
          <p className="text-sm text-[#78716C]">
            Find the perfect dish by searching, filtering dietary preferences, and cooking times.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#FED7AA] shadow-sm mb-8 space-y-4">
          {/* Search Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F97316]"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by recipe name or ingredient (e.g. Biryani, Paneer, Garlic)..."
                className="w-full bg-[#FFF8F0] pl-11 pr-10 py-3 rounded-2xl border border-[#FED7AA] text-sm text-[#292524] outline-none focus:border-[#F97316]"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="btn-secondary !py-2.5 !px-4 text-xs font-semibold text-rose-600 border-rose-200 hover:bg-rose-50 flex items-center gap-1.5 shrink-0"
              >
                <RotateCcw size={14} />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          {/* Quick Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap ${
                    active
                      ? 'bg-[#EA580C] text-white border-[#EA580C]'
                      : 'bg-[#FFF8F0] text-[#292524] border-[#FED7AA] hover:bg-[#FFE5D0]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Detailed Filters Strip */}
          <div className="pt-3 border-t border-[#FED7AA]/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {/* Diet Toggle */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716C] uppercase mb-1">
                Dietary Type
              </label>
              <select
                value={dietFilter}
                onChange={(e) => setDietFilter(e.target.value)}
                className="w-full bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="All">All Diets</option>
                <option value="Veg">Vegetarian Only 🥬</option>
                <option value="NonVeg">Non-Vegetarian 🍗</option>
              </select>
            </div>

            {/* Max Cook Time */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716C] uppercase mb-1">
                Max Cook Time
              </label>
              <select
                value={maxTime}
                onChange={(e) => setMaxTime(e.target.value)}
                className="w-full bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="">Any Time</option>
                <option value="15">≤ 15 minutes</option>
                <option value="25">≤ 25 minutes</option>
                <option value="40">≤ 40 minutes</option>
                <option value="60">≤ 60 minutes</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716C] uppercase mb-1">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="All">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-[11px] font-bold text-[#78716C] uppercase mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#FFF8F0] px-3 py-2 rounded-xl border border-[#FED7AA] font-semibold text-[#292524] outline-none focus:border-[#F97316]"
              >
                <option value="newest">Newest Added</option>
                <option value="quickest">Quickest Recipes ⏱️</option>
                <option value="alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-semibold text-[#78716C]">
            Showing <span className="text-[#EA580C] font-bold">{filteredRecipes.length}</span> recipes
          </p>
        </div>

        {/* Recipe Grid or Empty State */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onClick={onSelectRecipe}
              />
            ))}
          </div>
        ) : (
          <EmptyState type="search" onAction={handleClearFilters} actionText="Clear All Filters" />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
