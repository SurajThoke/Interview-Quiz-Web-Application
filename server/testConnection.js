import mongoose from 'mongoose';
import 'dotenv/config';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// Test 1: Check environment variables
console.log('=== Testing Environment ===');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Present' : 'Missing');

// Test 2: Check JSON file
try {
  const quizData = require('./data/quizData.json');
  console.log('✅ quizData.json loaded successfully');
  console.log('Domains found:', Object.keys(quizData));
  
  if (quizData["C/C++"]) {
    console.log('✅ C/C++ domain found');
    console.log('Levels in C/C++:', Object.keys(quizData["C/C++"]));
    console.log('Basic questions count:', quizData["C/C++"]["Basic"]?.length || 0);
  } else {
    console.log('❌ C/C++ domain NOT found');
  }
} catch (error) {
  console.log('❌ Failed to load quizData.json:', error.message);
}

// Test 3: Test database connection
console.log('\n=== Testing Database Connection ===');
async function testDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Test if Quiz model works
    const Quiz = (await import('./models/Quiz.js')).default;
    const count = await Quiz.countDocuments();
    console.log(`📊 Current questions in database: ${count}`);
    
    await mongoose.connection.close();
    console.log('✅ Database test completed');
  } catch (error) {
    console.log('❌ Database connection failed:', error.message);
  }
}

testDB();