const dbConnection = require('../../config/dbConnection');

const getContacts = (req, res) => {
    const query = "SELECT `id`, `fullname`, `email`, `message`, `date` FROM `contacted_mails` WHERE 1 ORDER BY `id` DESC;";
    dbConnection.query(query, (err, result) => {
        try {
            console.log("first", result)
            return res.status(200).json({status: true, message: result});
        }
        catch (err) {
            return res.status(500).json({status: false, message: err.message});
        }
    })
}

module.exports = getContacts