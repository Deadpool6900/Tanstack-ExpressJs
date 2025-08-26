import { Router } from "express";
import { asyncHandler } from "../utils/helper";
import { CreateFormWithAI } from "../controllers/form.controller";
const r = Router();
export const formRouter = r;

r.post("/createWithAI", asyncHandler(CreateFormWithAI));
