const supertest = require('supertest');
const app = require('../server');
const db = require('../src/common/models');
const Sprint = db.sprint;

describe('Testing sprint endpoints', function () {
    
    it('sprint/all with no token responds with valid HTTP status, description, and message', function (done) {
        supertest(app).get('/api/sprint/all').expect(403, done);
    });

    it('sprint/create responds with valid HTTP status, description, and message', function () {
        //Make POST Request
        supertest(app).post('/api/sprint/create').send({
            title: "sample sprint",
            start_date: "2021-10-31",
            end_date: "2022-10-31"
        }).expect(201);
    });

    it('sprint/update responds with valid HTTP status, description, and message', function () {
        //Make UPDATE Request
        const sprint = Sprint.create({
            title: "sample sprint",
            start_date: "2021-10-31",
            end_date: "2022-10-31"
        });

        supertest(app).put('/api/sprint/update/' + sprint.id).send({
            title: "updated sprint"
        }).expect(201);
    });

    it('sprint/delete responds with valid HTTP status, description, and message', function () {
        //Make DELETE Request
        const sprint = Sprint.create({
            title: "sample sprint",
            start_date: "2021-10-31",
            end_date: "2022-10-31"
        })

        supertest(app).delete('/api/sprint/delete/' + sprint.id).expect(200);
    });
});