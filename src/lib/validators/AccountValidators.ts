import { z } from "zod";

export const SignupAuthValidator = z.object({
    name: z.string().min(4, { message: "Name is Required." }),
    email: z.email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});
export type SignupFormData = z.infer<typeof SignupAuthValidator>;

export const LoginAuthValidator = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});
export type LoginFormData = z.infer<typeof LoginAuthValidator>;

export const RoleAuthValidator = z.object({
    role: z
        .enum(["PLAYER", "COACH"])
        .optional()
        .refine((value) => value !== undefined, {
            message: "Please select a role.",
        }),
});
export type RoleFormData = z.infer<typeof RoleAuthValidator>;