const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const DB_OPTIONS = {
            dbName: "vehicle-management"
        }
        await mongoose.connect(process.env.DATABASE_URL, DB_OPTIONS)
        console.log('Database Connected')
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {connectDB}
