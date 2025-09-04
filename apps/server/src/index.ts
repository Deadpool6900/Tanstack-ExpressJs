// FIX THIS SHIT 👇
import type { User as PrismaUser } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, {
	json,
	type Request,
	type Response,
	urlencoded,
} from "express";
import session from "express-session";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
	Strategy as GoogleStrategy,
	type Profile,
} from "passport-google-oauth20";
import { errorMiddleware } from "./middleware/Error.middleware";
import { authRouter } from "./routes/auth.route";
import { userRouter } from "./routes/user.route";
import prisma from "./utils/prisma";

declare global {
	namespace Express {
		interface User extends PrismaUser {}
	}
}
config();

const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "5mb" }));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);
app.use(json());
app.use(
	session({
		secret: process.env.SESSION_SECRET || "supersecret",
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
			secure: false, // set true in production with HTTPS
			sameSite: "lax",
		},
	}),
);
// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Serialize & Deserialize user
passport.serializeUser((user: any, done) => {
	done(null, user.email); // store only the email in session
});

passport.deserializeUser(async (email: string, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		done(null, user || null);
	} catch (err) {
		done(err as Error, null);
	}
});

// Google OAuth Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL: "http://localhost:5001/auth/google/callback",
		},
		async (accessToken, refreshToken, profile: Profile, done) => {
			try {
				// Get email
				const email = profile.emails?.[0]?.value;
				if (!email) return done(new Error("No email found"), undefined);

				// Check if user exists
				let user = await prisma.user.findUnique({
					where: { email },
				});

				// Create new user if not exists
				if (!user) {
					user = await prisma.user.create({
						data: {
							email: email,
							username: profile.displayName,
							pfpUrl: profile.photos?.[0]?.value,
							authProviders:
								profile.provider === "google" ? ["GOOGLE"] : ["LOCAL"],
							createdAt: new Date(),
							updatedAt: new Date(),
						},
					});
				}

				// Pass user to session
				return done(null, user);
			} catch (err) {
				return done(err as Error, undefined);
			}
		},
	),
);

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use(errorMiddleware);
app.listen(5001, () =>
	console.log(
		"app is running on",
		"\x1b[31m%s\x1b[0m",
		" http://localhost:5001",
	),
);
// that regex is for cool color
