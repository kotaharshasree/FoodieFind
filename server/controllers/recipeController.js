const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const sampleRecipes = require('../seed/recipesData');

// @desc    Get all recipes with optional filtering, search, and sorting
// @route   GET /api/recipes
exports.getRecipes = async (req, res) => {
  try {
    const { search, category, isVegetarian, maxTime, difficulty, sort } = req.query;

    const query = {};

    // Filter by category
    if (category && category !== 'All') {
      if (category === 'Vegetarian') {
        query.isVegetarian = true;
      } else if (category === 'Non-Vegetarian') {
        query.isVegetarian = false;
      } else {
        query.category = category;
      }
    }

    // Filter by vegetarian flag explicitly if provided
    if (isVegetarian !== undefined && isVegetarian !== '') {
      query.isVegetarian = isVegetarian === 'true' || isVegetarian === true;
    }

    // Filter by max cooking time
    if (maxTime && !isNaN(Number(maxTime))) {
      query.cookingTime = { $lte: Number(maxTime) };
    }

    // Filter by difficulty
    if (difficulty && ['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      query.difficulty = difficulty;
    }

    // Search by keyword (matches name, description, category, or ingredients)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { 'ingredients.name': searchRegex },
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'quickest') {
      sortOption = { cookingTime: 1 };
    } else if (sort === 'alphabetical') {
      sortOption = { name: 1 };
    } else if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const recipes = await Recipe.find(query).sort(sortOption);

    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    console.error('Error in getRecipes:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recipes',
      error: error.message,
    });
  }
};

// @desc    Get single recipe by ID
// @route   GET /api/recipes/:id
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Recipe ID format',
      });
    }

    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    console.error('Error in getRecipeById:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recipe details',
      error: error.message,
    });
  }
};

// @desc    Create a new recipe
// @route   POST /api/recipes
exports.createRecipe = async (req, res) => {
  try {
    let {
      name,
      description,
      image,
      category,
      cookingTime,
      preparationTime,
      difficulty,
      servings,
      ingredients,
      instructions,
      isVegetarian,
    } = req.body;

    if (!name || !description || !cookingTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, and cooking time',
      });
    }

    // Normalize ingredients if sent as strings
    if (Array.isArray(ingredients)) {
      ingredients = ingredients.map((item) => {
        if (typeof item === 'string') {
          return { name: item.trim(), quantity: 1, unit: '' };
        }
        return {
          name: item.name ? String(item.name).trim() : 'Ingredient',
          quantity: item.quantity !== undefined ? Number(item.quantity) : 1,
          unit: item.unit ? String(item.unit).trim() : '',
        };
      }).filter(item => item.name.length > 0);
    } else {
      ingredients = [];
    }

    // Normalize instructions
    if (Array.isArray(instructions)) {
      instructions = instructions
        .map(step => (typeof step === 'string' ? step.trim() : String(step).trim()))
        .filter(step => step.length > 0);
    } else if (typeof instructions === 'string') {
      instructions = instructions.split('\n').map(s => s.trim()).filter(Boolean);
    } else {
      instructions = [];
    }

    if (ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one ingredient is required',
      });
    }

    if (instructions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one cooking instruction step is required',
      });
    }

    const newRecipe = await Recipe.create({
      name: name.trim(),
      description: description.trim(),
      image: image && image.trim() !== '' ? image.trim() : undefined,
      category: category || 'Lunch',
      cookingTime: Number(cookingTime),
      preparationTime: preparationTime ? Number(preparationTime) : 10,
      difficulty: difficulty || 'Easy',
      servings: servings ? Number(servings) : 2,
      ingredients,
      instructions,
      isVegetarian: isVegetarian !== undefined ? Boolean(isVegetarian) : true,
    });

    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: newRecipe,
    });
  } catch (error) {
    console.error('Error in createRecipe:', error.message);
    res.status(400).json({
      success: false,
      message: error.message || 'Error creating recipe',
    });
  }
};

// @desc    Update an existing recipe
// @route   PUT /api/recipes/:id
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Recipe ID format',
      });
    }

    let updateData = { ...req.body };

    // Normalize ingredients if provided
    if (updateData.ingredients && Array.isArray(updateData.ingredients)) {
      updateData.ingredients = updateData.ingredients.map((item) => {
        if (typeof item === 'string') {
          return { name: item.trim(), quantity: 1, unit: '' };
        }
        return {
          name: item.name ? String(item.name).trim() : 'Ingredient',
          quantity: item.quantity !== undefined ? Number(item.quantity) : 1,
          unit: item.unit ? String(item.unit).trim() : '',
        };
      }).filter(item => item.name.length > 0);
    }

    // Normalize instructions if provided
    if (updateData.instructions && Array.isArray(updateData.instructions)) {
      updateData.instructions = updateData.instructions
        .map(step => (typeof step === 'string' ? step.trim() : String(step).trim()))
        .filter(step => step.length > 0);
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: updatedRecipe,
    });
  } catch (error) {
    console.error('Error in updateRecipe:', error.message);
    res.status(400).json({
      success: false,
      message: error.message || 'Error updating recipe',
    });
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Recipe ID format',
      });
    }

    const recipe = await Recipe.findByIdAndDelete(id);

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `Recipe not found with id of ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully',
      data: {},
    });
  } catch (error) {
    console.error('Error in deleteRecipe:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting recipe',
      error: error.message,
    });
  }
};

// @desc    Reset and reseed sample recipes
// @route   POST or GET /api/recipes/seed
exports.seedRecipes = async (req, res) => {
  try {
    await Recipe.deleteMany({});
    const inserted = await Recipe.insertMany(sampleRecipes);
    res.status(200).json({
      success: true,
      message: `Database successfully reseeded with ${inserted.length} sample recipes!`,
      count: inserted.length,
    });
  } catch (error) {
    console.error('Error in seedRecipes:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to reseed database',
      error: error.message,
    });
  }
};
