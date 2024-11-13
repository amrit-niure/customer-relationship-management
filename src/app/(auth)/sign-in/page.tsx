"use client";
import {  Card,  CardHeader,  CardTitle,  CardDescription,  CardContent,} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignIn, loginSchema } from "@/schema/user";
import { useToast } from "@/hooks/use-toast";
import { signInAction } from "./actions";
import { useServerAction } from "zsa-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

const { execute, isPending, reset } = useServerAction(signInAction, {
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
  onSuccess(result) {
    if (result.data) {
      toast({
        title: "Welcome 🙏",
        description:
          "Please go through the help and support section if you need any help.",
      });
    }
  },
});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
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
    <div className="flex items-center justify-center h-[100vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your <b>Hamro Khata</b> account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                    prefetch={false}
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                    />

                    <Button
                      variant={"ghost"}
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
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full flex gap-4"
                disabled={isPending}
              >
                {isPending ? "..." : "Login"}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="signup" className="underline">
              Create account
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
