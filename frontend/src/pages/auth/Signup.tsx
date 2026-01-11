import Logo from "@/components/logo";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,

  CardContent,
  CardDescription,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerMutationFn } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { useState } from "react";

const Signup = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({ mutationFn: registerMutationFn });

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (isPending) return;
    mutate(values, {
      onSuccess: (response) => {
        toast("Successfull", {
          description: response?.message,
        });

       setIsSubmitted(true)
      },
      onError: (error) => {
        const err = error as AxiosError<any>;

        toast("Something went wrong", {
          description: err?.response?.data.message,
        });
      },
    });
  };

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      {isSubmitted ? (
        <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-12">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
            </p>
            <Link to="/">
              <Button className="h-10">
                Go to login
                <ArrowRight />
              </Button>
            </Link>
          </div>
      ) : (
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 self-center font-medium"
          >
            <Logo />
            Backendly.
          </Link>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Create an account to unlock all features or
                  <span className="ml-2 text-blue-300">
                    <Link to={"/sign-in"}>sign in</Link>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <div className="grid gap-2">
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Name
                              </FormLabel>
                              <FormControl>
                                <Input placeholder="Joh Doe" {...field} />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="me@example.com"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-2">
                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                Password
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="*****"
                                  {...field}
                                />
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                      >
                        {isPending && <Loader className="animate-spin" />}
                        Sign up
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
};

export default Signup;
