const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;
const path=require('path')
// Create a MySQL connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'cart',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connect to the database
db.query('SELECT * FROM items', (err, results) => {
    if (err) {
        console.error('Error executing query:', err);
        return;
    }
    console.log('Query results:', results);
});

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the HTML form
//Routes
app.get('/', (req, res) => {
    res.render('index')
});
app.get('/cart', (req, res) => {
    res.render('cart')
});
app.get('/checkout', (req, res) => {
    res.render('checkout')
});
// Route to handle form submission
app.post('/save', (req, res) => {
    //const message = req.body.message;
    //const {item_apple,item_pear,item_milk,item_bread,price_apple,price_pear,price_milk,price_bread,}=req.body;
    const{name,price}=req.body;
        const sql = `INSERT INTO items (product_name,price) VALUES ('${name}','${price}')`;
        db.query(sql, [name,price], (err, result) => {
            if (err) {
                console.error('Error saving message:', err);
                res.status(500).send('Error saving message');
            } else {
                console.log('Message saved successfully');
                res.redirect('/');
            }
        });
    
    // Insert data into the table (adjust table and column names)
    
});



// Start the server
app.listen(port, () => {
    console.log(`Server running at [http://localhost:${port}](http://localhost:${port})`);
});
