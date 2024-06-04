import { z } from "zod";

export const signUpSchema = z.object({
    email: z.string().email().trim().min(1, {
        message: "Email is required"
    }),
    fullName: z
        .string()
        .trim()
        .min(3, {
            message: "Name must be minimum 3 characters",
        })
        .max(20, {
            message: "Name must be max 20 characters",
        }),
    password: z
        .string()
        .trim()
        .min(5, {
            message: "Password must be minimum 5 length",
        })
        .max(20, {
            message: "Password must be max 20 in length",
        }),
});
export const signInSchema = z.object({
    email: z.string().email().trim().min(1, {
        message: "Email is required"
    }),
    password: z
        .string()
        .trim()
        .min(5, {
            message: "Password must be minimum 5 length",
        })
        .max(20, {
            message: "Password must be max 20 in length",
        }),
});


export const productSchema = z.object({
    productName: z.string().trim().min(1, {
        message: 'Product name is required'
    }),
    productDescription: z.string().trim().min(1, {
        message: 'Product description is required'
    }),
    productImage: z.string().min(1, {
        message: "Image is required"
    })
})