"use strict";

// Requires
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { SERVER_PORT } = process.env;

const validateAuth = require("./middlewares/validate-auth");
const notFound = require("./middlewares/not-found");
const {
  loginController,
  registerController,
  userController,
} = require("./controllers");

const app = express();

app.use(bodyParser.json());

// Configuración de las rutas
// POST
app.post("/login", loginController.login);
app.post("/register", registerController.register);

// GET
app.get("/user", validateAuth.validateAuth, userController.pikachu);

app.use(notFound.notFound);
app.listen(SERVER_PORT, () => console.log(`Escuchando en ${SERVER_PORT}`));
