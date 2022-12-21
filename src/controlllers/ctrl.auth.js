const User = require('../models/model.user');
const Role = require("../models/model.roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ctrlAuth = {};

ctrlAuth.postRegister = async(req, res) => {
    const {name, user, email, password} = req.body;
    const veryUser = await User.findOne({user});
    if(veryUser)
    {
        return res.status(400).send({message: "usuario ya existe"})
    }
    const veryEmail = await User.findOne({email})
    if(veryEmail)
    {
        return res.status(400).send({message: "email ya existe"})
    }
    const stl = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, stl);
    const newUser = new User({
        name,
        user,
        email,
        password: hash
    });
    newUser.save(err => {
        if(err)
        {
            return res.status(500).send({message: "error al guardar"})
        }
        if(req.body.roles)
        {
            Role.find({name: {$in: req.body.roles}}, (err, roles) => {
                if(err)
                {
                    res.status(500).send({message: err});
                    return;
                }

                newUser.roles = roles.map(role => role._id);
                newUser.save(err => {
                    if(err)
                    {
                        res.status(500).send({message: err});
                        return;
                    }
                    res.send({message: "Rol registrado segun req.body"})
                })
            })
        }
        else{
            Role.findOne({name: "usuario"}, (err, role) => {
                if(err)
                {
                    res.status(500).send({message: err});
                }
                newUser.roles = [ role._id ];
                newUser.save(err => {
                    if(err)
                    {
                        return res.status(500).send({message: err});
                    }
                    res.send({message: "user registrado como usuarioComun"})
                })
            })
        }
    }) 
}

ctrlAuth.postLogin = async (req, res) => {
    const {user, password} = req.body;
    const veriUser = await User.findOne({user}).populate("roles", "-__v");
    if(!veriUser)
    {
        return res.status(500).send({message: "el usuario no existe"})
    }
    const veryPass = await bcrypt.compare(password, veriUser.password);
    if(!veryPass)
    {
        return res.status(500).send({message: "la clave es incorrecta"})
    }
    const token = jwt.sign({id: veriUser.id, user: veriUser.user}, "clavePrivada", {
        expiresIn: 86400 //24hs
    });

    var autorizacion = [];

    for(let i = 0; i < veriUser.roles.length; i++)
    {
        autorizacion.push("ROLE_" + veriUser.roles[0].name.toUpperCase());
    }
    
    res.status(200).send({
        usuario: veriUser.user,
        email: veriUser.email,
        myToken: token,
        role: autorizacion
    })
}

ctrlAuth.updateUserRol = async (req, res) => {
    const {id} = req.body;
    // const userRol = await User.findById(req.params.id).populate("roles")
    // const idRol = userRol.roles[0].id;
    const putIdRole = await User.findByIdAndUpdate(req.params.id, {
        roles: id
    })
    if(putIdRole)
    {
        res.json({message: "usuario actualizado"});
    }
    else{
        res.json({message: "error al actualizarse"});
    }
    
}

module.exports = ctrlAuth;