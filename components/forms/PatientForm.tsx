"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type FormValuesType = z.infer<typeof formSchema>;

const formSchema = z.object({
  username: z.string().min(1, "Name is a required field"),
  email: z.string().email("Email is a required field"),
  phone: z.string().min(4, "Phone number not complete"),
});

export const PatientForm = () => {
  // const [loading, setLoading] = useState(false);

  const form = useForm<FormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: FormValuesType) => {
    console.log(data, "Data");
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
          name="username"
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
                <Input icon={<Phone size={18} />} placeholder="(555) 123-4567" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button loading={form.formState.isSubmitting} type="submit">
          Get Started
        </Button>
      </form>
    </Form>
  );
};
