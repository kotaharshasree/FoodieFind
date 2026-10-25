import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, X, Compass, Trash2 } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';

const FavoritesPage = ({ recipes = [], onSelectRecipe }) => {
  const { favoriteIds } = useFavorites();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter full recipe objects based on favorite IDs
  const favoriteRecipes = useMemo(() => {
    return recipes.filter((r) => favoriteIds.includes(String(r._id)));
  }, [recipes, favoriteIds]);

  // Search within favorites
  const displayedFavorites = useMemo(() => {
    if (!searchTerm.trim()) return favoriteRecipes;
    const q = searchTerm.toLowerCase().trim();
    return favoriteRecipes.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients?.some((i) => i.name.toLowerCase().includes(q))
    );
  }, [favoriteRecipes, searchTerm]);

  return (
    <div className="py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-500 mb-1">
              <Heart size={14} className="fill-current" />
              <span>Your Personal Cookbook</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#292524]">
              Saved Favorite Recipes
            </h1>
            <p className="text-sm text-[#78716C] mt-1">
              Your handpicked dishes stored safely in your browser for instant kitchen reference.
            </p>
          </div>

          <span className="text-sm font-semibold bg-[#FFE5D0] text-[#EA580C] px-3.5 py-1.5 rounded-full w-fit">
            {favoriteRecipes.length} Saved Dishes
          </span>
        </div>

        {/* Search within Favorites (if any favorites exist) */}
        {favoriteRecipes.length > 0 && (
          <div className="mb-6 relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F97316]"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search in your favorites..."
              className="w-full bg-white pl-11 pr-10 py-2.5 rounded-2xl border border-[#FED7AA] text-sm text-[#292524] outline-none focus:border-[#F97316] shadow-sm"
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
        )}

        {/* Grid or Empty State */}
        {favoriteRecipes.length === 0 ? (
          <EmptyState
            type="favorites"
            onAction={() => navigate('/explore')}
            actionText="Discover Delicious Recipes"
          />
        ) : displayedFavorites.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl border border-[#FED7AA] text-center max-w-md mx-auto my-8">
            <span className="text-3xl mb-2 block">🔍</span>
            <h3 className="font-display font-bold text-lg text-[#292524] mb-1">
              No matching favorites found
            </h3>
            <p className="text-xs text-[#78716C] mb-4">
              Try searching with another recipe name or keyword.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="btn-secondary !py-2 !px-4 text-xs font-semibold"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedFavorites.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                onClick={onSelectRecipe}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
