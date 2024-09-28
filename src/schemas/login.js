import z from "zod"

const loginSchema = z.object({
    

    passw: z.string(),
    userName: z.string()
    
})

export function validateLogin (input) {
    return loginSchema.safeParse(input)
  }
  
