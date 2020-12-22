"use strict";

function pikachu(req, res) {
  try {
    res.send(
      "jajajaja, pensabas que iban a salir pokemons de una API. Me vendría bien una tutoría para las APIs"
    );
  } catch (err) {
    if (err.name === "ValidatioError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ err: err.message });
  }
}

module.exports = { pikachu };
