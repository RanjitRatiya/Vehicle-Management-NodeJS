const express = require('express');
const router = express.Router();

const { addVehicle,getVehicles,updateVehicle, deleteVehicle } = require('../controllers/vehicleController');

const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get("/getvehicle", getVehicles);
router.post("/addvehicle", addVehicle);
router.put("/updatevehicle/:id", updateVehicle);
router.delete("/deletevehicle/:id", deleteVehicle);

module.exports = router