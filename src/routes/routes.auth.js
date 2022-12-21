const express = require("express");
const route = express.Router();
const {postLogin, postRegister, updateUserRol} = require("../controlllers/ctrl.auth");

route.post("/login", postLogin);
route.post("/register", postRegister);
route.post("/:id", updateUserRol);

module.exports = route;