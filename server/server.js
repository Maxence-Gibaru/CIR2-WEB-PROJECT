const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("../public"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(
  session({
    secret: 'e3828452f04c15b4a749a4bad02573d52bfac09a280ec05300e8f68748f1d608y',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 86400000,
    },
  })
);

mongoose
  .connect('mongodb+srv://ugowarem:Q7TT52ivN8fncVle@cluster0.xe28aee.mongodb.net/mydatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'test',
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((error) => {
    console.log('MongoDB Atlas connection error:', error);
  });

  const ProfileSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    age: Number,
    profileImage: String,
    colorPreference: String,
  });
  
  const Profile = mongoose.model('profiles', ProfileSchema); // Modifier le nom du modèle
  
  const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    profiles: { type: mongoose.Schema.Types.ObjectId, ref: 'profiles' } // Modifier la référence du schéma
  });
  
  const User = mongoose.model('User', UserSchema);
  
  app.post('/api/profiles', async (req, res) => {
    const { email, firstName, lastName, age } = req.body;
  
    try {
      let profile = await Profile.findOne({ email });
  
      if (!profile) {
        profile = new Profile({
          email,
          firstName,
          lastName,
          age
        });
      } else {
        profile.firstName = firstName;
        profile.lastName = lastName;
        profile.age = age;
      }
  
      await profile.save();
      await User.findOneAndUpdate({ email }, { profiles: profile._id }); // Mettre à jour le champ profiles
  
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Failed to update profile' });
    }
  });
  
  app.post('/api/signup', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send('User with this email already exists');
      }
  
      const newUser = new User({
        username,
        email,
        password,
      });
  
      await newUser.save();
    
      const newProfile = new Profile({
        email: email,
      });
  
      await newProfile.save();
      newUser.profiles = newProfile._id;
      await newUser.save();
  
      req.session.user = newUser;
      res.send('Signup successful');
    } catch (error) {
      res.status(500).send('Signup failed');
    }
  });

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password === password) {
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

app.get('/', (req, res) => {
  if (req.session.user) {
      res.sendFile(__dirname + '/index.html');
  } else {
      res.redirect('/login.html');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});