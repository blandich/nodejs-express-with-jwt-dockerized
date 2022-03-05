const db = require("../../../common/models");
const User = db.user;
const Comment = db.comment;
exports.getAllComments = (req,res) => {
    Comment.findAll()
        .then(comment => {
            res.status(200).send({
                data: comment
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.addComment = async (req,res) => {
    Comment.create({
        content: req.body.content,
        taskId: req.params.taskId
    })
        .then(comment => {
            res.status(201).send({
                message: "Comment successfully added!"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateComment = async (req,res) => {
    const id = req.params.id;
    Comment.update(req.body, {
        where: { id: id }
    })
    .then(comment => {
        res.status(201).send({
            message: "Comment successfully updated!"
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.deleteComment = (req, res) => {
    const id = req.params.id;
    Comment.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Comment successfuly deleted!"
            });
        }
        else {
            res.status(402).send({
                message: "Comment deletion unsuccesful!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}