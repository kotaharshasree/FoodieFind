import axios from 'axios';

// Use the deployed FoodieFind API by default. VITE_API_URL may be either the
// backend origin or the full /api URL; normalize it so both forms work.
const configuredApiUrl = import.meta.env.VITE_API_URL || 'https://foodiefind-backend-f2hn.onrender.com';
const normalizedApiUrl = configuredApiUrl.replace(/\/+$/, '');
const apiBaseUrl = normalizedApiUrl.endsWith('/api') ? normalizedApiUrl : `${normalizedApiUrl}/api`;

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const recipeService = {
  // Get all recipes with search, category, veg, maxTime, sort query params
  getRecipes: async (params = {}) => {
    const response = await api.get('/recipes', { params });
    return response.data;
  },

  // Get recipe by ID
  getRecipeById: async (id) => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  // Create new recipe
  createRecipe: async (recipeData) => {
    const response = await api.post('/recipes', recipeData);
    return response.data;
  },

  // Update existing recipe
  updateRecipe: async (id, recipeData) => {
    const response = await api.put(`/recipes/${id}`, recipeData);
    return response.data;
  },

  // Delete recipe
  deleteRecipe: async (id) => {
    const response = await api.delete(`/recipes/${id}`);
    return response.data;
  },

  // Reseed database with sample recipes
  seedRecipes: async () => {
    const response = await api.post('/recipes/seed');
    return response.data;
  },
};

export default api;
