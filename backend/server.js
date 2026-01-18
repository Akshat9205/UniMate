const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Contact = require('./models/Contact');
const UserDetails = require('./models/UserDetails');
const BugReport = require('./models/BugReport');
const SupportTicket = require('./models/SupportTicket');
const RoommateMatcher = require('./ml/RoommateMatcher');
const CSVRoommateMatcher = require('./ml/CSVRoommateMatcher');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize ML Models
const roommateMatcher = new RoommateMatcher();
const csvRoommateMatcher = new CSVRoommateMatcher();

// Train CSV model when server starts
async function initializeCSVModel() {
  try {
    csvRoommateMatcher.trainModel();
    console.log('CSV ML Model trained successfully');
  } catch (error) {
    console.error('CSV ML Model training failed:', error);
  }
}

// Train ML model with existing data when server starts
async function initializeMongoMLModel() {
  try {
    const users = await UserDetails.find({});
    if (users.length > 0) {
      await roommateMatcher.trainModel(users);
      console.log(`MongoDB ML Model trained with ${users.length} users`);
    } else {
      console.log('No users found for MongoDB ML training');
    }
  } catch (error) {
    console.error('MongoDB ML Model training failed:', error);
  }
}

// Initialize both models after MongoDB connection
mongoose.connection.once('open', () => {
  initializeCSVModel();
  initializeMongoMLModel();
});

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { fullName, email, password, firebaseUid } = req.body;

    // Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if user already exists by email or firebaseUid
    const existingUser = await User.findOne({ 
      $or: [{ email }, ...(firebaseUid ? [{ firebaseUid }] : [])]
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password (only for non-Firebase users)
    let hashedPassword = password;
    if (!firebaseUid) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      ...(firebaseUid && { firebaseUid })
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully',
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        firebaseUid: newUser.firebaseUid
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      subject,
      message
    });

    await newContact.save();

    res.status(201).json({ 
      message: 'Contact form submitted successfully',
      contact: {
        id: newContact._id,
        name: newContact.name,
        email: newContact.email,
        subject: newContact.subject,
        status: newContact.status,
        createdAt: newContact.createdAt
      }
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error during contact submission' });
  }
});

// Get all contact submissions (for admin)
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User Details form submission endpoint
app.post('/api/user-details', async (req, res) => {
  try {
    const {
      // Basic Information
      fullName,
      age,
      gender,
      university,
      course,
      year,
      
      // Location & Stay Preferences
      currentCity,
      preferredArea,
      moveInDate,
      budgetRange,
      roomType,
      
      // Lifestyle Habits
      sleepSchedule,
      smoking,
      drinking,
      foodPreference,
      cleanlinessLevel,
      studyStyle,
      
      // Personality Traits
      introvertExtrovert,
      organizedEasygoing,
      silentTalkative,
      earlyRiserNightOwl,
      
      // Roommate Expectations
      preferredRoommateGender,
      noiseTolerance,
      guestFrequency,
      maxRoommatesCount,
      
      // About Me
      bio
    } = req.body;

    // Validate required fields
    if (!fullName || !age || !gender || !university || !course || !year || !currentCity || !budgetRange || !roomType || !sleepSchedule || !smoking || !drinking || !foodPreference || !cleanlinessLevel || !studyStyle || !preferredRoommateGender || !noiseTolerance || !guestFrequency || !maxRoommatesCount) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Create new user details submission
    const newUserDetails = new UserDetails({
      // Basic Information
      fullName: fullName.trim(),
      age: parseInt(age),
      gender,
      university: university.trim(),
      course: course.trim(),
      year,
      
      // Location & Stay Preferences
      currentCity: currentCity.trim(),
      preferredArea: preferredArea.trim(),
      moveInDate: moveInDate || Date.now(),
      budgetRange,
      roomType,
      
      // Lifestyle Habits
      sleepSchedule,
      smoking,
      drinking,
      foodPreference,
      cleanlinessLevel,
      studyStyle,
      
      // Personality Traits
      introvertExtrovert: parseInt(introvertExtrovert),
      organizedEasygoing: parseInt(organizedEasygoing),
      silentTalkative: parseInt(silentTalkative),
      earlyRiserNightOwl: parseInt(earlyRiserNightOwl),
      
      // Roommate Expectations
      preferredRoommateGender,
      noiseTolerance,
      guestFrequency,
      maxRoommatesCount: parseInt(maxRoommatesCount),
      
      // About Me
      bio: bio.trim()
    });

    await newUserDetails.save();

    res.status(201).json({ 
      message: 'User details submitted successfully',
      userDetails: {
        id: newUserDetails._id,
        fullName: newUserDetails.fullName,
        email: newUserDetails.email,
        submittedAt: newUserDetails.createdAt
      }
    });
  } catch (error) {
    console.error('User details submission error:', error);
    res.status(500).json({ message: 'Server error during user details submission' });
  }
});

