import mongoose from 'mongoose';
import 'dotenv/config';
import Quiz from './models/Quiz.js';

// FIX: Use require() for JSON files in a mixed (or CommonJS) environment
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const quizData = require('./data/quizData.json'); 

// FIX: Change MONGODB_URI to MONGO_URI to match your .env file
const MONGO_URI = process.env.MONGO_URI; 

// Function to connect and seed the database
const seedDB = async () => {
  // Check against the correct variable name
  if (!MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the environment variables.');
    return;
  }

  try {
    // 1. Connect to MongoDB using the correct URI variable
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true, 
      // useUnifiedTopology: true, 
    });
    console.log('✅ MongoDB connection successful for seeding.');

    // 2. Clear existing quiz data to prevent duplicates
    // NOTE: This will delete ALL existing quiz data.
    await Quiz.deleteMany({}); 
    console.log('🗑️ Existing Quiz data cleared.');

    // 3. Transform the hierarchical JSON data into a flat array of Mongoose documents
    const questionsToInsert = [];

    // Iterate through domains (e.g., "Web Development", "Python")
    for (const [domain, levels] of Object.entries(quizData)) {
      // Iterate through levels (e.g., "Basic", "Medium")
      for (const [level, questions] of Object.entries(levels)) {
        // Iterate through individual questions
        questions.forEach((q) => {
          questionsToInsert.push({
            domain: domain,
            level: level,
            question: q.question,
            options: q.options,
            answer: q.answer,
          });
        });
      }
    }

    // 4. Insert the transformed data
    await Quiz.insertMany(questionsToInsert);
    console.log(`✨ Successfully inserted ${questionsToInsert.length} questions into the database.`);

  } catch (err) {
    console.error('❌ Error seeding the database:', err);
  } finally {
    // 5. Disconnect from MongoDB
    mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
};

seedDB();
