import z from "zod"

const userSchema = z.object({
    nombre: z.string({
        required_error: 'nombre es requerido.'
    }),
    email: z.string(),
    contraseña: z.string()
    
})

export function validateUser (input) {
    return userSchema.safeParse(input)
  }
  
  export function validatePartialUser (input) {
    return userSchema.partial().safeParse(input)
  }
   


