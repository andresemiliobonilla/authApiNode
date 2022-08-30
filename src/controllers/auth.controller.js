const User = require('../models/User');
const authCtrl = {};
const bcrypt = require('bcryptjs');

authCtrl.postRegister = async (req, res) => {
    const {user, email, pass} = req.body;
    const codePass = await bcrypt.hashSync(pass, 8);
    const newUser = await  new User({
        user,
        email,
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
    res.json({message: "registrado"})
}

module.exports = authCtrl;

