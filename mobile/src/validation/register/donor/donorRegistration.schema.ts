import { z } from "zod";

export const step1Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(7, "Phone is required"),
  role: z.enum(["donor", "ngo", "carehome", "composter"]),
  category: z
    .enum(["individual", "restaurant", "hotel", "catering", "other"])
    .optional(),
});

export const step2Schema = z.object({
  location: z.object({
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    city: z.string().min(1, "City is required"),
    pincode: z.string().min(4, "Pincode is required"),
  }),
});

export const step3Schema = z.object({
  verificationDocument: z
    .string()
    .min(1, "Verification document is required")
    .optional(),
  profilePicture: z.string().optional(),
  socialMedia: z
    .object({
      website: z.string().url("Invalid URL").optional(),
      facebook: z.string().url("Invalid URL").optional(),
      instagram: z.string().url("Invalid URL").optional(),
      twitter: z.string().url("Invalid URL").optional(),
    })
    .optional(),
});

export const donorRegistrationSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema);

export type DonorRegistrationType = z.infer<typeof donorRegistrationSchema>;
