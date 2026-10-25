import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, ArrowRight, Utensils } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import KitchenMatcher from '../components/KitchenMatcher';
import RecipeOfTheDay from '../components/RecipeOfTheDay';

const HomePage = ({ recipes = [], onSelectRecipe }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Filter recipes for "Recipes You'll Love"
  const featuredRecipes = recipes.filter((r) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Vegetarian') return r.isVegetarian === true;
    if (selectedCategory === 'Non-Vegetarian') return r.isVegetarian === false;
    return r.category === selectedCategory;
  });

  // Filter Quick & Easy recipes (< 20 mins)
  const quickAndEasy = recipes.filter((r) => r.cookingTime <= 20);

  const handleQuickSearch = (term) => {
    navigate(`/explore?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className="space-y-6">
      {/* 1. Hero Section */}
      <HeroSection onQuickSearch={handleQuickSearch} />

      {/* 2. Recipe of the Day Spotlight */}
      <RecipeOfTheDay recipes={recipes} onSelectRecipe={onSelectRecipe} />

      {/* 3. Quick Category Navigation */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. Featured Section: "Recipes You'll Love" */}
      <section className="py-8">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-1">
                <Sparkles size={14} />
                <span>Handpicked Collections</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#292524]">
                Recipes You'll Love
              </h2>
            </div>

            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors"
            >
              <span>View All Recipes ({recipes.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredRecipes.slice(0, 8).map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onClick={onSelectRecipe}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. "What's in Your Kitchen?" Interactive Section */}
      <KitchenMatcher
        allRecipes={recipes}
        onSelectRecipe={onSelectRecipe}
      />

      {/* 6. Quick & Easy Recipes (<20 mins) Section */}
      {quickAndEasy.length > 0 && (
        <section className="py-10 bg-white border-y border-[#FED7AA]/60">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  <Clock size={14} />
                  <span>Hungry Now?</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#292524]">
                  Quick & Easy Recipes
                </h2>
                <p className="text-sm text-[#78716C] mt-1">
                  Ready in 20 minutes or less with effortless preparation
                </p>
              </div>

              <Link
                to="/explore?maxTime=20"
                className="btn-secondary !py-2 !px-4 text-xs font-semibold"
              >
                <span>See All Under 20m</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickAndEasy.slice(0, 4).map((recipe) => (
                <RecipeCard
                  key={recipe._id}
                  recipe={recipe}
                  onClick={onSelectRecipe}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
