import Quiz from '../models/Quiz.js'
import User from '../models/User.js'

export const getQuizQuestions = async (req, res) => {
  const { domain, level } = req.params

  console.log('=== GET QUIZ QUESTIONS CALLED ===');
  console.log('Raw domain:', domain);
  console.log('Raw level:', level);
  console.log('URL decoded domain:', decodeURIComponent(domain));

  try {
    // First try with exact match
    let questions = await Quiz.find({ domain, level });
    console.log(`Exact match found: ${questions.length} questions`);

    // If no exact match, try with URL decoding
    if (questions.length === 0) {
      const decodedDomain = decodeURIComponent(domain);
      console.log('Trying with decoded domain:', decodedDomain);
      questions = await Quiz.find({ domain: decodedDomain, level });
      console.log(`Decoded match found: ${questions.length} questions`);
    }

    // If still no questions, try case-insensitive search
    if (questions.length === 0) {
      console.log('Trying case-insensitive search...');
      questions = await Quiz.find({
        domain: { $regex: new RegExp(`^${domain}$`, 'i') },
        level: { $regex: new RegExp(`^${level}$`, 'i') }
      });
      console.log(`Case-insensitive match found: ${questions.length} questions`);
    }

    // If still no questions, show what's available
    if (questions.length === 0) {
      console.log('No questions found with any method');
      
      // Debug: Check what domains and levels exist
      const allDomains = await Quiz.distinct('domain');
      const cppDomains = allDomains.filter(d => d.includes('C') || d.includes('c++'));
      const allLevels = await Quiz.distinct('level');
      
      console.log('All available domains:', allDomains);
      console.log('C/C++ related domains:', cppDomains);
      console.log('All available levels:', allLevels);

      return res.status(404).json({ 
        message: 'Could not load quiz questions. Check server connection and domain/level parameters.',
        searched: { domain, level },
        availableDomains: allDomains,
        availableLevels: allLevels
      });
    }

    console.log(`✅ Successfully returning ${questions.length} questions`);
    res.status(200).json(questions);

  } catch (error) {
    console.error('❌ Error in getQuizQuestions:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quiz questions', 
      error: error.message 
    });
  }
}

export const getPracticeQuestions = async (req, res) => {
  const { domain } = req.params

  console.log('=== GET PRACTICE QUESTIONS CALLED ===');
  console.log('Domain:', domain);

  try {
    // For practice mode, get questions from all levels of a specific domain
    const questions = await Quiz.find({ domain })
    
    if (questions.length === 0) {
      // Try with decoded domain
      const decodedDomain = decodeURIComponent(domain);
      console.log('Trying with decoded domain:', decodedDomain);
      const decodedQuestions = await Quiz.find({ domain: decodedDomain });
      
      if (decodedQuestions.length === 0) {
        return res.status(404).json({ 
          message: 'No practice questions found for this domain',
          domain 
        });
      }
      
      console.log(`✅ Found ${decodedQuestions.length} practice questions`);
      return res.status(200).json(decodedQuestions);
    }

    console.log(`✅ Found ${questions.length} practice questions`);
    res.status(200).json(questions);
  } catch (error) {
    console.error('❌ Error in getPracticeQuestions:', error);
    res.status(500).json({ 
      message: 'Failed to fetch practice questions', 
      error: error.message 
    });
  }
}

export const getUserProgress = async (req, res) => {
  console.log('=== GET USER PROGRESS CALLED ===');
  
  try {
    // Get the actual user from database
    const user = await User.findById(req.user.id);
    
    if (!user) {
      console.log('❌ User not found for ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ User found:', user.email);

    // Calculate success rate
    const successRate = user.totalQuestionsAttempted > 0 
      ? Math.round((user.correctAnswers / user.totalQuestionsAttempted) * 100)
      : 0;

    // Return REAL user data
    const progressData = {
      quizzesCompleted: user.quizzesCompleted,
      correctAnswers: user.correctAnswers,
      totalQuestions: user.totalQuestionsAttempted,
      streak: user.currentStreak,
      successRate: successRate,
      domains: {
        // This will be empty for now - we'll implement later
      },
      recentActivity: [
        // This will be empty for now - we'll implement later
      ]
    }

    console.log('✅ Returning progress data:', progressData);
    res.status(200).json(progressData);
    
  } catch (error) {
    console.error('❌ Error fetching user progress:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user progress', 
      error: error.message 
    });
  }
}

export const getDomains = async (req, res) => {
  console.log('=== GET DOMAINS CALLED ===');
  
  try {
    const domains = await Quiz.distinct('domain');
    
    console.log('Domains found in database:', domains);
    console.log('Number of domains:', domains.length);

    // If no domains found, return some default domains
    if (!domains || domains.length === 0) {
      console.log('No domains found in database, returning default domains');
      const defaultDomains = ['JavaScript', 'Python', 'Web Development', 'Data Structures'];
      return res.status(200).json(defaultDomains);
    }
    
    console.log('✅ Returning domains to client');
    res.status(200).json(domains);
    
  } catch (error) {
    console.error('❌ Error fetching domains:', error);
    // Return some default domains in case of error
    const defaultDomains = ['JavaScript', 'Python', 'Web Development', 'Data Structures'];
    res.status(200).json(defaultDomains);
  }
}

