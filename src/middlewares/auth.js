const jwt = require("jsonwebtoken");
const User = require("../models/model.user");
const Role = require("../models/model.roles");

const verifyUser = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token)
    {
        return res.json({message: "no hay token"})
    }
    jwt.verify(token, "clavePrivada", (err, decoded) => {
        if(err)
        {
            return res.status(401).send({message: "error en el token"})
        }
        req.userId = decoded.id;
        next();
    })
}

const isAdmin = (req, res, next) => {
    
    User.find(req.userId).exec((err, user) => {
        if(err)
        {
            return res.status(500).send({ message: err});
        }
        
        Role.find({}, (err, roles) => {
            if(err)
            {
                return res.status(500).send({message: err});
            }
            for(let i = 0; i < roles.length; i++)
            {
                if(roles[0].name === "admin")
                {
                    next();
                    return;
                }
            }
        })

    })
}

const isModerador = (req, res, next) => {
    User.find(req.userId).exec((err, user) => {
        if(err)
        {
            return res.status(500).send({ message: err});
        }
        
        Role.find({}, (err, roles) => {
            if(err)
            {
                return res.status(500).send({message: err});
            }
            for(let i = 0; i < roles.length; i++)
            {
                if(roles[0].name === "moderador")
                {
                    next();
                    return;
                }
            }
        })

    })
}

module.exports = {
    verifyUser,
    isAdmin,
    isModerador
};