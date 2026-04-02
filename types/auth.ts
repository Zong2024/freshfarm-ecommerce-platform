import z from "zod";

export const LoginResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  uid: z.string(),
  token: z.string(),
  expired: z.number(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export interface AuthUser {
  uid: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  expired: number | null;
  isInitialized: boolean;
}

export const AuthCheckResponseSchema = z.discriminatedUnion("success", [
  z.object({
    success: z.literal(true),
    uid: z.string(),
  }),
  z.object({
    success: z.literal(false),
    message: z.string(),
  }),
]);

export type AuthCheckResponse = z.infer<typeof AuthCheckResponseSchema>;
