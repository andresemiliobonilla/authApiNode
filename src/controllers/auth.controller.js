const authCtrl = {};

authCtrl.postRegister = (req, res) => {
    const {user, email, pass} = req.body;
    res.json({user, email, pass})
}

authCtrl.postLogin = (req, res) => {
    const {user, pass} = req.body;
    res.json({user, pass})
}

module.exports = authCtrl;

