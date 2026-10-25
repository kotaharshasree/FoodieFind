import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'foodiefind_favorites';

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load favorites from localStorage', e);
      return [];
    }
  });

  // Listen to changes across components or tabs
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        setFavoriteIds(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error('Failed to read storage', e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('foodiefind_favs_updated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('foodiefind_favs_updated', handleStorageChange);
    };
  }, []);

  const saveFavorites = (newIds) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newIds));
      setFavoriteIds(newIds);
      window.dispatchEvent(new Event('foodiefind_favs_updated'));
    } catch (e) {
      console.error('Failed to save favorites to localStorage', e);
    }
  };

  const isFavorite = useCallback(
    (recipeId) => {
      if (!recipeId) return false;
      return favoriteIds.includes(String(recipeId));
    },
    [favoriteIds]
  );

  const toggleFavorite = useCallback(
    (recipe) => {
      if (!recipe || !recipe._id) return;
      const id = String(recipe._id);
      let updated;
      if (favoriteIds.includes(id)) {
        updated = favoriteIds.filter((item) => item !== id);
        toast('Removed from Favorites', { icon: '💔' });
      } else {
        updated = [...favoriteIds, id];
        toast.success(`Saved "${recipe.name}" to Favorites!`, { icon: '❤️' });
      }
      saveFavorites(updated);
    },
    [favoriteIds]
  );

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
    favoriteCount: favoriteIds.length,
  };
};
