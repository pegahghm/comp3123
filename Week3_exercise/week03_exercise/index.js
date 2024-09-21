var http = require("http");
// Use Employee Module here
const employees = require('./Employee');
console.log("Lab 03 - NodeJs");

// Define Server Port
const port = process.env.PORT || 8082;

// Create Web Server using CORE API
const server = http.createServer((req, res) => {
    // Set default Content-Type as JSON for all routes unless otherwise specified
    res.setHeader('Content-Type', 'application/json');

    if (req.method !== 'GET') {
        res.statusCode = 405; // Method Not Allowed
        res.end(JSON.stringify({ error: http.STATUS_CODES[405] }));
    } else {
        if (req.url === '/') {
            // Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end("<h1>Welcome to Lab Exercise 03</h1>");
        } else if (req.url === '/employee') {
            res.statusCode = 200; // OK
            res.end(JSON.stringify(employees, null, 2)); // Pretty print JSON
        } else if (req.url === '/employee/names') {
            const names = employees.map(e => `${e.firstName} ${e.lastName}`).sort();
            res.statusCode = 200;
            res.end(JSON.stringify(names, null, 2)); // Pretty print JSON
        } else if (req.url === '/employee/salary') {
            // Calculate total salary
            const totalSalary = employees.reduce((sum, e) => sum + e.Salary, 0);
            res.statusCode = 200;
            res.end(JSON.stringify({ "total_salary": totalSalary }, null, 2)); // Pretty print JSON
        } else {
            res.statusCode = 404; // Not Found
            res.end(JSON.stringify({ error: http.STATUS_CODES[404] }));
        }
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
