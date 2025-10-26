import mongoose from 'mongoose';
import 'dotenv/config';

const diagnose = async () => {
  console.log('🔍 DIAGNOSING QUIZ DATA ISSUE\n');

  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB\n');

  const Quiz = (await import('./models/Quiz.js')).default;

  // 1. Check all domains in database
  const allDomains = await Quiz.distinct('domain');
  console.log('1. ALL DOMAINS IN DATABASE:');
  console.log(allDomains);
  console.log('');

  // 2. Check specifically for C/C++ variations
  console.log('2. SEARCHING FOR C/C++ RELATED DOMAINS:');
  const cppDomains = allDomains.filter(domain => 
    domain.toLowerCase().includes('c') || 
    domain.includes('++') || 
    domain.includes('/')
  );
  console.log(cppDomains);
  console.log('');

  // 3. Check exact match for "C/C++"
  console.log('3. CHECKING EXACT MATCH FOR "C/C++":');
  const exactMatch = await Quiz.countDocuments({ domain: 'C/C++' });
  console.log(`Questions with exact domain "C/C++": ${exactMatch}`);
  
  if (exactMatch > 0) {
    const levels = await Quiz.distinct('level', { domain: 'C/C++' });
    console.log(`Levels available: ${levels}`);
    
    const basicCount = await Quiz.countDocuments({ domain: 'C/C++', level: 'Basic' });
    console.log(`"C/C++ Basic" questions: ${basicCount}`);
  }
  console.log('');

  // 4. Check what the frontend is actually sending
  console.log('4. FRONTEND REQUEST ANALYSIS:');
  const frontendRequest = 'C%2FC%2B%2B'; // This is what your frontend sends
  const decodedRequest = decodeURIComponent(frontendRequest);
  console.log(`Frontend sends: ${frontendRequest}`);
  console.log(`Decoded: ${decodedRequest}`);
  console.log(`Matches "C/C++": ${decodedRequest === 'C/C++'}`);
  console.log('');

  // 5. Test the actual query
  console.log('5. TESTING ACTUAL DATABASE QUERY:');
  const testQuery = { domain: 'C/C++', level: 'Basic' };
  console.log('Query:', JSON.stringify(testQuery));
  
  const results = await Quiz.find(testQuery);
  console.log(`Results found: ${results.length}`);
  
  if (results.length > 0) {
    console.log('Sample question:');
    console.log({
      id: results[0]._id,
      domain: results[0].domain,
      level: results[0].level,
      question: results[0].question.substring(0, 100) + '...'
    });
  }
  console.log('');

  // 6. Check for similar domains
  console.log('6. CHECKING FOR SIMILAR DOMAINS:');
  const similarDomains = await Quiz.aggregate([
    {
      $match: {
        $or: [
          { domain: { $regex: 'c', $options: 'i' } },
          { domain: { $regex: 'c++', $options: 'i' } }
        ]
      }
    },
    {
      $group: {
        _id: '$domain',
        count: { $sum: 1 },
        levels: { $addToSet: '$level' }
      }
    }
  ]);
  console.log('Similar domains found:');
  similarDomains.forEach(domain => {
    console.log(`- "${domain._id}": ${domain.count} questions, levels: ${domain.levels.join(', ')}`);
  });

  await mongoose.connection.close();
  console.log('\n🔌 MongoDB connection closed');
};

diagnose().catch(console.error);