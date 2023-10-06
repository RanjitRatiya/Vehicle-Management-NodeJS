const {connectDB} = require('./config/dbConnection');
const express = require('express')
// const vehicleRoutes = require('./routes/vehicleRoutes')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

//database connection
connectDB()

const app = express()
app.use(express.json())

//vehicle route
app.use('/api/vehicle',require('./routes/vehicleRoutes'))

//admin route
app.use('/api/user',require('./routes/adminRoutes'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
