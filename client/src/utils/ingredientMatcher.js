/**
 * Normalizes an ingredient string by lowercasing, trimming,
 * and stripping plurals or common descriptors for fuzzy comparison.
 */
export const normalizeIngredient = (text) => {
  if (!text) return '';
  let str = text.toLowerCase().trim();
  // Remove simple parenthetical comments e.g. "Onion (chopped)" -> "onion"
  str = str.replace(/\(.*?\)/g, '').trim();
  // Remove common words like fresh, organic, chopped, sliced, diced, boiled
  str = str.replace(/\b(fresh|organic|chopped|sliced|diced|boiled|crushed|grated|large|medium|small|cloves|leaves|powder|paste)\b/g, '').trim();
  // Strip trailing 'es' or 's'
  if (str.endsWith('ies')) {
    str = str.slice(0, -3) + 'y';
  } else if (str.endsWith('es') && str.length > 4) {
    str = str.slice(0, -2);
  } else if (str.endsWith('s') && !str.endsWith('ss') && str.length > 3) {
    str = str.slice(0, -1);
  }
  return str.replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
};

/**
 * Checks if a user-selected ingredient matches a recipe ingredient.
 */
export const isMatch = (userItem, recipeItemName) => {
  const normUser = normalizeIngredient(userItem);
  const normRecipe = normalizeIngredient(recipeItemName);

  if (!normUser || !normRecipe) return false;

  // Direct exact match
  if (normUser === normRecipe) return true;

  // Substring inclusion
  if (normRecipe.includes(normUser) || normUser.includes(normRecipe)) return true;

  // Word token overlap
  const userTokens = normUser.split(' ').filter(t => t.length > 2);
  const recipeTokens = normRecipe.split(' ').filter(t => t.length > 2);

  return userTokens.some(token => recipeTokens.includes(token));
};

/**
 * Evaluates a recipe against user's selected ingredients.
 * Returns match percentage, available ingredients list, and missing ingredients list.
 */
export const calculateRecipeMatch = (recipe, selectedIngredients) => {
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return {
      recipe,
      matchPercentage: 0,
      availableCount: 0,
      totalCount: recipe.ingredients ? recipe.ingredients.length : 0,
      availableIngredients: [],
      missingIngredients: recipe.ingredients ? recipe.ingredients.map(i => i.name) : [],
    };
  }

  const recipeIngredients = recipe.ingredients || [];
  const availableIngredients = [];
  const missingIngredients = [];

  recipeIngredients.forEach((ing) => {
    const matched = selectedIngredients.some((selected) => isMatch(selected, ing.name));
    if (matched) {
      availableIngredients.push(ing.name);
    } else {
      missingIngredients.push(ing.name);
    }
  });

  const totalCount = recipeIngredients.length;
  const availableCount = availableIngredients.length;
  const matchPercentage = totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  return {
    recipe,
    matchPercentage,
    availableCount,
    totalCount,
    availableIngredients,
    missingIngredients,
  };
};

/**
 * Sorts matched recipe results according to criterion:
 * - 'best_match': highest match % first
 * - 'quickest': lowest cookingTime first
 * - 'alphabetical': name A-Z
 */
export const sortMatchedRecipes = (matchedList, sortBy = 'best_match') => {
  return [...matchedList].sort((a, b) => {
    if (sortBy === 'best_match') {
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return a.recipe.cookingTime - b.recipe.cookingTime;
    }
    if (sortBy === 'quickest') {
      return a.recipe.cookingTime - b.recipe.cookingTime;
    }
    if (sortBy === 'alphabetical') {
      return a.recipe.name.localeCompare(b.recipe.name);
    }
    return 0;
  });
};
