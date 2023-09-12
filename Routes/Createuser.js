// /** @format */
import express from "express";
import { registerController,
  loginController} from "./../controller/CreateuserController.js"

import { body, validationResult } from "express-validator";

const router = express.Router();


 router.post(
  "/createuser",
  [
      body("email", "enter a valid email").isEmail(),
      body("name", "enter a valid name").isLength({ min: 5 }),
    body("password", "password must be 5 charactor").isLength({ min: 5 }),
  ],registerController
  )

  //Authenticate a user using : post '/api/auth/login no login required
  // ROUTE_2
  router.post(
    "/login",
    [
      // body('name','enter avalid name').isLength({ min: 3 }),
      body("email", "enter a valid email").isEmail(),
      body("password", "password cannot be blank").exists(),
    ],loginController
  );
export default router;
