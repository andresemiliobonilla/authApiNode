const { Schema, model } = require("mongoose");

const Campania = new Schema({
  name: String,
  fecha: String,
  cuenta: String,
  calificacion: String,
  observacion: String,
  monto: Number
})

module.exports = model("Campania", Campania )