import { z } from "zod";

export const step1Schema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    phone: z.string().min(7, "Phone is required"),
    role: z.enum(["donor", "ngo", "carehome", "composter", "admin"]),
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
  locationGeo: z.object({
    type: z.string().default("Point").optional(),
    coordinates: z.array(z.number()).length(2),
  }),
});

export const step3Schema = z.object({
  foodTypesAccepted: z
    .array(
      z.enum(["vegetarian", "non-vegetarian", "vegan", "gluten-free", "other"]),
    )
    .min(1, "Select at least one food type"),
  servingCapacity: z
    .number({ invalid_type_error: "Serving capacity must be a number" })
    .min(1, "Enter a valid serving capacity"),
  preferredPickupTime: z.string().min(1, "Preferred pickup time is required"),
});

export const step4Schema = z.object({
  profilePicture: z.string().optional(),
  verificationDocument: z
    .string()
    .url("Verification document must be a valid URL")
    .min(1, "Verification document is required"),
  socialMedia: z
    .object({
      website: z.string().url("Invalid URL").optional(),
      facebook: z.string().url("Invalid URL").optional(),
      instagram: z.string().url("Invalid URL").optional(),
      twitter: z.string().url("Invalid URL").optional(),
    })
    .optional(),
});

export const ngoRegistrationSchema = step1Schema
  .innerType()
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema);

export type NgoRegistrationType = z.infer<typeof ngoRegistrationSchema>;
