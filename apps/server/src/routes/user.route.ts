import { Router } from "express";
import { asyncHandler } from "../utils/helper";
import { getUserData, UpdateUsername } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
const r = Router();
export { r as userRouter };

r.get("/getUserData", authMiddleware, asyncHandler(getUserData));
r.post("/updateUsername", authMiddleware, asyncHandler(UpdateUsername));