export const getQuizStats = async (req, res) => {
  console.log('=== GET QUIZ STATS CALLED ===');
  
  try {
    // Get total questions count per domain
    const domainStats = await Quiz.aggregate([
      {
        $group: {
          _id: '$domain',
          totalQuestions: { $sum: 1 },
          levels: { $addToSet: '$level' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    console.log('Domain stats calculated:', domainStats.length, 'domains');
    res.status(200).json(domainStats);
    
  } catch (error) {
    console.error('❌ Error fetching quiz statistics:', error);
    res.status(500).json({ 
      message: 'Failed to fetch quiz statistics', 
      error: error.message 
    });
  }
}

// NEW FUNCTION: Get question counts by domain and level
export const getQuestionCounts = async (req, res) => {
  const { domain } = req.params;

  console.log('=== GET QUESTION COUNTS CALLED ===');
  console.log('Requested domain:', domain);

  try {
    const decodedDomain = decodeURIComponent(domain);
    console.log('Decoded domain:', decodedDomain);

    // Get counts grouped by level for the specific domain
    const levelCounts = await Quiz.aggregate([
      { 
        $match: { 
          domain: decodedDomain 
        } 
      },
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('Raw level counts:', levelCounts);

    // Format the response with default values
    const counts = {
      Basic: 0,
      Medium: 0,
      Advanced: 0
    };

    // Fill in the actual counts
    levelCounts.forEach(level => {
      counts[level._id] = level.count;
    });

    console.log(`✅ Question counts for ${decodedDomain}:`, counts);
    res.status(200).json(counts);

  } catch (error) {
    console.error('❌ Error fetching question counts:', error);
    res.status(500).json({ 
      message: 'Failed to fetch question counts', 
      error: error.message 
    });
  }
}

export const submitQuiz = async (req, res) => {
  console.log('=== SUBMIT QUIZ CALLED ===');
  console.log('Request body:', req.body);
  
  try {
    const { score, totalQuestions, correctAnswers, domain, level } = req.body;
    const userId = req.user.id;

    console.log('User ID:', userId);
    console.log('Quiz results:', { score, totalQuestions, correctAnswers, domain, level });

    // Find user and update stats
    const user = await User.findById(userId);
    
    if (!user) {
      console.log('❌ User not found for ID:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ User found, updating stats...');

    // Update user statistics
    user.quizzesCompleted += 1;
    user.correctAnswers += correctAnswers;
    user.totalQuestionsAttempted += totalQuestions;

    // Update streak logic (basic implementation)
    const today = new Date();
    const lastQuiz = user.lastQuizDate ? new Date(user.lastQuizDate) : null;
    
    if (lastQuiz) {
      const daysDiff = Math.floor((today - lastQuiz) / (1000 * 60 * 60 * 24));
      console.log('Days since last quiz:', daysDiff);
      
      if (daysDiff === 1) {
        // Consecutive day - increase streak
        user.currentStreak += 1;
        console.log('✅ Streak increased to:', user.currentStreak);
      } else if (daysDiff > 1) {
        // Streak broken - reset to 1
        user.currentStreak = 1;
        console.log('🔄 Streak reset to 1');
      }
      // If daysDiff === 0, same day - don't change streak
    } else {
      // First quiz - start streak
      user.currentStreak = 1;
      console.log('🎯 First quiz - starting streak at 1');
    }

    user.lastQuizDate = today;
    await user.save();

    const successRate = Math.round((user.correctAnswers / user.totalQuestionsAttempted) * 100);
    
    console.log('✅ Quiz submitted successfully');
    console.log('Updated stats:', {
      quizzesCompleted: user.quizzesCompleted,
      correctAnswers: user.correctAnswers,
      totalQuestions: user.totalQuestionsAttempted,
      successRate,
      currentStreak: user.currentStreak
    });

    res.status(200).json({
      message: 'Quiz submitted successfully',
      updatedStats: {
        quizzesCompleted: user.quizzesCompleted,
        correctAnswers: user.correctAnswers,
        totalQuestions: user.totalQuestionsAttempted,
        successRate: successRate,
        currentStreak: user.currentStreak
      }
    });

  } catch (error) {
    console.error('❌ Error submitting quiz:', error);
    res.status(500).json({ 
      message: 'Failed to submit quiz', 
      error: error.message 
    });
  }
}

// Additional utility function to check database health
export const getDatabaseHealth = async (req, res) => {
  console.log('=== DATABASE HEALTH CHECK ===');
  
  try {
    const totalQuestions = await Quiz.countDocuments();
    const totalDomains = await Quiz.distinct('domain');
    const totalUsers = await User.countDocuments();
    
    const healthData = {
      database: 'Connected',
      totalQuestions,
      totalDomains: totalDomains.length,
      totalUsers,
      sampleDomains: totalDomains.slice(0, 5),
      timestamp: new Date().toISOString()
    };

    console.log('✅ Database health check:', healthData);
    res.status(200).json(healthData);
    
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    res.status(500).json({
      database: 'Disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}

// Function to get questions by ID (useful for review)
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  
  console.log('=== GET QUESTION BY ID ===');
  console.log('Question ID:', id);

  try {
    const question = await Quiz.findById(id);
    
    if (!question) {
      console.log('❌ Question not found with ID:', id);
      return res.status(404).json({ message: 'Question not found' });
    }

    console.log('✅ Question found:', question.question.substring(0, 50) + '...');
    res.status(200).json(question);
    
  } catch (error) {
    console.error('❌ Error fetching question by ID:', error);
    res.status(500).json({ 
      message: 'Failed to fetch question', 
      error: error.message 
    });
  }
}