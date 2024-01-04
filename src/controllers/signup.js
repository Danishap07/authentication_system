const dbConnection = require('../config/dbConnection');
const bcrypt = require('bcryptjs');

async function signup(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if(!email) {
        res.status(401).json({status:false, message: 'Email is required.'})
    }
    else if(!password) {
        res.status(401).json({status:false, message: 'Password is required.'})
    }
    else if(!firstname) {
        res.status(401).json({status:false, message: 'Firstname is required.'})
    }
    else if(!lastname) {
        res.status(401).json({status:false, message: 'Lastname is required.'})
    }
    else if(!email.includes('@')) {
        res.status(401).json({status:false, message: 'Invalid email.'})
    }
    else if(password.length < 8) {
        res.status(401).json({status:false, message: 'Password must be atleast 8 characters.'})
    }
    else if(password.length > 20) {
        res.status(401).json({status:false, message: 'Password must be less than 20 characters.'})
    }
    else if(firstname.length > 20) {
        res.status(401).json({status:false, message: 'Firstname must be less than 20 characters.'})
    }
    
    // const salt = bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, 10)
    console.log(hash);
    const sql = `INSERT INTO users (email, password, firstname, lastname) VALUES ('${email}', '${hash}', '${firstname}', '${lastname}')`;
    dbConnection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error creating user');
        } else { 
            res.status(201).send('User created successfully');
        }
    });
}

module.exports = signup;