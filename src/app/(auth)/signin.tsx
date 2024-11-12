"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/misc/form-error";
import LoadingSpinner from "@/components/misc/loading-spinner";
import { signIn } from "../actions";
import { ISignIn, loginSchema } from "@/src/entities/models/users";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ISignIn>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmitHandler(data: ISignIn) {
    const res = await signIn(data);
    if (res?.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else {
      toast({
        variant: "default",
        title: `🙏Welcome, ${data.email.split("@")[0].charAt(0).toUpperCase() + data.email.split("@")[0].slice(1)} Boss`,
        description: "Signed in successfully",
      });
      reset();
    }
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
                {errors.email && <FormError error={errors.email.message} />}
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
                  {errors.password && (
                    <FormError error={errors.password.message} />
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full flex gap-4"
                disabled={isSubmitting}
              >
                {isSubmitting && <LoadingSpinner />} Login
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
