const mongoose = require('mongoose');
const sampleRecipes = require('../seed/recipesData');

// 1. Mongoose Schema Definition
const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, default: 1 },
    unit: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
    },
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts', 'Vegetarian', 'Non-Vegetarian'],
      default: 'Lunch',
    },
    cookingTime: { type: Number, required: true, min: 1 },
    preparationTime: { type: Number, default: 10, min: 0 },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    servings: { type: Number, default: 2, min: 1 },
    ingredients: [ingredientSchema],
    instructions: [String],
    isVegetarian: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MongooseRecipe = mongoose.model('Recipe', recipeSchema);

// 2. In-Memory Store for Zero-Config Fallback Mode
let inMemoryRecipes = sampleRecipes.map((r, idx) => ({
  ...r,
  _id: new mongoose.Types.ObjectId().toString(),
  createdAt: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
  updatedAt: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
}));

const memoryStore = {
  find: (query = {}) => {
    let results = inMemoryRecipes.filter((r) => {
      // Category filter
      if (query.category && r.category !== query.category) return false;
      // Vegetarian filter
      if (query.isVegetarian !== undefined && r.isVegetarian !== query.isVegetarian) return false;
      // Difficulty filter
      if (query.difficulty && r.difficulty !== query.difficulty) return false;
      // Max cooking time ($lte)
      if (query.cookingTime && query.cookingTime.$lte && r.cookingTime > query.cookingTime.$lte) return false;

      // $or search queries (regex)
      if (query.$or && Array.isArray(query.$or)) {
        const matchesOr = query.$or.some((condition) => {
          if (condition.name && condition.name instanceof RegExp) {
            return condition.name.test(r.name);
          }
          if (condition.description && condition.description instanceof RegExp) {
            return condition.description.test(r.description);
          }
          if (condition.category && condition.category instanceof RegExp) {
            return condition.category.test(r.category);
          }
          if (condition['ingredients.name'] && condition['ingredients.name'] instanceof RegExp) {
            return r.ingredients?.some((ing) => condition['ingredients.name'].test(ing.name));
          }
          return false;
        });
        if (!matchesOr) return false;
      }

      return true;
    });

    return {
      sort: (sortOption = {}) => {
        const sorted = [...results];
        if (sortOption.cookingTime === 1) {
          sorted.sort((a, b) => a.cookingTime - b.cookingTime);
        } else if (sortOption.name === 1) {
          sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else {
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }
        return Promise.resolve(sorted);
      },
      then: (resolve) => resolve(results),
    };
  },

  findById: (id) => {
    const doc = inMemoryRecipes.find((r) => String(r._id) === String(id));
    return Promise.resolve(doc ? { ...doc } : null);
  },

  create: (data) => {
    const newDoc = {
      ...data,
      _id: new mongoose.Types.ObjectId().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    inMemoryRecipes.unshift(newDoc);
    return Promise.resolve(newDoc);
  },

  findByIdAndUpdate: (id, updateData, options = {}) => {
    const index = inMemoryRecipes.findIndex((r) => String(r._id) === String(id));
    if (index === -1) return Promise.resolve(null);

    inMemoryRecipes[index] = {
      ...inMemoryRecipes[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve({ ...inMemoryRecipes[index] });
  },

  findByIdAndDelete: (id) => {
    const index = inMemoryRecipes.findIndex((r) => String(r._id) === String(id));
    if (index === -1) return Promise.resolve(null);

    const deleted = inMemoryRecipes.splice(index, 1)[0];
    return Promise.resolve(deleted);
  },

  countDocuments: (query = {}) => {
    return Promise.resolve(inMemoryRecipes.length);
  },

  deleteMany: (query = {}) => {
    inMemoryRecipes = [];
    return Promise.resolve({ acknowledged: true, deletedCount: 0 });
  },

  insertMany: (docs = []) => {
    const inserted = docs.map((d, idx) => ({
      ...d,
      _id: new mongoose.Types.ObjectId().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    inMemoryRecipes = [...inserted];
    return Promise.resolve(inserted);
  },
};

// 3. Proxy Handler: Delegates dynamically based on Mongoose connection state
const RecipeProxy = new Proxy(MongooseRecipe, {
  get: function (target, prop) {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      return target[prop];
    }
    if (prop in memoryStore) {
      return memoryStore[prop];
    }
    return target[prop];
  },
});

module.exports = RecipeProxy;
