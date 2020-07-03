////////////////
/// DEPENDENCIES
////////////////
const express = require('express')
const router = express.Router()
const Element = require('../models/elements.js')
// const jwt = require('jsonwebtoken') // Token for later

////////SEED ROUTE
// router.get('/seed', (req,res) => {
//     Element.create([
//       {
//       "atomicMass": "1.00794(4)",
//       "atomicNumber": 1,
//       "atomicRadius": 37,
//       "boilingPoint": 20,
//       "bondingType": "diatomic",
//       "cpkHexColor": "FFFFFF",
//       "density": 0.0000899,
//       "electronAffinity": -73,
//       "electronegativity": 2.2,
//       "electronicConfiguration": "1s1",
//       "groupBlock": "nonmetal",
//       "ionRadius": "",
//       "ionizationEnergy": 1312,
//       "meltingPoint": 14,
//       "name": "Hydrogen",
//       "oxidationStates": "-1, 1",
//       "standardState": "gas",
//       "symbol": "H",
//       "vanDelWaalsRadius": 120,
//       "yearDiscovered": 1766
//       },
//       {
//       "atomicMass": "4.002602(2)",
//       "atomicNumber": 2,
//       "atomicRadius": 32,
//       "boilingPoint": 4,
//       "bondingType": "atomic",
//       "cpkHexColor": "D9FFFF",
//       "density": 0.0001785,
//       "electronAffinity": 0,
//       "electronegativity": "",
//       "electronicConfiguration": "1s2",
//       "groupBlock": "noble gas",
//       "ionRadius": "",
//       "ionizationEnergy": 2372,
//       "meltingPoint": "",
//       "name": "Helium",
//       "oxidationStates": "",
//       "standardState": "gas",
//       "symbol": "He",
//       "vanDelWaalsRadius": 140,
//       "yearDiscovered": 1868
//       }
//     ], (error, newElements) => {
//         res.redirect('/elements')
//     })
//   })
  

// // ANDY Auth Middleware
// const auth = (req, res, next) => {
//     try {
//         let token = req.headers.authorization
//         if (!token) {
//             return res.status(401).json({msg: "No token"})
//         }
//         token = token.split(' ')[1]
//         const verified = jwt.verify(token, process.env.jwtSECRET)
//         if (!verified) {
//             return res.status(401).json({msg: "Not verified"})
//         }
//         // console.log(verified)
//         req.user = verified
//         next();
//     }   
//     catch (error) {
//         res.status(500).json({error: error.message})
//     }
// }

////////////////
/// ROUTES
////////////////

////Create Route////
router.post('/', async (req, res) => {
    try {
        const newElement = {...req.body}
        // console.log(newElement)
        const createdElement = await Element.create(newElement)
        res.status(200).json(createdElement)
    } catch(error) {
        res.status(400).json(error)
    }
})

////Read Route////
router.get('/', async (req, res) => {
    try {
        const elements = await Element.find({})
        res.status(200).json(elements)
    } catch(error){
        res.status(400).json(error)
    }
})

////Delete Route////
// router.delete('/:id', auth, async (req, res) => {
//     try {
//         const deletedElement = await Element.findByIdAndDelete(req.params.id)
//         res.status(200).json(deletedElement)
//     } catch(error) {
//         res.status(400).json(error)
//     }
// })

////Update Route////
// router.put('/:id', auth, async (req, res) => {
//     try {
//         const updatedElement = await Element.findByIdAndUpdate(
//             req.params.id,
//             req.body
//         )
//         res.status(200).json(updatedElement)
//     } catch(error) {
//         res.status(400).json(error)
//     }
// })

module.exports = router