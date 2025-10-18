"use client";

import React, { useState, ChangeEvent } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // ✅ ShadCN import path
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    occupation: "Product Manager",
    location: "San Francisco, CA",
    bio: "Passionate about creating amazing user experiences",
    emailNotifications: "j@example.com",
    goal: "Travel",
  });

  const [profileImage, setProfileImage] = useState<string>(
    "/images/reviewImage.jpg"
  );

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setProfileImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Profile saved:", formData);
    alert("Profile information saved successfully!");
  };

  return (
    <div className="min-h-screen">
        {/* Breadcrumb Header */}
              <BreadcrumbHeader
                title="Profile"
                breadcrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Profile", href: "/profile" },
                ]}
              />
      <div className="container mx-auto flex py-[96px]">
        <div className="w-[30%]">
          {/* Header Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Profile Settings
          </h1>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              <Image
                src={profileImage}
                alt="Profile"
                width={128}
                height={128}
                className="w-[256px] h-[256px] rounded-full object-cover border-4 border-gray-200"
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-8 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <Camera size={20} className="text-gray-600" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
            <button
              onClick={() => document.getElementById("image-upload")?.click()}
              className="border-2 border-green-600 text-green-600 px-6 py-1 rounded-md font-medium text-sm hover:bg-green-50 transition-colors"
            >
              Upload Image
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6 flex-1">
          {/* Row 1: First Name and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 2: Email and Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 3: Occupation and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Occupation
              </label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Row 4: Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Bio
            </label>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Row 5: Email Notifications and Goal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Notification
              </label>
              <input
                type="email"
                name="emailNotifications"
                value={formData.emailNotifications}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* ✅ ShadCN Select for Goal */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Goal
              </label>
              <Select
                value={formData.goal}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, goal: value }))
                }
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Travel">Travel</SelectItem>
                  <SelectItem value="Career">Career</SelectItem>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-green-700 transition-colors mt-8"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
