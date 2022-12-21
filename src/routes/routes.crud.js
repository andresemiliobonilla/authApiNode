const express = require("express");
const route = express.Router();
const { getUser, getUsers, deleteUser, updateUser, postUser} = require('../controlllers/ctrl.crud');
const {verifyUser, isAdmin} = require("../middlewares/auth");


route.get("/",[verifyUser], getUsers);
route.get("/:id",[verifyUser], getUser);
route.delete("/:id",[verifyUser], deleteUser);
route.put("/:id",[verifyUser], updateUser);
// route.post("/", postUser);

module.exports = route;