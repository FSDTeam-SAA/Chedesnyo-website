"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupBusinessForm from "./SignupBusinessForm";
import Image from "next/image";

const Logo = () => (
  <div className="flex flex-col items-center mb-4">
    <div className="w-16 h-16 mb-2">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#10b981" />
        <path
          d="M30 50 L45 65 L70 35"
          stroke="white"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M35 45 Q50 35 65 45"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
    <div className="text-xl font-bold text-gray-800">DEAL CLOSED</div>
  </div>
);

export default function Signup() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:block w-1/2 h-screen relative">
        <Image
          src="/images/cheAuthImage.png"
          alt="Professional woman working on laptop"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex-1 items-center justify-center">
        <Card className="">
          <CardHeader className="space-y-1 pb-4">
            <Logo />
            <CardDescription className="text-center text-gray-500">
              Welcome to Website
            </CardDescription>
            <CardTitle className="text-3xl font-bold text-center">
              Create an account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Tabs defaultValue="business" className="w-[60%] mx-auto">
              <div className="mb-6">
                <Label className="text-sm font-medium mb-2 block">
                  Select User Type *
                </Label>
                <TabsList className="grid w-full grid-cols-2 bg-green-50 p-1 rounded-full">
                  <TabsTrigger
                    value="business"
                    className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Business
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales"
                    className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Sales Professionals
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="business" className="mt-0">
                <SignupBusinessForm />
              </TabsContent>

              <TabsContent value="sales" className="mt-0">
                <p>ame</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
