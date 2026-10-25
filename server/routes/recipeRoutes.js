const express = require('express');
const router = express.Router();
const {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  seedRecipes,
} = require('../controllers/recipeController');

// Reseed route
router.route('/seed').get(seedRecipes).post(seedRecipes);

// Standard CRUD routes
router.route('/').get(getRecipes).post(createRecipe);
router.route('/:id').get(getRecipeById).put(updateRecipe).delete(deleteRecipe);

module.exports = router;
