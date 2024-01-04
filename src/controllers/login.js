const dbConnection = require('../config/dbConnection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function login(req, res) {
    const { email, password } = req.body;

    dbConnection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email' });
        } else {
            // console.log(results);
            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password)
            // console.log(user.password, isPasswordValid); 
            

            if (isPasswordValid) {
                const token = jwt.sign({ id: user._id }, 'jwt_secret', { expiresIn: '10y' });
                res.status(200).json({ status: true, message: "Login Successful", token: token,  });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        }
    });
}

const refreshToken = (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });

    }
    try {
        const decoded = jwt.verify(token, 'jwt_secret');
        const userId = decoded.id;
        const newToken = jwt.sign({ id: userId }, 'jwt_secret', { expiresIn: '10y' });
        res.status(200).json({ token: newToken });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
    
}


module.exports = {login, refreshToken};