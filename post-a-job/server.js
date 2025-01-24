const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an Express app
const app = express();

// Use body-parser to parse incoming JSON requests
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS) from the current directory
app.use(express.static(__dirname));

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Pranati@1108', // Your MySQL password
  database: 'hirenest' // Replace with your actual database name
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Handle form submission (POST request)
app.post('/submit', (req, res) => {
  const { companyName, contactNumber, email, address, zipcode, state } = req.body;

  // Check if CompanyName is provided
  if (!companyName) {
    return res.status(400).json({ error: 'CompanyName is required.' });
  }

  // SQL query to insert data
  const query = 'INSERT INTO Employers (CompanyName, ContactNumber, Email, Address, Zipcode, State) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [companyName, contactNumber, email, address, zipcode, state];

  // Execute the query
  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    res.status(200).json({ message: 'Data inserted successfully', result });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
