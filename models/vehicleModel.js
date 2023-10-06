const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    admin_id:{type:mongoose.Schema.Types.ObjectId,ref:'Admin',required:true},
    vehicleID: { type: Number, required: true, unique: true },
    vehicleCompany: { type: String, required: true },
    manufactureYear: { type: Number, required: true },
    color: { type: String, required: true },
    milage: { type: Number, required: true }
})

module.exports = mongoose.model('Vehicle', vehicleSchema)