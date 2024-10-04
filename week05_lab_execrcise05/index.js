const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const fs = require('fs');

app.use(express.json());


router.get('/home', (req, res) => {
  fs.readFile('home.html', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read home.html' });
    }
    res.send(data);
  })
});


router.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read user.json' });
    }
    res.json(JSON.parse(data)); 
  });
});


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading user.json:', err);
      return res.status(500).json({ error: 'Failed to read user.json' });
    }
    
    try {
      const user = JSON.parse(data);
      
      if (user.username === username) {
        if (user.password === password) {
          return res.json({
            status: true,
            message: "User is valid"
          });
        } else {
          return res.json({
            status: false,
            message: "Password is invalid"
          });
        }
      } else {
        return res.json({
          status: false,
          message: "User Name is invalid"
        });
      }
    } catch (parseError) {
      console.error('Error parsing user.json:', parseError);
      return res.status(500).json({ error: 'Failed to parse user.json' });
    }
  });
});


router.get('/logout', (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send('<b>Error: Username is required for logout.</b>');
  }
  res.send(`<b>${username} successfully logged out.</b>`);
});


app.use((err,req,res,next) => {
  console.error(err); 
  res.status(500).send('Server Error');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));