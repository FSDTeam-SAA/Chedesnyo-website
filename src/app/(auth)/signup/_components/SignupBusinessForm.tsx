"use client"

import * as React from "react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const industries = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "other", label: "Other" },
]

type FormData = {
  referralCode: string
  businessName: string
  industry: string
  email: string
  kvkVatNumber: string
  password: string
  agreeToTerms: boolean
}

export default function SignupBusinessForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<FormData>({
    defaultValues: {
      referralCode: "",
      businessName: "",
      industry: "",
      email: "",
      kvkVatNumber: "",
      password: "",
      agreeToTerms: false,
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FieldGroup>
              {/* Referral Code */}
              <Controller
                name="referralCode"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Referral Code (optional)</FieldLabel>
                    <Input
                      {...field}
                      placeholder="# # # # #"
                    />
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

              {/* Industry */}
              <Controller
                name="industry"
                control={form.control}
                rules={{ required: "Industry is required" }}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>
                      Industry <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value}>
                            {ind.label}
                          </SelectItem>
                        ))}
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
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the{' '}
                      <span className="text-red-500 cursor-pointer hover:underline">
                        terms & conditions
                      </span>
                    </span>
                  </div>
                )}
              />
            </FieldGroup>

            <CardFooter className="flex flex-col gap-3">
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <span className="text-blue-600 cursor-pointer hover:underline">
                  Log In
                </span>
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
