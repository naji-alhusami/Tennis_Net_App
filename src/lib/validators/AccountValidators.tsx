import { z } from "zod";

export const SignupAuthValidator = z.object({
    name: z.string().min(4, { message: "Name is Required." }),
    email: z.email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    //   level: z.string({
    //     required_error: "Level is Required.",
    //   }),
});

export type SignupFormData = z.infer<typeof SignupAuthValidator>;

export const LoginAuthValidator = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginFormData = z.infer<typeof LoginAuthValidator>;


// export const AuthValidator = z.union([SignupAuthValidator, LoginAuthValidator]);

// export type PAuthValidator = z.infer<typeof AuthValidator>;
