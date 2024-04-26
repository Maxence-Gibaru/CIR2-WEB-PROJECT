const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static("../public"));

// Enable CORS with options for allowing requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Enable CORS middleware
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Set headers to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Set up session middleware
app.use(
  session({
    secret: 'e3828452f04c15b4a749a4bad02573d52bfac09a280ec05300e8f68748f1d608y',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Not using HTTPS
      maxAge: 86400000, // Cookie expiration time (1 day)
    },
  })
);

// Connect to MongoDB Atlas database
mongoose
  .connect('mongodb+srv://ugowarem:Q7TT52ivN8fncVle@cluster0.xe28aee.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test', // Specify the database name
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('MongoDB Atlas connection error:', error);
  });

// Define the Profile schema
const ProfileSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  mobileNumber: Number,
  colorPreference: String,
});

// Create a model for Profile using the schema
const Profile = mongoose.model('profiles', ProfileSchema);

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  profiles: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' } // Reference the Profile schema
});

// Create a model for User using the schema
const User = mongoose.model('User', UserSchema);

// Handle user signup
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
  
    // Create a new profile associated with the user
    const newProfile = new Profile({
      email: email,
    });

    await newProfile.save();
    newUser.profiles = newProfile._id;
    await newUser.save();

    // Set session data for the new user
    req.session.user = newUser;
    res.send('Signup successful');
  } catch (error) {
    res.status(500).send('Signup failed');
  }
});

// Handle user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password === password) {
      // Set session data for the logged-in user
      req.session.user = user;
      req.session.email = user.email;
      const sessionId = req.session.id;
      
      const responseData = {
        message: 'Login successful',
        loggedIn: true,
        user: user,
        sessionId: sessionId,
        redirectTo: 'http://localhost:3000'
      };
      res.status(200).json(responseData);
    } else {
      res.status(401).json({ message: 'Incorrect password', loggedIn: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Check session status
app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    if (req.originalUrl !== '/login.html') { 
      res.status(302).set('Location', 'http://localhost:3000/login.html').end(); 
    } else {
      res.status(200).json({ loggedIn: false }); 
    }
  }
});

// Handle user logout
app.get('/api/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          res.status(500).json({ message: 'Error destroying session' });
      } else {
          res.status(200).json({ message: 'Logout successful' });
      }
  });
});

// Serve index.html if user is logged in
app.get('/', (req, res) => {
  if (req.session.user) {
      res.sendFile(__dirname + '/index.html');
  } else {
      res.redirect('/login.html');
  }
});

// Update user profile
app.post('/api/profiles/update', async (req, res) => {
  const { email, firstName, lastName, mobileNumber, color } = req.body;

  try {
    // Find the user profile based on email
    let profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Update profile fields
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.mobileNumber = mobileNumber;
    profile.colorPreference = color;

    // Save the changes to the database
    await profile.save();

    // Send response indicating successful update
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    // Send response in case of error
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Fetch user profile by email
app.get('/api/profiles/:email', async (req, res) => {
  const email = req.params.email;

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
