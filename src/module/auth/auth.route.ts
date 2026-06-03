import { Router } from "express";
import { authController } from "./auth.controller";

const route = Router();

route.post("/signup", authController.createUser);
route.post("/login", authController.loginUser);

// console.log("auth route");

export const authRoute = route;
