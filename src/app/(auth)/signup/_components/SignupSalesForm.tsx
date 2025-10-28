"use client"

import * as React from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import Link from "next/link"

// ✅ Industry types
interface Industry {
  _id: string
  name: string
}

interface IndustryResponse {
  statusCode: number
  success: boolean
  message: string
  data: Industry[]
}

type FormData = {
  referralCode: string
  firstName: string
  industry: string
  location: string
  kvkVatNumber: string
  email: string
  password: string
  agreeToTerms: boolean
  role?: string
}

export default function SignupSalesForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      referralCode: "",
      firstName: "",
      industry: "",
      location: "",
      kvkVatNumber: "",
      email: "",
      password: "",
      agreeToTerms: false,
    },
  })

  // ✅ Fetch industries from API
  const { data: industryData, isLoading: isIndustryLoading } = useQuery<IndustryResponse>({
    queryKey: ["industries"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/industry`)
      if (!res.ok) throw new Error("Failed to fetch industries")
      return res.json()
    },
  })

  // ✅ Sales Registration Mutation
  const salesRegistrationMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.message || "Registration failed")
      }
      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data.message || "Registration successful! Please check your email.")
      form.reset()
    },
    onError: (error) => {
      toast.error(`❌ Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`)
    },
  })

  // ✅ Form submit
  const onSubmit = (data: FormData) => {
    salesRegistrationMutation.mutate({
      ...data,
      role: "seles", // ✅ static role added
    })
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full">
        <CardContent className="">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="">
              {/* Referral Code */}
              <Controller
                name="referralCode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Referral Code (optional)
                    </FieldLabel>
                    <Input {...field} placeholder="# # # # #" className="" />
                  </Field>
                )}
              />

              {/* Full Name */}
              <Controller
                name="firstName"
                control={form.control}
                rules={{ required: "Full Name is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Full Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="Write Your Name" className="" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Industry */}
              <Controller
                name="industry"
                control={form.control}
                rules={{ required: "Industry is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Industry <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange} disabled={isIndustryLoading}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder={isIndustryLoading ? "Loading..." : "Select Industry"} />
                      </SelectTrigger>
                      <SelectContent>
                        {industryData?.data?.length
                          ? industryData.data.map((ind) => (
                              <SelectItem key={ind._id} value={ind._id}>
                                {ind.name}
                              </SelectItem>
                            ))
                          : !isIndustryLoading && (
                              <SelectItem disabled value="no-industry">
                                No industries found
                              </SelectItem>
                            )}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Location */}
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Location
                    </FieldLabel>
                    <Input {...field} placeholder="" className="" />
                  </Field>
                )}
              />

              {/* KVK/VAT Number */}
              <Controller
                name="kvkVatNumber"
                control={form.control}
                rules={{ required: "KVK/VAT Number is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      KVK/VAT Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="# # # # #" className="" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} type="email" placeholder="Write Your Email" className="" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-sm font-normal text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative mt-1">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Terms and Conditions */}
              <Controller
                name="agreeToTerms"
                control={form.control}
                rules={{ required: "You must agree to the terms and conditions" }}
                render={({ field, fieldState }) => (
                  <div>
                    <div className="flex items-start gap-2 mt-3">
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} name={field.name} ref={field.ref} className="mt-0.5" />
                      <label className="text-sm text-gray-700 cursor-pointer" onClick={() => field.onChange(!field.value)}>
                        I agree to the{' '}
                        <span className="text-red-500 hover:underline">
                          terms & conditions
                        </span>
                      </label>
                    </div>
                    {fieldState.error && <p className="text-sm text-red-500 mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
              />
            </FieldGroup>

            {/* Register Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full bg-[#008000] hover:bg-[#066106] text-white font-medium py-3 rounded-lg"
                disabled={salesRegistrationMutation.isPending}
              >
                {salesRegistrationMutation.isPending ? "Registering..." : "Register"}
              </Button>
            </div>

            {/* Log In Link */}
            <div className="text-center text-sm text-gray-600 pt-2 pb-1">
              Already have an account?{' '}
              <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                Log In
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
