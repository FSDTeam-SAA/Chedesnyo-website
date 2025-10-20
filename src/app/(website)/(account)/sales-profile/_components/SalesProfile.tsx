"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

interface ProfileData {
  referralCode: string;
  fullName: string;
  industry: string;
  email: string;
  kvkVatNumber: string;
  location: string;
  overview: string;
  specialties: string;
  achievements: string;
  portfolio: string;
  profileImage: File | null;
}

function SalesProfile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    referralCode: "REFCH6600",
    fullName: "Md Rohan",
    industry: "Information Technology",
    email: "example@gmail.com",
    kvkVatNumber: "NL4800",
    location: "Bangladesh",
    overview: "",
    specialties: "",
    achievements: "",
    portfolio: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData((prev) => ({
        ...prev,
        profileImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", profileData);
  };

  return (
    <div>
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Profile"
        breadcrumbs={[
          { label: "Home", href: "/" },
          {
            label: "Profile",
            href: "/sales-profile",
          },
        ]}
      />
      <div className="container mx-auto px-10 py-[96px]">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Side - Profile Image */}
          <div className="md:w-[40%] flex flex-col items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-300 flex items-center justify-center">
                {imagePreview ? (
                  <Image
                    width={160}
                    height={160}
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center text-5xl">👤</div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="mt-4 w-full">
              <label className="cursor-pointer flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm w-full">
                <Upload size={16} />
                Upload Image
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-300 mt-6"></div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mt-6 text-center">
              Profile Setting
            </h1>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Referral Code */}
              <div>
                <Label
                  htmlFor="referralCode"
                  className="text-sm font-medium text-gray-700 mb-2 block"
                >
                  Referral Code
                </Label>
                <Input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={profileData.referralCode}
                  onChange={handleInputChange}
                  readOnly
                  className="w-full"
                />
              </div>

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={profileData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  className="w-full"
                />
              </div>

              {/* Industry & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    type="text"
                    value={profileData.industry}
                    onChange={handleInputChange}
                    placeholder="Information Technology"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    placeholder="example@gmail.com"
                  />
                </div>
              </div>

              {/* KVK/VAT & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="kvkVatNumber">KVK/VAT Number</Label>
                  <Input
                    id="kvkVatNumber"
                    name="kvkVatNumber"
                    type="text"
                    value={profileData.kvkVatNumber}
                    onChange={handleInputChange}
                    placeholder="NL4800"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={profileData.location}
                    onChange={handleInputChange}
                    placeholder="Bangladesh"
                  />
                </div>
              </div>

              {/* Textareas */}
              {["overview", "specialties", "achievements", "portfolio"].map(
                (field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="capitalize">
                      {field}
                    </Label>
                    <Textarea
                      id={field}
                      name={field}
                      value={profileData[field as keyof ProfileData] as string}
                      onChange={handleInputChange}
                      placeholder="Write Course Description"
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                )
              )}

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-full"
              >
                Save Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesProfile;
