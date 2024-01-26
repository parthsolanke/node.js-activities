const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

// Middleware to parse query parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle GET requests
app.get('/data', (req, res) => {
  const fileName = req.query.n;
  const lineNumber = req.query.m;

  if (!fileName) {
    return res.status(400).send('Missing file name (n) in the query parameters');
  }

  const filePath = `./tmp/data/${fileName}.txt`;

  if (lineNumber) {
    // Read specific line from the file
    const content = readSpecificLine(filePath, lineNumber);
    return res.json({
        Response: content
    });
  } else {
    // Read entire file content
    const content = fs.readFileSync(filePath, 'utf-8');
    return res.json({
        Response: content
    });
  }
});

// Function to read a specific line from a file
function readSpecificLine(filePath, lineNumber) {
  const data = fs.readFileSync(filePath, 'utf-8').split('\n');
  return data[lineNumber - 1] || 'Line number out of range';
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
