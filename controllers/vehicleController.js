const asyncHandler = require('express-async-handler')
const Vehicle = require('../models/vehicleModel')

const getVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find({ admin_id: req.admin.id })
  res.json(vehicles)
})

const addVehicle = asyncHandler(async (req, res) => {
  const { vehicleID, vehicleCompany, manufactureYear, color, milage } = req.body
  if (!vehicleID || !vehicleCompany || !manufactureYear || !color || !milage) {
    res.status(400).json('Please add all fields')
  }

  const vehicle = await Vehicle.create({
    vehicleID, vehicleCompany, manufactureYear, color, milage, admin_id: req.admin.id
  })
  console.log(vehicle)
  res.status(200).json(vehicle)
})

const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)
  if (!vehicle) {
    res.status(400).json('Vehicle not found')
  }
  if (vehicle.admin_id.toString() !== req.admin.id) {
    res.status(401).json('Admin not Authorized !!')
  }
  const updateVehicle = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body, {
    new: true
  })
  res.status(200).json(updateVehicle)
})

const deleteVehicle = asyncHandler(async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id)
  if (!vehicle) {
    res.status(400).json('Vehicle not found')
  }

  await Vehicle.deleteOne({ _id: req.params.id });
  res.status(200).json(vehicle);
})


module.exports = {
  getVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle
}