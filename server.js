require("dotenv").config({ path: "./config.env" });
const express = require('express');
const app = express();
const db = require('./config/db');

//connect DB
db;
 
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));