const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');


const app = express();
const PORT = process.env.PORT || 3000;


// Serve static files from the "public" directory
app.use(express.static("../public"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors());
app.use(express.json());

// Middleware for allowing cross-origin requests and credentials
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Configuration de la session
app.use(
  session({
    secret: 'e3828452f04c15b4a749a4bad02573d52bfac09a280ec05300e8f68748f1d608y',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Modifier à true si vous utilisez HTTPS
      maxAge: 86400000, // Durée de vie du cookie en millisecondes (86400000 ms = 1 jour)
    },
  })
);

// Connect to MongoDB Atlas
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

// Créer un modèle de données pour la collection "users"
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', UserSchema);

// Route d'inscription
// Route d'inscription
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user with provided email already exists
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    // If user does not exist, create a new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();
    req.session.user = newUser; // Stocke l'utilisateur dans la session
    res.send('Signup successful');
  } catch (error) {
    res.status(500).send('Signup failed');
  }
});


// Route de connexion
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.error('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.password === password) {
      req.session.user = user; // Stocke l'utilisateur dans la session
      const sessionId = req.session.id; // Récupère l'ID de session
      
      const responseData = {
        message: 'Login successful',
        loggedIn: true,
        user: user,
        sessionId: sessionId,
        redirectTo: 'http://localhost:3000' // URL de redirection
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
    if (req.originalUrl !== '/login.html') { // Vérifier si l'utilisateur essaie d'accéder à login.html
      res.status(302).set('Location', 'http://localhost:3000/login.html').end(); // Redirection vers la page de connexion
    } else {
      res.status(200).json({ loggedIn: false }); // L'utilisateur est déjà sur la page de connexion
    }
  }
});

// Route de déconnexion
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

// Route de la page d'accueil
app.get('/', (req, res) => {
  if (req.session.user) {
      // Si l'utilisateur est connecté, renvoyer la page normalement
      res.sendFile(__dirname + '/index.html');
  } else {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      res.redirect('/login.html');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});