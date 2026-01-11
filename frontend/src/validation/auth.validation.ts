import z from "zod";

export const CodeSchema = z.string().trim().min(5 , {message : "Verification code cannot be too small"})

export type VerificationCodeSchema = typeof CodeSchema