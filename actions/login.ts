"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) =>{
  const validatedFields = LoginSchema.safeParse(values);

  if(!validatedFields.success){
    return {error: "Champs invalides"}
  }
  const {email, password} = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    }
  )
    return {success: "Vous êtes maintenant connecté"}
  } catch (error) {
    if(error instanceof AuthError){
      switch(error.type) {
        case "CredentialsSignin":
          return {error: "Données invalides"}
        default:
          return {error: "oups quelque chose ne va pas"}
      }
    }
    throw error;
  }
}