import { RateLimiterRedis } from "rate-limiter-flexible";
import Redis from "ioredis";
import { Request, Response, NextFunction } from "express";

const redisClient = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
})

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    points: 100, // Number of points
    duration: 60, // Per second(s)
    blockDuration: 60, // Block for 60 seconds if consumed more than points
})

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await rateLimiter.consume(req.ip || "unknown");
        next();
    } catch (rejRes) {
        res.status(429).json({ message: "Too many requests. Please try again later." });
    }
}