// Get all user details (for admin/ML processing)
app.get('/api/user-details', async (req, res) => {
  try {
    const userDetails = await UserDetails.find().sort({ createdAt: -1 });
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ML Roommate Matching Endpoint (CSV-based)
app.post('/api/match', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    // Check if CSV ML model is trained
    if (!csvRoommateMatcher.isTrained) {
      return res.status(503).json({ message: 'CSV ML model not ready. Please try again later.' });
    }

    // Get user details from MongoDB
    const userDetails = await UserDetails.findById(userId);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    // Find compatible roommates using CSV data
    const matches = csvRoommateMatcher.findMatchesForUser(userDetails, 5);

    res.json({
      success: true,
      matches: matches,
      totalMatches: matches.length,
      dataSource: 'CSV'
    });

  } catch (error) {
    console.error('Matching error:', error);
    
    if (error.message.includes('not found')) {
      return res.status(404).json({ message: 'User not found or no lifestyle data available' });
    }
    
    if (error.message.includes('not trained')) {
      return res.status(503).json({ message: 'ML model not ready. Please try again later.' });
    }

    res.status(500).json({ message: 'Server error during matching' });
  }
});

// ML Model Status Endpoint
app.get('/api/ml-status', (req, res) => {
  try {
    const csvStats = csvRoommateMatcher.getStats();
    const mongoStats = roommateMatcher.getStats();
    
    res.json({
      success: true,
      csvModel: csvStats,
      mongoModel: mongoStats,
      activeModel: 'CSV'
    });
  } catch (error) {
    console.error('ML status error:', error);
    res.status(500).json({ message: 'Server error fetching ML status' });
  }
});

// CSV Data Sample Endpoint
app.get('/api/csv-sample', (req, res) => {
  try {
    const sampleData = csvRoommateMatcher.getSampleData(3);
    res.json({
      success: true,
      sampleData: sampleData
    });
  } catch (error) {
    console.error('CSV sample error:', error);
    res.status(500).json({ message: 'Server error fetching CSV sample' });
  }
});

// Retrain ML Model Endpoint (for admin use)
app.post('/api/ml-retrain', async (req, res) => {
  try {
    console.log('Retraining ML model...');
    const users = await UserDetails.find({});
    
    if (users.length === 0) {
      return res.status(400).json({ message: 'No users found for training' });
    }

    await roommateMatcher.trainModel(users);
    
    res.json({
      success: true,
      message: `ML model retrained with ${users.length} users`,
      totalUsers: users.length
    });
    
  } catch (error) {
    console.error('ML retraining error:', error);
    res.status(500).json({ message: 'Server error during ML retraining' });
  }
});

// Bug Report submission endpoint
app.post('/api/bug-report', async (req, res) => {
  try {
    const {
      title,
      description,
      severity,
      type,
      reporterName,
      reporterEmail,
      userId,
      browserInfo,
      osInfo,
      stepsToReproduce,
      expectedBehavior,
      actualBehavior,
      screenshots
    } = req.body;

    // Validate required fields
    if (!title || !description || !reporterName || !reporterEmail) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(reporterEmail)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }

    // Create new bug report
    const newBugReport = new BugReport({
      title: title.trim(),
      description: description.trim(),
      severity: severity || 'medium',
      type: type || 'functionality',
      reporterName: reporterName.trim(),
      reporterEmail: reporterEmail.trim(),
      userId: userId || null,
      browserInfo: browserInfo?.trim() || '',
      osInfo: osInfo?.trim() || '',
      stepsToReproduce: stepsToReproduce?.trim() || '',
      expectedBehavior: expectedBehavior?.trim() || '',
      actualBehavior: actualBehavior?.trim() || '',
      screenshots: screenshots || []
    });

    await newBugReport.save();

    res.status(201).json({ 
      message: 'Bug report submitted successfully',
      bugReport: {
        id: newBugReport._id,
        title: newBugReport.title,
        severity: newBugReport.severity,
        type: newBugReport.type,
        status: newBugReport.status,
        createdAt: newBugReport.createdAt
      }
    });
  } catch (error) {
    console.error('Bug report submission error:', error);
    res.status(500).json({ message: 'Server error during bug report submission' });
  }
});

