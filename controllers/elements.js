////////////////
/// DEPENDENCIES
////////////////
const express = require('express')
const router = express.Router()
const Element = require('../models/elements.js')
// const jwt = require('jsonwebtoken') // Token for later

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