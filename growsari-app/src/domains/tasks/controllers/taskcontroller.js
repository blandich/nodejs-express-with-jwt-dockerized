const db = require("../../../common/models");
const User = db.user;
const Task = db.task;
exports.getAllTasks = (req,res) => {
    Task.findAll({ include: ["comments"]})
        .then(task => {
            res.status(200).send({
                data: task
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.addTask = async (req,res) => {
    const priority = await Task.max("priority");
    Task.create({
        description: req.body.description,
        priority: priority + 1,
        sprintId: req.params.sprintId
    })
        .then(task => {
            res.status(201).send({
                message: "Task successfully added!"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

exports.updateTask = async (req,res) => {
    const id = req.params.id;
    const previousVerTask = await Task.findByPk(id);
    const maxPrio = await Task.max("priority");
    const prevPrio = previousVerTask.priority;
    if (req.body.priority > maxPrio) {
        res.status(402).send({
            message: "Failed! You can't move beyond max priority"
        });
    }
    else if (req.body.priority == maxPrio) {
        res.status(402).send({
            message: "Failed! Please choose a different priority"
        });
    }
    else {
        Task.update(req.body, {
            where: { id: id }
        })
        .then(task => {
            res.status(201).send({
                message: "Task successfully updated!"
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    }
}

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.status(200).send({
                message: "Task successfuly deleted!"
            });
        }
        else {
            res.status(402).send({
                message: "Task deletion unsuccesful!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}