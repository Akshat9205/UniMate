const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Contact = require('./models/Contact');
const UserDetails = require('./models/UserDetails');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
