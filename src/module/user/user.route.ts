import { Router } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const route = Router();

route.get("/", auth, userController.getAllUsers);
route.get("/:id", userController.getSingleUser);
route.put("/:id", userController.updateUser);
route.delete("/:id", userController.deleteUser);

export const userRoute = route;
