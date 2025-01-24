const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Add CORS middleware
app.use(cors());

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // Replace with your MySQL username
  password: 'Pranati@1108', // Your MySQL password
  database: 'hirenest' // Replace with your database name
});

// Check the database connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { companyName, contactNumber, email, address, zipcode, state } = req.body;

    console.log('Received data:', req.body); // Log the incoming request data

    const query = 'INSERT INTO Employers (CompanyName, ContactNumber, Email, Address, Zipcode, State) VALUES (?, ?, ?, ?, ?, ?)';

    // Insert data into the database
    db.query(query, [companyName, contactNumber, email, address, zipcode, state], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error submitting data' });
        }
        console.log('Data inserted successfully:', result);

        // Second task: Sending a confirmation response
        const confirmationMessage = 'Thank you for submitting your details!';
        return res.status(200).json({ message: 'Data submitted successfully', confirmation: confirmationMessage });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
