"use strict";
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

function validateAuth(req, res, next) {
  try {
    const token = req.headers.authorization;
    const decodeToken = jwt.verify(token, JWT_SECRET);
    console.log(decodeToken);
    const { id, nombre, rol } = decodeToken;

    req.auth = { id, nombre, rol };
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send("Necesitas loggearte para acceder a esta ruta");
  }
}

module.exports = { validateAuth };
