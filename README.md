# nodejs-express-with-jwt-dockerized
A node.js app, built using express, which exposes APIs which has a security layer (jwt).
This codebase follows the Domain Driven Design.

Libraries used:
- dotenv
- jsonwebtoken
- supertest
- mocha
- mysql
- sequelize
- bcryptjs
- express
- cors

Clone the repository and in the root folder and issue:
`docker-compose build --no-cache`
`docker-compose up --force-recreate`

Exposed APIs
 - User Endpoints
   - POST http://localhost:6868/api/auth/signup
     - requestbody should include username, password, email, and roles (admin, moderator, user)
     - {"username": "blandich", "password": "12345678", "roles": ["admin"]}
   - POST http://localhost:6868/api/auth/signin
     - requestbody should include username, password
     - {"username": "blandich", "password": "12345678"}
     - response would include accesstoken to be used as a request header for other requests as x-access-token
 - Sprint Endpoints
   - GET http://localhost:6868/api/sprint/all
   - POST http://localhost:6868/api/sprint/create
     - requestbody should include title, start_date, end_date
     - {"title": "sample title", "start_date": "2021-10-31", "end_date": "2022-10-31"}
     - response would be sprint successfully added if successful
   - PUT http://localhost:6868/api/sprint/update/${sprintId}
     - requestbody may include all of the three fields
     - response would be sprint successfully updated if successful
   - DELETE http://localhost:6868/api/sprint/delete/${sprintId}
     - response would be sprint successfully deleted if successful
 - Task Endpoints
   - GET http://localhost:6868/api/todolist/all
   - POST http://localhost:6868/api/sprint/${sprintId}/todolist/create
     - requestbody should include description
     - {"description": "sample description"}
     - response would be task successfully added if successful
   - PUT http://localhost:6868/api/todolist/update/${taskId}
     - requestbody should include description field
     - response would be task successfully updated if successful
   - DELETE http://localhost:6868/api/todolist/delete/${taskId}
     - response would be task successfully deleted if successful
 - Comment Endpoints
   - GET http://localhost:6868/api/comment/all
   - POST http://localhost:6868/api/todolist/${taskId}/comment/create
     - requestbody should include content
     - {"content": "sample content"}
     - response would be comment successfully added if successful
   - PUT http://localhost:6868/api/comment/update/${commentId}
     - requestbody should include comment field
     - response would be comment successfully updated if successful
   - DELETE http://localhost:6868/api/comment/delete/${commentId}
     - response would be comment successfully deleted if successful
 - Trial Endpoints (remote api call)
   - GET http://localhost:6868/api/trial/remoteapicall
 
 
To issue unit tests, after issuing docker-compose up, 
access the container that runs the app:
`docker exec -it growsari-node-jwt_app_1 bash`

`npm test`
