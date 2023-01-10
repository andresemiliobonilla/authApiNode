const express = require('express');
const app = express();
const routeCrud = require('./routes/routes.crud');
const routeAuth = require("./routes/routes.auth");
const routeCuenta = require("./routes/routes.cuenta");
const cors = require("cors");
require("./dataBase/db");

app.set('port', 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use("/crud", routeCrud);
app.use("/auth", routeAuth);
app.use("/cuentas", routeCuenta);


app.listen(app.get('port'), () => {
    console.log('port', app.get('port'))
})  
