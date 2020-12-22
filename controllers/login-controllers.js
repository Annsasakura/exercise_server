"use strict";

const repository = require("../repositories");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // // Validamos
    const loginSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
    });
    await loginSchema.validateAsync({ email, password });

    // // Buscar al user en la BBDD
    const user = await repository.registerRepository.getUserByEmail(email);
    if (!user) {
      const err = new Error("El usuario no existe");
      err.code = 409;
      throw err;
    }

    // Comprobar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const err = new Error("La contraseña no coincide");
      err.code = 409;
      throw err;
    }

    // generar el jwt
    const tokenPayLoad = { id: user.id, name: user.name };
    const token = jwt.sign(tokenPayLoad, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.send(token);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

module.exports = { login };
