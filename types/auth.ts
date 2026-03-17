import z from "zod";

export const LoginResponseSchema = z.object({
  status: z.boolean(),
  message: z.string(),
  uid: z.string(),
  token: z.string(),
  expired: z.number(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export interface AuthUser {
  uid: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  expired: number | null;
}
