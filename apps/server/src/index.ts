// FIX THIS SHIT 👇
import type { User as PrismaUser } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, {
	json,
	urlencoded,
} from "express";
import session from "express-session";
import passport from "passport";
import {
	Strategy as GoogleStrategy,
	type Profile,
} from "passport-google-oauth20";
import { errorMiddleware } from "./middleware/Error.middleware";
import { authRouter } from "./routes/auth.route";
import { userRouter } from "./routes/user.route";
import prisma from "./utils/prisma";
import { baseClientUrl, baseServerUrl } from "./utils/helper";

declare global {
	namespace Express {
		interface User extends PrismaUser {}
	}
}
config();
// This function checks if certain required environment variables are set before your application runs.
const requiredEnvVars = [
	"JWT_SECRET_KEY",
	"DATABASE_URL",
	"GOOGLE_CLIENT_ID",
	"SERVER_PORT",
];
requiredEnvVars.forEach((envVar) => {
	if (!process.env[envVar]) {
		throw new Error(`Missing required environment variable: ${envVar}`);
	}
});

const app = express();
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(json({ limit: "5mb" }));
app.use(
	cors({
		origin: baseClientUrl,
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
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		},
	})
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
			callbackURL: `${baseServerUrl}/auth/google/callback`,
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
app.listen(process.env.SERVER_PORT || 5001, () =>
	console.log(
		"app is running on",
		"\x1b[31m%s\x1b[0m",
		baseServerUrl,
	),
);
// that regex is for cool color
