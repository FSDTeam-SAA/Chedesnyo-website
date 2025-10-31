/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Loader2,
  Calendar,
  DollarSign,
  GraduationCap,
  Languages,
  BookOpen,
  File,
  Book,
} from "lucide-react";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { ReviewsCarousel } from "@/components/ReusableCard/CustomerReviewsCard";
import CoursesReviewForm from "@/components/share/CoursesReviewForm";

export default function CourseDetails() {
  const params = useParams();
  const courseId = params?.id as string;
  const session = useSession();
  const TOKEN = session.data?.user?.accessToken || "";
  const loggedUserId = session.data?.user?.id;

  // ✅ Fetch Course Details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/course/${courseId}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch course details");
      return res.json();
    },
    enabled: !!courseId,
  });

  const course = data?.data;
  const courseOwnerId = course?.createdBy?._id;

  // ✅ Payment / Enroll mutation
  const paymentMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/payment/course/${courseId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (!res.ok) throw new Error("Enrollment failed");
      return res.json();
    },
    onSuccess: (data) => {
      toast.success("✅ Enrolled successfully!");
      const url = data?.data?.url;
      if (url) {
        window.location.href = url;
      } else {
        toast.error("Payment URL not found!");
      }
    },
    onError: () => {
      toast.error("❌ Failed to enroll. Try again!");
    },
  });

  const handleTakeDeal = () => {
    toast.loading("Processing enrollment...", { id: "enroll" });
    paymentMutation.mutate(undefined, {
      onSettled: () => toast.dismiss("enroll"),
    });
  };

  const isCreator = loggedUserId === courseOwnerId; // ✅ Check if user is the course creator

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-green-600" size={40} />
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load course details.
      </div>
    );

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No course data found.
      </div>
    );

  return (
    <div>
      <div className="min-h-screen bg-gray-50 pb-[96px]">
        <div className="pb-[96px]">
          <BreadcrumbHeader
            title="Course Details"
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
            ]}
          />
        </div>

        <div className="container mx-auto bg-white rounded-2xl border border-gray-200">
          <div className="relative h-[400px] w-full">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white drop-shadow-lg">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-700">
              <div className="flex items-center gap-2">
                <DollarSign className="text-green-600" size={20} />
                <p>
                  <span className="font-semibold">Price:</span> ${course.price}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="text-blue-600" size={20} />
                <p>
                  <span className="font-semibold">Level:</span> {course.level}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Languages className="text-purple-600" size={20} />
                <p>
                  <span className="font-semibold">Language:</span>{" "}
                  {course.language}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="text-orange-600" size={20} />
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {course.duration}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900">
                Course Description
              </h2>
              <p className="text-gray-700">{course.description}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Introduction Video
              </h2>
              <video
                src={course.introductionVideo}
                controls
                className="w-full rounded-xl shadow-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <BookOpen className="text-green-600" />
              <p className="font-medium text-gray-800">
                {course.modules} Modules Included
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Who should join?
              </h2>
              <p className="text-gray-700">{course.targetAudience}</p>
            </div>

            {course.extraFile && (
              <div>
                <h2 className="text-xl font-semibold mb-3 text-gray-900">
                  Extra Resources
                </h2>
                <a
                  href={course.extraFile}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-green-700 font-medium hover:underline"
                >
                  <File size={20} /> View Resource
                </a>
              </div>
            )}

            {/* ✅ Take This Deal / Disable if creator */}
            <button
              onClick={isCreator ? undefined : handleTakeDeal}
              disabled={isCreator || paymentMutation.isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full mt-4 font-semibold shadow-lg flex justify-center items-center gap-2 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
            >
              {isCreator ? (
                "You created this course"
              ) : paymentMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Processing...
                </>
              ) : (
                <>
                  <Book size={20} /> Take This Deal
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Reviews */}
      <div className="bg-gray-50">
        <div className="container mx-auto">
          <CoursesReviewForm courseId={courseId} />
        </div>

        <div className="container mx-auto py-10">
          {course.review && course.review.length > 0 ? (
            <ReviewsCarousel
              reviews={course.review.map((r: any) => ({
                id: r._id,
                name: r.user?.firstName || "Anonymous",
                avatar: r.user?.profileImage || "/images/reviewImage.jpg",
                rating: r.rating,
                date: new Date(r.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                text: r.comment,
              }))}
              itemsPerView={3}
              showHeader={true}
              title="Customer Reviews"
            />
          ) : (
            <p className="text-center text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
