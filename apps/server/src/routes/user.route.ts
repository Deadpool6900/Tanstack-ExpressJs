import { Router } from "express";
import { getUserData, UpdateUsername } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/helper";

const r = Router();
export { r as userRouter };

r.get("/getUserData", authMiddleware, asyncHandler(getUserData));
r.post("/updateUsername", authMiddleware, asyncHandler(UpdateUsername));
