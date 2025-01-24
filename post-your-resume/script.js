const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());

// Add CORS middleware
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pranati@1108',
  database: 'hirenest'
});

// Check the database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle form submission for Applications
app.post('/submit-application', (req, res) => {
    const { name, skills, location, experience } = req.body;

    console.log('Received application data:', req.body); // Log the incoming request data

    const query = 'INSERT INTO Applications (Name, Skills, Location, Experience) VALUES (?, ?, ?, ?)';

    db.query(query, [name, skills, location, experience], (err, result) => {
        if (err) {
            console.error('Error inserting application data:', err);
            return res.status(500).json({ message: 'Error submitting application data' });
        }
        console.log('Application data inserted successfully:', result);

        const confirmationMessage = 'Thank you for submitting your application!';
        return res.status(200).json({ message: 'Application data submitted successfully', confirmation: confirmationMessage });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

