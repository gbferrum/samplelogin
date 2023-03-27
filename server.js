const express = require('express')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1 * 60 * 1000, // 60 minutes
    httpOnly: true
  },
}))

app.use(express.static('public'))

app.get('/login', (req, res) => {
  // Authenticate the user and create a session
  // ...
  req.session.expiration = req.session.cookie.expires;
  res.redirect('/dashboard')
})

app.get('/keep-session-active', (req, res) => {
  req.session.touch()
  req.session.expiration = req.session.cookie.expires;
  res.end()
})

app.get('/expires', (req,res) => {
    res.send(req.session.cookie.expires.toLocaleTimeString())
})

app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/check-session', function(req, res) {
    // Check if the session exists
    if (!req.session) {
      res.status(401).send('Unauthorized');
      return;
    }

    // Return the remaining time as a JSON response
    res.json({ remainingTime: new Date(req.session.expiration).getTime() - new Date().getTime()});
  });

app.listen(3000, () => {
    console.log('Server started on port 3000')
})