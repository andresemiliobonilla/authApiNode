const db = require("mongoose");
const Role = require("../models/model.roles");

db.connect("mongodb://localhost:27017/crudNode", {
   useNewUrlParser: true,
   useUnifiedTopology: true

})
    .then(() => {
        console.log("db ok");
        initial();
    })
    .catch(err => console.log(err))

function initial(){
    Role.estimatedDocumentCount((err, count) => {
        if(!err & count === 0)
        {
            new Role({
                name: "usuario"
            }).save(err => {
                if(err)
                {
                    console.log("error", err)
                }
                console.log("rol user agregado");
            })

            new Role({
                name: "administrador"
            }).save(err => {
                if(err)
                {
                    console.log("err", err);
                }
                console.log("rol administrador agregado")
            })

            new Role({
                name: "moderador"
            }).save(err => {
                if(err)
                {
                    console.log("error", err);
                }
                console.log("rol moderador agregado");
            })
        }
    })
}


module.exports = db;

