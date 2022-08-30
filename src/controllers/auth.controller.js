const User = require('../models/User');
const authCtrl = {};

authCtrl.postRegister = async (req, res) => {
    const {user, email, pass} = req.body;
    const newUser = await  new User({
        user,
        email,
        pass
    })
    await newUser.save((err, res) => {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("registrad")
        }
    });
}

authCtrl.postLogin = async (req, res) => {
    const {user, pass} = req.body;
    const veriUser = await User.findOne({user});
    if(!veriUser)
    {
        res.json({message: "no existe el usuario"})
    }
    const veriPass = await User.findOne({pass});
    if(!veriPass)
    {
        res.json({message: "pass invalido"})
    }
    res.json({message: "inicio de sesion"})
}

module.exports = authCtrl;

