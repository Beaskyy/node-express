import { z } from "zod";

export const createOrderSchema = z
  .object({
    customerName: z.string().trim().min(1, "Customer name is required"),

    service: z.string().trim().min(1, "Service is required"),

    quantity: z.number().int().positive("Quantity must be a positive integer"),
  })
  .strict();

export const updateOrderSchema = z
  .object({
    customerName: z.string().trim().min(1).optional(),

    service: z.string().trim().min(1).optional(),

    quantity: z.number().int().positive().optional(),

    status: z.enum(["pending", "processing", "ready", "completed"]).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });
