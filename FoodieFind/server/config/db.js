const mongoose = require('mongoose');

let isConnectedToMongo = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/foodiefind';

  try {
    console.log(`Connecting to MongoDB at ${uri}...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongo = true;
    console.log(`✅ Connected to MongoDB Database successfully: ${mongoose.connection.host}`);

    // Auto-seed if database is empty
    const Recipe = require('../models/Recipe');
    const count = await Recipe.countDocuments();
    if (count === 0) {
      console.log('🌱 Database is empty. Auto-seeding 22+ realistic sample recipes...');
      const sampleRecipes = require('../seed/recipesData');
      await Recipe.insertMany(sampleRecipes);
      console.log('✅ Auto-seeding completed successfully!');
    } else {
      console.log(`📦 Database contains ${count} recipes.`);
    }
  } catch (err) {
    isConnectedToMongo = false;
    console.warn(`\n=============================================================`);
    console.warn(`⚠️  NOTICE: Could not connect to local MongoDB (${err.message})`);
    console.log(`💡 FoodieFind is running in Zero-Config In-Memory Mode!`);
    console.log(`✨ All REST APIs, CRUD operations, filters, and 22+ sample recipes`);
    console.log(`   are fully functional without requiring local MongoDB setup.`);
    console.log(`   (To use real MongoDB, provide MONGODB_URI in server/.env)`);
    console.log(`=============================================================\n`);
  }
};

connectDB.isConnected = () => isConnectedToMongo;

module.exports = connectDB;
