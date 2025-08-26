import express, { json, urlencoded } from "express";
import cors from "cors";
import { config } from "dotenv";
import { authRouter } from "./routes/auth.route";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/Error.middleware";
// FIX THIS SHIT 👇
import { type User } from "@prisma/client";
import { userRouter } from "./routes/user.route";
import { formRouter } from "./routes/form.route";
declare global {
	namespace Express {
		interface Request {
			user?: User; // optional everywhere
		}
	}
}
config();

const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "5mb" }));
app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);
app.use(json());

app.get("/name", (req, res) => {
	return res.json({
		value: "jennie",
	});
});
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/form", formRouter);

app.use(errorMiddleware);
app.listen(5001, () =>
	console.log(
		"app is running on",
		"\x1b[31m%s\x1b[0m",
		" http://localhost:5001",
	),
);
// that regex is for cool color
