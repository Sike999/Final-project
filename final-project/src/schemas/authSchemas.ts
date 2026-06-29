import z from 'zod'

export const registerSchema = z.object({
    email: z.email('Wrong email format'),
    password: z.string().min(4,'Minimum 4 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).+$/,'Password must have an upper letter, lower letters and a number'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100), 
    nickname: z.string().min(2).max(100).optional(),
    role:  z.boolean().optional(),
    agreement: z.boolean().refine(v => v === true, 'You must accept the Privacy Policy')
}).refine(
    data => data.password === data.confirmPassword, {
        message: 'Passwords are unmatch',
        path:['confirmPassword']
    }
).refine(
    (data) => {
        if (data.role) {
            return data.nickname && data.nickname.trim().length > 0
        }
        return true
    },
    {message: 'Nickname is required for artists',
        path: ['nickname']}
)
export type RegisterFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.email('Wrong email format'),
    password: z.string().min(4,'Minimum 4 characters').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[1-9]).+$/,'Password must have an upper letter, lower letters and a number'),
})
export type LoginFormData = z.infer<typeof loginSchema>