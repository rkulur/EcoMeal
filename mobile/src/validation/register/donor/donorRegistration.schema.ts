import { z } from "zod";

export const step1Schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    phone: z.coerce.number().refine((val) => val.toString().length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
    role: z.enum(["donor", "ngo", "carehome", "composter"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
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
  profilePicture: z.string().optional(),
});

export const donorRegistrationSchema = step1Schema
  .innerType()
  .merge(step2Schema)
  .merge(step3Schema);

export type DonorRegistrationType = z.infer<typeof donorRegistrationSchema>;
