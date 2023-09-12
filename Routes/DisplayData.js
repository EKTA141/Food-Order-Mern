import express from "express";
import {
    DisplayController
} from "./../controller/DisplayController.js";

const router = express.Router();
router.post('/foodData',DisplayController )

export default router;
