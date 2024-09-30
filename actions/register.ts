"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) =>{
  const validatedFields = RegisterSchema.safeParse(values);

  if(!validatedFields.success){
    return {error: "Champs invalides"}
  }
  const {email, password, name} = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if(existingUser){
    return {error: "un compte est déja lié à cet email"}
  }

  await db.user.create({
    data:{
      email,
      name,
      password: hashedPassword,
    },
  });

  //TODO: create verification email token

  return {succes: "utilisateur créé avec succés"}
}