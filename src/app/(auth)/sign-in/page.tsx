"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon, Info, Origami, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignIn, loginSchema } from "@/app/validation/user";
import { useToast } from "@/hooks/use-toast";
import { signInAction } from "../actions";
import { useServerAction } from "zsa-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const { execute, isPending, reset } = useServerAction(signInAction, {
    onSuccess() {
      toast({
        title: "Welcome 🙏",
        description:
          "Please go through the help and support section if you need any help.",
      });
    },
    onError(result) {
      if (result.err) {
        toast({
          title: "Authentication Failed",
          description: result.err.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        });
      }
    },
  });

  const form = useForm<ISignIn>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitHandler(data: ISignIn) {
    execute(data);
    reset();
  }
  return (
    <div className="flex items-center justify-center h-[100vh] w-full">
      <div className="flex-1 flex items-center justify-center flex-col bg-muted h-full">
        <Card className="border-0 shadow-none bg-transparent">
          <Origami size={50} className="self-start" />
          <CardHeader className="space-y-1 px-0">
            <CardTitle className="text-5xl font-bold">
              Apply World Group CRM
            </CardTitle>
            <CardDescription className="text-md py-2">
              The most used client record management platform in the town.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md rounded-none shadow-none border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your credentials to login to your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitHandler)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          className="rounded-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                          prefetch={false}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                            className="rounded-none"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="absolute bottom-1 right-1 h-7 w-7"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-4 w-4" />
                            ) : (
                              <EyeOffIcon className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full flex gap-4 rounded-none"
                  disabled={isPending}
                >
                  {isPending ? "..." : "Login"}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm flex items-center justify-center gap-2 flex-col text-muted-foreground ">
              Don&apos;t have an account?
              <Link
                href="#"
                className="flex items-center justify-center gap-2 underline hover:text-primary cursor-pointer"
              >
                <Phone size={14} /> Contact Admin
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
