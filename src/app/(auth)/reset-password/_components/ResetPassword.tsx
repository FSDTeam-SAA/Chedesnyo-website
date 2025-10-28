"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

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
const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

// ✅ Infer type from schema
type NewPasswordFormData = z.infer<typeof formSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const resetToken = localStorage.getItem("refreshToken") || "";

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      rememberMe: false,
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (bodyData: {
      email: string;
      newPassword: string;
      resetToken: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Password reset failed");
      }
      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset successful");
      router.push("/signin");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to reset password");
    },
  });

  // ✅ Submit function connected to mutation
  const onSubmit = (data: NewPasswordFormData) => {
    if (!email || !resetToken) {
      toast.error("Missing email or reset token. Please try again.");
      return;
    }
    resetPasswordMutation.mutate({
      email,
      newPassword: data.newPassword,
      resetToken,
    });
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
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-gray-50">
        <Card className="w-full max-w-lg p-7 shadow-2xl rounded-2xl">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Image
                src="/images/chedsnyoLogo.png"
                alt="Chedesnyo Logo"
                width={200}
                height={200}
                className="w-[113px] h-[108px]"
              />
            </div>
            <CardTitle className="text-center text-2xl font-bold text-gray-900">
              New Password
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-sm">
              Please create your new password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="new-password-form" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="space-y-6">
                {/* New Password */}
                <Controller
                  name="newPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>New Password</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter Password..."
                          type={showNewPassword ? "text" : "password"}
                          className="placeholder-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Re-enter Password */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Re-enter Password</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          placeholder="Enter Password..."
                          type={showConfirmPassword ? "text" : "password"}
                          className="placeholder-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />

                {/* Remember Me */}
                <Controller
                  name="rememberMe"
                  control={form.control}
                  render={({ field }) => (
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
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-3">
            <Button
              type="submit"
              form="new-password-form"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              disabled={resetPasswordMutation.isPending}
            >
              {resetPasswordMutation.isPending ? "Submitting..." : "Continue"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
