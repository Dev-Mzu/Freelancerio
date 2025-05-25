const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config(); // ✅ Required to access .env (for Stripe keys)

const port = process.env.PORT || 3000;
console.log("The server starts up");
console.log(`${port}`, " running");

// Middleware to parse JSON data in request body
app.use(express.json());

// CORS middleware
app.use(cors());

// For serving static files
app.use(express.static(path.join(__dirname, '../public')));

// Serve .mjs files with correct MIME type -> might need to remove this
app.use('/scripts', express.static(path.join(__dirname, 'scripts'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));


const userRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contractRoutes = require('./routes/contractRoutes');


app.use('/auth', userRoutes);
app.use('/job', jobRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/apply', applicationRoutes);
app.use('/', paymentRoutes);
app.use('/contracts', contractRoutes);

// ===== LANDING PAGE AND AUTH ROUTES =====

// Render the new landing page as the main entry point
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/landing_page.html'));
});

// Render the login page (your current index.html)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ===== EXISTING ROUTES =====

app.get('/role-selection', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/role-selection.html'));
});

// Render the home page => this is the page where the user lands when they are successfully logged in
app.get('/client-home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/client-home.html'));
});

// Render the admin home page
app.get('/admin-home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/admin-dashboard.html'));
});

// Render the profile page of the freelancer
app.get('/profile-user', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/profile-user.html'))
});

// Render the client jobs page
app.get('/client-jobs', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/client-home.html'))
});

// Render the client current jobs page
app.get('/client-current-jobs', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/client-home.html'))
});

// Render the client job contracts page
app.get('/client-contracts', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/client-home.html'))
});

// Render the view freelancer page
app.get('/view-freelancer', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/client-home.html'))
});

// Render the job applicants page
// app.get('/view-applications', (req,res) => {
//   res.sendFile(path.join(__dirname,'../public/pages/jobapplicants.html'))
// });

// Render the job details page
app.get('/job-details', (req,res) => {
  res.sendFile(path.join(__dirname,'../public/pages/single-job-post.html'))
});

// Render the freelancer home page
app.get('/freelancer-home', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/home.html'));
});

// Render the user dashboard
app.get('/freelancer-dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/freelancer-dashboard.html'));
});

// Render the client dashboard
app.get('/client-dashboard',(req,res)=> {
  res.sendFile(path.join(__dirname,'../public/pages/client-dash.html'));
});

// ===== ERROR HANDLING =====

// Render the 404 error page (when the route doesn't exist)
app.get('/error-404', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pages/404.html'));
});

// 404 Handler for unknown routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../public/pages/404.html'));
});

// ===== SERVER STARTUP =====

// MongoDB connection and server start
const db_url = "mongodb+srv://freelance-io-admin:freelance-io-admin@freelanceio-cluster.5hizeeq.mongodb.net/freelanceio-db?retryWrites=true&w=majority&appName=freelanceio-cluster";
mongoose.connect(db_url)
    .then((result) => {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        console.log(`Landing page available at: http://localhost:${port}/`);
        console.log(`Login page available at: http://localhost:${port}/login`);
        console.log(`Register page available at: http://localhost:${port}/register`);
      });
    })
    .catch((err) => console.log(err));

module.exports = app;

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('✅ Health check OK!');
});