"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  location?: string;
  occupation?: string;
  bio?: string;
}

interface ApiResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: User;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const TOKEN = session?.user?.accessToken as string | undefined;

  // Fetch user profile
  const { data: userData, isLoading } = useQuery<ApiResponse>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      if (!res.ok) throw new Error("Failed to fetch user profile");
      return res.json();
    },
    enabled: !!TOKEN,
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    occupation: "",
    location: "",
  });

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState(
    "/images/reviewImage.jpg"
  );

  // Populate form once API data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        occupation: user.occupation || "",
        location: user.location || "",
      });
      setProfileImagePreview(user.profileImage || "/images/reviewImage.jpg");
    }
  }, [userData]);

  // Handle input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImageFile(file);

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Update mutation
  const profileUpdateMutation = useMutation({
    mutationFn: async () => {
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("occupation", formData.occupation);
      form.append("location", formData.location);
      if (profileImageFile) {
        form.append("profileImage", profileImageFile);
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/profile`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${TOKEN}` },
          body: form,
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");
      return res.json();
    },
    onSuccess: (data) => {
      alert("Profile updated successfully!");
      if (data?.data) {
        const user = data.data;
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          occupation: user.occupation || "",
          location: user.location || "",
        });
        setProfileImagePreview(user.profileImage || "/images/reviewImage.jpg");
      }
      setProfileImageFile(null);
    },
    onError: () => alert("Error updating profile."),
  });

  const handleSave = () => {
    profileUpdateMutation.mutate();
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen">
      <BreadcrumbHeader
        title="Profile"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Profile", href: "/profile" },
        ]}
      />

      <div className="container mx-auto flex py-[96px]">
        {/* Left Column */}
        <div className="w-[30%]">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Profile Settings
          </h1>
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-4">
              <Image
                src={profileImagePreview}
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

        {/* Right Column */}
        <div className="space-y-6 flex-1">
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

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Email
            </label>
            <input
            readOnly
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

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
