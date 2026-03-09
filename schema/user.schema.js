const { z } = require("zod")

const registerSchema = z.object({
    username: z.string().min(2, "Name too short").max(30),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be 6 characters")
})

const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6)
})

module.exports = {
    registerSchema,
    loginSchema
}