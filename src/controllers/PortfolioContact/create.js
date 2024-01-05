const dbConnection = require('../../config/dbConnection');

const createContact = (req, res) => {
    const { fullname, email, message }  = req.body
    console.log(req.body)

    if(!fullname || !email || !message) {
        return res.status(400).json({ status: false, message: "All fields are required."})
    } 

    const query = `INSERT INTO contacted_mails (fullname, email, message) VALUES ('${fullname}', '${email}', '${message}')`

    dbConnection.query(query, (err, result) => {
        if (err) {
            console.log(err)
            res.status(401).json({ status: false, message: err.message})
        }
        else {
            res.status(200).json({ status: true, message: "Mail successfully added"})
        }
    });
}

module.exports = createContact