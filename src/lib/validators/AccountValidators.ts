import { z } from "zod";

export const SignupAuthValidator = z.object({
  name: z.string().min(2, { message: "Name is Required" }),
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type SignupFormData = z.infer<typeof SignupAuthValidator>;

export const LoginAuthValidator = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
export type LoginFormData = z.infer<typeof LoginAuthValidator>;

export const ProfileValidator = z.object({
  name: z.string().min(2, { message: "Name is Required" }),
  role: z
    .enum(["PLAYER", "COACH"])
    .optional()
    .refine((value) => value !== undefined, {
      message: "Please select a role",
    }),
  image: z
    .instanceof(File, { message: "Image is required" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Image must be smaller than 5MB",
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
      "Only JPG and PNG images are allowed",
    ),
});
export type ProfileData = z.infer<typeof ProfileValidator>;
