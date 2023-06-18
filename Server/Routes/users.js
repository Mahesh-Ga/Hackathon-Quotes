const express = require('express');
const mysql = require('mysql');
const config = require('config');
const appForUsers = express.Router();

var connection = mysql.createConnection(
    {
        host: config.get('HOST'),
        user: config.get('USER'),
        password: config.get('PASSWORD'),
        database: config.get('DATABASE')
    }
);

appForUsers.post("/", (request, response) => {
    connection.query(`INSERT INTO Users(first_name , last_name, email, password , mobile) VALUES('${request.body.firstName}','${request.body.lastName}','${request.body.email}','${request.body.password}','${request.body.mobile}')`, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

appForUsers.get("/", (request, response) => {
    connection.query(`SELECT * FROM Users`, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

appForUsers.put("/:id", (request, response) => {
    connection.query(`UPDATE Users SET first_name = '${request.body.firstName}', last_name = '${request.body.lastName}',email = '${request.body.email}', Address = '${request.body.address}' , mobile = '${request.body.mobile}' WHERE user_id = ${request.params.id}`, (error, result) => {
        if (error == null) {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(result));
        }
        else {
            response.setHeader("Content-Type", "application/json");
            response.write(JSON.stringify(error));
        }
        response.end();
    })
})

module.exports = appForUsers;