"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

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
import Image from "next/image";

// ✅ Zod validation schema
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

// ✅ Infer type from schema
type ForgotPasswordFormData = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data);
    setIsSubmitted(true);
    // Reset after 3 seconds for demo purposes
    setTimeout(() => {
      form.reset();
      setIsSubmitted(false);
    }, 3000);
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
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  DEAL CLOSED
                </span>
              </div>
            </div>

            {/* Title & Description */}
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              Forget Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-sm leading-6">
              Please enter the email address linked to your account. We&apos;ll send a one-time password
              (OTP) to your email for verification.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="forgot-password-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                        placeholder="Enter your email address"
                        type="email"
                        className="placeholder-gray-400"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-3">
            <Button
              type="submit"
              form="forgot-password-form"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              disabled={isSubmitted}
            >
              {isSubmitted ? "Sending OTP..." : "Send OTP"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-gray-600">Back to </span>
              <Link
                href="/signin"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Log In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}