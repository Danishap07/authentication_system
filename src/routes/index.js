const express = require('express');
const signup = require('../controllers/signup');
const {login, refreshToken} = require('../controllers/login');
const createContact = require('../controllers/PortfolioContact/create');
const getContacts = require('../controllers/PortfolioContact/read');
const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Hello World');
})

router.route('/signup').post(signup);

router.route('/login').post(login);

router.route('/refresh-token').post(refreshToken);

router.route('/contact')
                    .post(createContact)
                    .get(getContacts)

module.exports = router;