// Get all bug reports (for admin)
app.get('/api/bug-report', async (req, res) => {
  try {
    const bugReports = await BugReport.find().sort({ createdAt: -1 });
    res.json(bugReports);
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update bug report status (for admin)
app.patch('/api/bug-report/:id', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['open', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedBugReport = await BugReport.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!updatedBugReport) {
      return res.status(404).json({ message: 'Bug report not found' });
    }

    res.json({
      message: 'Bug report status updated successfully',
      bugReport: updatedBugReport
    });
  } catch (error) {
    console.error('Error updating bug report:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Support Ticket endpoints
app.post('/api/support-ticket', async (req, res) => {
  try {
    const {
      userId,
      category,
      subject,
      message,
      priority = 'medium',
      attachment
    } = req.body;

    // Validate required fields
    if (!category || !subject || !message) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    // Create new support ticket
    const newTicket = new SupportTicket({
      userId: userId || 'anonymous',
      category,
      subject: subject.trim(),
      message: message.trim(),
      priority,
      attachment: attachment || null
    });

    await newTicket.save();

    res.status(201).json({ 
      message: 'Support ticket created successfully',
      ticket: {
        id: newTicket._id,
        ticketId: newTicket.ticketId,
        category: newTicket.category,
        subject: newTicket.subject,
        status: newTicket.status,
        priority: newTicket.priority,
        createdAt: newTicket.createdAt
      }
    });
  } catch (error) {
    console.error('Support ticket creation error:', error);
    res.status(500).json({ message: 'Server error during ticket creation' });
  }
});

// Get all support tickets (for admin)
app.get('/api/support-ticket', async (req, res) => {
  try {
    const { status, category, userId } = req.query;
    const filter = {};
    
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (userId) filter.userId = userId;

    const tickets = await SupportTicket.find(filter)
      .sort({ createdAt: -1 })
      .select('-chatHistory');
    
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching support tickets:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single support ticket
app.get('/api/support-ticket/:id', async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Support ticket not found' });
    }

    res.json(ticket);
  } catch (error) {
    console.error('Error fetching support ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add chat message to support ticket
app.post('/api/support-ticket/:id/chat', async (req, res) => {
  try {
    const { sender, content } = req.body;
    
    if (!sender || !content) {
      return res.status(400).json({ message: 'Sender and content are required' });
    }

    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Support ticket not found' });
    }

    await ticket.addChatMessage(sender, content);

    res.json({
      message: 'Chat message added successfully',
      chatHistory: ticket.chatHistory
    });
  } catch (error) {
    console.error('Error adding chat message:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update support ticket status
app.patch('/api/support-ticket/:id', async (req, res) => {
  try {
    const { status, assignedAgent, resolution } = req.body;
    
    const ticket = await SupportTicket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Support ticket not found' });
    }

    if (status) ticket.status = status;
    if (assignedAgent) ticket.assignedAgent = assignedAgent;
    
    if (status === 'resolved' && resolution) {
      await ticket.resolve(resolution);
    } else {
      await ticket.save();
    }

    res.json({
      message: 'Support ticket updated successfully',
      ticket: ticket
    });
  } catch (error) {
    console.error('Error updating support ticket:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get support ticket statistics
app.get('/api/support-ticket/stats', async (req, res) => {
  try {
    const stats = await SupportTicket.getStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching support ticket stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
