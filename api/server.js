const express = require("express");
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!

const ProjectRouter = require("./projects/projects-router");
const ActionsRouter = require("./actions/actions-router");

server.use(express.json());

//Router Middleware
server.use(`/api/projects`, ProjectRouter);
server.use(`/api/actions`, ActionsRouter);

module.exports = server;
