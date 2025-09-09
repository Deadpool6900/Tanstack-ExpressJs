import { Router } from "express";
import { getUserData, UpdateUsername } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/helper";
import {  OtherApiRateLimiter } from "../utils/RateLimiter";

const r = Router();
export { r as userRouter };

r.use(OtherApiRateLimiter)

r.get("/getUserData", authMiddleware, asyncHandler(getUserData));
r.post("/updateUsername", authMiddleware, asyncHandler(UpdateUsername));
