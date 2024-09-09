"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { userFormInitialValues } from "@/lib/constants";
import { createUser } from "@/lib/db/actions/patient";
import { userFormSchema } from "@/lib/validationSchemas";

type FormValuesType = z.infer<typeof userFormSchema>;

export const UserForm = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState("");

  const form = useForm<FormValuesType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: userFormInitialValues,
  });

  const onSubmit = async (data: FormValuesType) => {
    try {
      const newUser = await createUser(data);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message.split(":")[2] : "Something went wrong";
      setApiError(msg);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="text-28-bold md:text-32-bold">Welcome back!</h1>
          <p className="text-dark-700">Ready to schedule your next appointment?</p>
        </section>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input icon={<User size={18} />} placeholder="Full Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input icon={<Mail size={18} />} placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <PhoneInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormMessage>{apiError}</FormMessage>

        <Button loading={form.formState.isSubmitting} type="submit">
          Get Started
        </Button>
      </form>
    </Form>
  );
};
