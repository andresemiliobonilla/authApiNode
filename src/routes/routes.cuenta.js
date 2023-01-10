const express = require("express");
const {postCuenta, getCuenta} = require("../controlllers/ctrl.cuentas");
const route = express.Router();

route.post("/", postCuenta)
route.get("/:id", getCuenta)

module.exports = route;