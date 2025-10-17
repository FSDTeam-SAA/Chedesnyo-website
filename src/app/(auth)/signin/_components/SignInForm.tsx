"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

// ✅ Zod validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  rememberMe: z.boolean().optional(),
});

// ✅ Infer type from schema
type SignInFormData = z.infer<typeof formSchema>;

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* ✅ Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 h-screen relative">
        <Image
          src="/images/cheAuthImage.png"
          alt="Professional woman working on laptop"
          fill
          quality={100}
          className="object-cover"
          priority
        />
      </div>

      {/* ✅ Right Side - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-gray-50">
        <Card className="w-full max-w-lg p-7 shadow-2xl rounded-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  DEAL CLOSED
                </span>
              </div>
            </div>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Welcome Back!
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter to get unlimited data & information
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-6">
                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        {...field}
                        placeholder="Write Your Email"
                        type="email"
                        className="placeholder-gray-400"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Password</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter Password"
                          type={showPassword ? "text" : "password"}
                          className="placeholder-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* Remember Me */}
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          className="w-4 h-4 accent-green-600 rounded cursor-pointer"
                        />
                        <label
                          htmlFor="remember"
                          className="ml-2 text-sm text-gray-600 cursor-pointer"
                        >
                          Remember Me
                        </label>
                      </div>
                      <a
                        href="#"
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Forget Password?
                      </a>
                    </div>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-3">
            <Button
              type="submit"
              form="signin-form"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              Sign In
            </Button>

            <p className="text-sm text-gray-600 text-center">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Sign Up
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
