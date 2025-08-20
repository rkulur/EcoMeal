import { z } from "zod";

const requestedItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .positive("Quantity must be greater than 0"),
  unit: z
    .enum([
      "plates",
      "servings",
      "packets",
      "containers",
      "trays",
      "bowls",
      "boxes",
      "liters",
      "ml",
    ])
    .default("plates"),
});

export const FoodRequestSchema = z.object({
  requestedItems: z
    .array(requestedItemSchema)
    .min(1, "At least one item must be requested"),
  comments: z.string().optional(),
});

export type FoodRequestType = z.infer<typeof FoodRequestSchema>;
