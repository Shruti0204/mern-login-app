const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const User = require('./models/user'); // model

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/task');

// Registration route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.json({ success: false, message: 'User already exists' });

  const newUser = new User({ name, email, password });
  await newUser.save();
  res.json({ success: true, message: 'Successfully Registered' });
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (user) {
    res.json({ success: true, name: user.name });
  } else {
    res.json({ success: false, message: 'Invalid Credentials' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
