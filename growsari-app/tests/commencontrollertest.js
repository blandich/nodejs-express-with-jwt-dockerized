const supertest = require('supertest');
const app = require('../server');
const db = require('../src/common/models');
const Task = db.task;
const Comment = db.comment;

describe('Testing comment endpoints', function () {
    
    it('comment/all with no token responds with valid HTTP status, description, and message', function (done) {
        supertest(app).get('/api/comment/all').expect(403, done);
    });

    it('comment/create responds with valid HTTP status, description, and message', function () {
        //Make POST Request
        const task = Task.create({
            description: "sample description"
        });
        supertest(app).post(`/api/todolist/${task.id}/comment/create`).send({
           content : "sample comment content"
        }).expect(201);
    });

    it('comment/update responds with valid HTTP status, description, and message', function () {
        //Make UPDATE Request
        const comment = Comment.create({
            content: "sample comment"
        });

        supertest(app).put('/api/comment/update/' + comment.id).send({
            title: "updated comment"
        }).expect(201);
    });

    it('comment/delete responds with valid HTTP status, description, and message', function () {
        //Make DELETE Request
        const comment = Comment.create({
            content: "sample comment"
        });

        supertest(app).delete('/api/comment/delete/' + comment.id).expect(200);
    });
});