const https = require('https');

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
exports.remoteApiCall = (req, response) => {
    https.get('https://jsonplaceholder.typicode.com/users', res => {
        let data = [];
        const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';

        res.on('data', chunk => {
            data.push(chunk);
        });
        
        res.on('end', () => {
            const users = JSON.parse(Buffer.concat(data).toString());
            response.status(200).send({
                data: users
            });
        });
    }).on('error', err => {
        response.status(500).send({ message: err.message});
    });
        // res.status(200).send({message: "emotional damage"});
}