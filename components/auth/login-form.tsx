"use client";

import { CardWrapper } from "./card-wrapper"
import * as z from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem, 
  FormLabel,
  FormMessage
 } from "../ui/form";

import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSucces } from "../form-success";
import { login } from "@/actions/login";

export const LoginForm = () =>{
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) =>{
    setError("");
    setSuccess("");
    startTransition(() =>{
      login(values)
      .then((data) =>{
        if (data) {
          setError(data.error);
          setSuccess(data.success);
        }
      });
    });
  }
  return(
    <CardWrapper
      headerLabel="Bienvenue sur SenAuto"
      backButtonLabel="Pas encore de compte?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6">
          <div className="space-y-4">
            <FormField 
              control={form.control}
              name= "email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    placeholder="momo@gmail.com"
                    type="email"
                    disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
              control={form.control}
              name= "password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Mot de passe</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    placeholder="*******"
                    type="password"
                    disabled={isPending}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error}/>
          <FormSucces message={success}/>
          <Button
          type="submit"
          className="w-full"
          disabled={isPending}>
            se connecter
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}