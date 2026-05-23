import { Router } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

const route = Router();

route.post("/", userController.createUser);
route.get("/", userController.getAllUsers);
route.get("/:id", userController.getSingleUser);
route.put("/:id", userController.updateUser);
route.delete("/:id", userController.deleteUser);

export const userRoute = route;
