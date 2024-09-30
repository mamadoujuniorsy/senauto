import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getUserByEmail } from "./data/user";
import  bcrypt from "bcryptjs";
import { LoginSchema } from "./schemas";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET
    }),
    Credentials(
      {
        async authorize(credentials){
          const validatedFields = LoginSchema.safeParse(credentials)
    
          if(validatedFields.success){
            const {email, password} = validatedFields.data;
    
            const user = await getUserByEmail(email);
            if(!user || !user.password) return null;
    
            const passwordsMatch = await bcrypt.compare(password,
              user.password
            ) ;
    
            if(passwordsMatch) return user;
          }
    
          return null;
        }
      }
    )
  ],
 } satisfies NextAuthConfig