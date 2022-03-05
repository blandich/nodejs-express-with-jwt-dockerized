const db = require("../../../common/models");
const Sprint = db.sprint;
exports.getAllSprints = (req,res) => {
    Sprint.findAll({ include: ["tasks"]})
        .then(sprint => {
            res.status(200).send({
                data: sprint
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.addSprint = async (req,res) => {
    Sprint.create({
        title: req.body.title,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        userId: req.userId
    })
        .then(sprint => {
            res.status(201).send({
                message: "Sprint successfully added!"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateSprint = async (req,res) => {
    const id = req.params.id;
    Sprint.update(req.body, {
        where: { id: id }
    })
    .then(sprint => {
        res.status(201).send({
            message: "Sprint successfully updated!"
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.deleteSprint = (req, res) => {
    const id = req.params.id;
    Sprint.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Sprint successfuly deleted!"
            });
        }
        else {
            res.status(402).send({
                message: "Sprint deletion unsuccesful!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}