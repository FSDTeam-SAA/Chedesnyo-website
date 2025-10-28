"use client"

import * as React from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import Link from "next/link"

type FormData = {
  firstName: string
  referralCode: string
  businessName: string
  industry: string
  email: string
  kvkVatNumber: string
  password: string
  agreeToTerms: boolean
  role?: string
}

interface Industry {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface IndustryResponse {
  statusCode: number
  success: boolean
  message: string
  meta: {
    total: number
    page: number
    limit: number
  }
  data: Industry[]
}

export default function SignupBusinessForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      firstName: "",
      referralCode: "",
      businessName: "",
      industry: "",
      email: "",
      kvkVatNumber: "",
      password: "",
      agreeToTerms: false,
    },
  })

  // ✅ Fetch industries from API
  const { data: industryData, isLoading: isIndustryLoading } = useQuery<IndustryResponse>({
    queryKey: ["industries"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/industry`)
      if (!res.ok) {
        throw new Error("Failed to fetch industries")
      }
      return res.json()
    },
  })

  // ✅ Business registration mutation
  const businessRegistrationMutation = useMutation({
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

  const onSubmit = (data: FormData) => {
    businessRegistrationMutation.mutate({
      ...data,
      role: "business", // ✅ static role added
    })
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FieldGroup>
              {/* Full Name */}
              <Controller
                name="firstName"
                control={form.control}
                rules={{ required: "Full Name is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Full Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="Write Your Full Name" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Referral Code */}
              <Controller
                name="referralCode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Referral Code (optional)</FieldLabel>
                    <Input {...field} placeholder="# # # # #" />
                  </Field>
                )}
              />

              {/* Business Name */}
              <Controller
                name="businessName"
                control={form.control}
                rules={{ required: "Business Name is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Business Name <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="Write Your Business Name" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* ✅ Dynamic Industry */}
              <Controller
                name="industry"
                control={form.control}
                rules={{ required: "Industry is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Industry <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isIndustryLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isIndustryLoading ? "Loading..." : "Select Industry"} />
                      </SelectTrigger>
                      <SelectContent>
                        {industryData?.data?.length ? (
                          industryData.data.map((item: Industry) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem disabled value="none">
                            No industries found
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Email <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} type="email" placeholder="Write Your Email" />
                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                    <FieldLabel>
                      KVK/VAT Number <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input {...field} placeholder="# # # # #" />
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
                    <FieldLabel>
                      Password <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-12"
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
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex items-center gap-2 my-4">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{" "}
                      <span className="text-red-500 cursor-pointer hover:underline">
                        terms & conditions
                      </span>
                    </span>
                  </div>
                )}
              />
            </FieldGroup>

            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                disabled={businessRegistrationMutation.isPending}
              >
                {businessRegistrationMutation.isPending ? "Registering..." : "Register"}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin"><span className="text-blue-600 cursor-pointer hover:underline">Log In</span></Link>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
