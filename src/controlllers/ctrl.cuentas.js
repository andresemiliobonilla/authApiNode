const ctrlCuentas = {}
const User = require("../models/model.user");
const Campania = require("../models/model.campanias");

ctrlCuentas.postCuenta = async (req, res) => {
  const {id, cuenta, calificacion, observacion, monto } = req.body;
  const user = await User.findById(id);
  const newCampania = new Campania({
    cuenta, 
    calificacion, 
    observacion, 
    monto 
  })
  const saveCuenta = await newCampania.save();
  user.campanias = user.campanias.concat(saveCuenta._id)
  await user.save();
}

ctrlCuentas.getCuenta = async (req, res) => {
  const data = await User.findById(req.params.id).populate("campanias");
  res.json(data.campanias);
  // console.log(data);
}

module.exports = ctrlCuentas;

