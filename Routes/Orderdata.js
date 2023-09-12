import express from "express";

import {myOrderDataController, orderDataController } from '../controller/OrderdataController.js';
  
const router = express.Router();


router.post('/orderData',orderDataController )

router.post('/myOrderData',myOrderDataController );

export default router;