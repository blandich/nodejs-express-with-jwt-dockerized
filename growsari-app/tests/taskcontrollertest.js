const supertest = require('supertest');
const app = require('../server');
const db = require('../src/common/models');
const Sprint = db.sprint;
const Task = db.task;

describe('Testing task endpoints', function () {
    
    it('todolist/all with no token responds with valid HTTP status, description, and message', function (done) {
        supertest(app).get('/api/todolist/all').expect(403, done);
    });

    it('todolist/create responds with valid HTTP status, description, and message', function () {
        //Make POST Request
        const sprint = Sprint.create({
            title: "sample sprint",
            start_date: "2021-10-31",
            end_date: "2022-10-31"
        });
        supertest(app).post(`/api/sprint/${sprint.id}/todolist/create`).send({
            description: "sample description"
        }).expect(201);
    });

    it('todolist/update responds with valid HTTP status, description, and message', function () {
        //Make UPDATE Request
        const task = Task.create({
            description: "sample description"
        });

        supertest(app).put('/api/todolist/update/' + task.id).send({
            title: "updated task"
        }).expect(201);
    });

    it('todolist/delete responds with valid HTTP status, description, and message', function () {
        //Make DELETE Request
        const task = Task.create({
            description: "sample description"
        });

        supertest(app).delete('/api/todolist/delete/' + task.id).expect(200);
    });
});