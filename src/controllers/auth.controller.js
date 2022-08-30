const User = require('../models/User');
const authCtrl = {};
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.secret')

authCtrl.postRegister = async (req, res) => {
    const codePass = await bcrypt.hashSync(req.body.pass, 8);
    const newUser = await  new User({
        user: req.body.user,
        email: req.body.email,
        pass: codePass
    })
    await newUser.save((err, res) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("registrado");
        }
    });
}

authCtrl.postLogin = async (req, res) => {
    const user = await User.findOne({user : req.body.user});
    if(!user)
    {
        res.json({message: "no existe el usuario"});
    }
    const veriPass = bcrypt.compareSync(
        req.body.pass,
        user.pass
    )
    if(!veriPass)
    {
        res.json({message: "pass invalido"});
    }
    const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 3600
    })
    res.status(200).send({
        id: user._id,
        user: user.user,
        email: user.email,
        pass: user.pass,
        token: token
    })
}

module.exports = authCtrl;

