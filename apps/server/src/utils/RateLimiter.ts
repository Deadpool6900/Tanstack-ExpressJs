import { rateLimit } from "express-rate-limit";

export const authRateLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 20, // Limit each IP to 20 requests per `window` (here, per 5 minutes).
	standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
    message: "Too many requests, please try again later in 5 minutes.",
});
export const OtherApiRateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 min
	limit: 200, 
	standardHeaders: "draft-8", 
	legacyHeaders: false, 
	ipv6Subnet: 56, 
    message: "Too many requests, please try again later.",
});
