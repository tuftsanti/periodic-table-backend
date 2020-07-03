const {Schema, model} = require('mongoose')

const elementSchema = new Schema({
  // element: {
    atomicMass: String,
    atomicNumber: Number,
    atomicRadius: Number,
    boilingPoint: Number,
    bondingType: String,
    cpkHexColor: String,
    density: Number,
    electronAffinity: Number,
    electronegativity: Number,
    electronicConfiguration: String,
    groupBlock: String,
    ionRadius: String,
    ionizationEnergy: Number,
    meltingPoint: Number,
    name: String,
    oxidationStates: String,
    standardState: String,
    symbol: String,
    vanDelWaalsRadius: Number,
    yearDiscovered: Number
  // }
})

const Element = model('element', elementSchema)

module.exports = Element