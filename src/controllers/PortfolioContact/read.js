const dbConnection = require('../../config/dbConnection');

const getContacts = (req, res) => {
    const query = `SELECT * FROM contacted_mails`
    dbConnection.query(query, (err, result) => {
        try {
            return res.status(200).json({status: true, message: result});
        }
        catch (err) {
            return res.status(500).json({status: false, message: err.message});
        }
    })
}

module.exports = getContacts