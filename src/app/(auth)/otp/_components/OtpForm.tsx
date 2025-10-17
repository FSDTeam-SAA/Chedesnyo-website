"use client";

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
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

// ✅ Zod validation schema
const formSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// ✅ Infer type from schema
type VerifyOTPFormData = z.infer<typeof formSchema>;

export default function VerifyOTPForm() {
  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const form = useForm<VerifyOTPFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Update form value
    form.setValue("otp", newOtpValues.join(""));

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP input keydown (for backspace)
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtpValues = pastedData.split("");
    while (newOtpValues.length < 6) {
      newOtpValues.push("");
    }
    
    setOtpValues(newOtpValues);
    form.setValue("otp", newOtpValues.join(""));
    
    if (newOtpValues.length === 6) {
      inputRefs.current[5]?.focus();
    }
  };

  const onSubmit = async (data: VerifyOTPFormData) => {
    setIsSubmitting(true);
    console.log("OTP Submitted:", data.otp);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("OTP Verified Successfully!");
    }, 2000);
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
              Enter OTP
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-sm leading-6">
              An OTP has been sent to your email address please verify it below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form id="verify-otp-form" onSubmit={form.handleSubmit(onSubmit)}>
              {/* OTP Input Fields */}
              <div className="flex justify-center gap-3 mb-6">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition"
                    placeholder="•"
                  />
                ))}
              </div>

              {/* Error Message */}
              {form.formState.errors.otp && (
                <div className="text-center text-red-600 text-sm mb-4">
                  {form.formState.errors.otp.message}
                </div>
              )}
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 mt-3">
            {/* Verify Button */}
            <Button
              type="submit"
              form="verify-otp-form"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200"
              disabled={isSubmitting || otpValues.join("").length !== 6}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>

            {/* Resend OTP Link */}
            <div className="text-center text-sm">
              <span className="text-gray-600">Didn&apos;t Receive OTP? </span>
              <button
                type="button"
                onClick={() => {
                  setOtpValues(["", "", "", "", "", ""]);
                  form.reset();
                  inputRefs.current[0]?.focus();
                }}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Resend OTP
              </button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}