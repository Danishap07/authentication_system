require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const connection = require('./config/dbConnection');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 8000

app.use('/api', routes);

connection.connect(async(err) => {
    if(err) {
        console.log("Database conection failed!" +err.message);
    }
    else {
        console.log("Database connected successfully!")
        app.listen(process.env.PORT || port, () => {console.log(`Server is listening at port: ${process.env.PORT || port}`);});
    }
})
