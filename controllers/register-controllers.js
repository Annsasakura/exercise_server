"use strict";

const Joi = require("joi");
const repository = require("../repositories");
const bcrypt = require("bcryptjs");

async function register(req, res) {
  try {
    const registerSchema = Joi.object({
      nombre: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(16).required(),
      repeatPassword: Joi.ref("password"),
    });
    await registerSchema.validateAsync(req.body);

    const { nombre, email, password } = req.body;

    // Comprobar si existe el usuario
    const user = await repository.registerRepository.getUserByEmail(email);
    if (user) {
      const err = new Error("Ya existe un usuario con este email");
      err.code = 409;
      throw err;
    }

    // Encriptar contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Insertar en BBDD

    const id = await repository.registerRepository.createUser(
      nombre,
      email,
      passwordHash
    );

    res.send({ userId: id });
  } catch (err) {
    if (err.name === "ValidatioError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

module.exports = { register };
