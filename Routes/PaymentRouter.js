/** @format */

const express = require("express");
const router = express.Router();

const paymentcontroller = require('../controller/paymentcontroller')

router.post('/pay',paymentcontroller.payment)
router.post('/paymentverification',paymentcontroller.paymentVerification)

module.exports = router;
