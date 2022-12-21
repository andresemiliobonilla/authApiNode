const {Schema, model} = require("mongoose");

const User = new Schema({
    user: String,
    email: String,
    password: String,
    roles: [
        {
            type: Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})

module.exports = model("User", User);