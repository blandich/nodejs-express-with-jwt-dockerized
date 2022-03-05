const supertest = require('supertest');
const app = require('../server');

describe('Testing auth endpoints', function () {
    it('auth/signup responds with valid HTTP status, description, and message', function () {
        //Make POST Request
        supertest(app).post('/api/auth/signup').send({
            username: "username",
            password: "trialpassword",
            email: "trialemail@yahoo.com",
            roles: ["admin"]
        }).expect(200);
    });

    it('auth/signin responds with valid HTTP status, description, and message', function () {
        //Make POST Request
        supertest(app).post('/api/auth/signup').send({
            username: "username",
            password: "trialpassword",
            email: "trialemail234@yahoo.com",
            roles: ["admin"]
        }).expect(200);

        supertest(app).post('/api/auth/signin').send({
            username: "username",
            password: "trialpassword"
        }).expect(200);
    });
});