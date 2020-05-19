import * as express from "express";
import { userController } from "../controllers/usercontroller";
export const userRoute = express.Router();

userRoute.get("/", userController.login);
userRoute.post("/registration", userController.registration);
//------------------------------------------------------------/
// userRoute.get('/', userController.getProfile);
// userRoute.post("/login", userController.login);
// userRoute.post("/registration", userController.registration);
// userRoute.put("/", userController.updateProfile);
//-------------------------------------------------------------\
