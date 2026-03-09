const {z} = require("zod")

const todoSchema = z.object({
    title:z.string().min(1),
    deadline:z.string().optional()
})

module.exports = todoSchema