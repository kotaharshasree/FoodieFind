require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');
const sampleRecipes = require('./recipesData');

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodiefind';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`Connected to MongoDB: ${mongoose.connection.host}`);

    console.log('Clearing existing recipes...');
    await Recipe.deleteMany({});

    console.log(`Inserting ${sampleRecipes.length} sample recipes...`);
    await Recipe.insertMany(sampleRecipes);

    console.log('✅ Successfully seeded database with sample recipes!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();
