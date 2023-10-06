const asyncHandler = require('express-async-handler')
const Admin = require('../models/adminModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerAdmin = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json('Please add all fields')
    }

    //checking existing admin 
    const adminExists = await Admin.findOne({ email })
    if (adminExists) {
        res.status(400).json('Admin already exists')
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    //create new admin
    const admin = await Admin.create({
        username, email, password: hashedPassword
    })

    if (admin) {
        res.status(201).json({ _id: admin.id, email: admin.email })
    } else {
        res.status(400).json('Invalid Data !!')
    }
})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json('Please add all fields')
    }
    const admin = await Admin.findOne({ email })
    if (admin && (await bcrypt.compare(password, admin.password))) {
        const accessToken = jwt.sign({
            admin: {
                username: admin.username,
                email: admin.email,
                id: admin.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        )
        res.status(200).json({ accessToken })
    } else {
        res.status(400).json('Invalid Credentials !!')
    }
})


const currentAdmin = asyncHandler(async (req, res) => {
    res.json(req.admin)
})
module.exports = {
    registerAdmin,
    loginAdmin,
    currentAdmin
}