const User = require("../models/model.user");
const ctrlCrud = {};

ctrlCrud.getUsers = async (req, res) => {
    const listUser = await User.find().populate("roles");
    if(listUser)
    {
        res.json({message: listUser})
    }
    else{
        res.json({message: "no hay usuarios"})
    }
}

ctrlCrud.getUser = async (req, res) => {
    const oneUser = await User.findById(req.params.id);
    if(oneUser)
    {
        res.json({message: oneUser})
    }
    else{
        res.json({message: "no hay usuario"})
    }

}

// ctrlCrud.postUser = (req, res) => {
//     const {name, user, email, password} = req.body;
//     const newUser = new User({
//         name,
//         user,
//         email,
//         password
//     });
//     newUser.save((err) => {
//         if(err)
//         {
//             res.json({message: err})
//         }
//         else{
//             res.json({message: "registrado"})
//         }
//     })
// }

ctrlCrud.updateUser = async (req, res) => {
    const {user, email, password} = req.body;
    const putUser = await User.findByIdAndUpdate(req.params.id, {
        user,
        email,
        password
    })
    if(putUser)
    {
        res.json({message: "usuario actualizado"});
    }
    else{
        res.json({message: "error al actualizarse"});
    }
}

ctrlCrud.deleteUser = async (req, res) => {
    const delUser = await User.findByIdAndDelete(req.params.id);
    if(delUser)
    {
        res.json({message: "usuario eliminado"});
    }
    else{
        res.json({message: "error al eliminarse"});
    }
}

module.exports = ctrlCrud;