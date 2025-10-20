"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BreadcrumbHeader } from "@/components/ReusableCard/SubHero";

function UploadNewCourse() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseLevel: "Beginner",
    description: "",
    courseThumbnail: null as File | null,
    introductionVideo: "",
    fullCourseVideo: "",
    totalDuration: "",
    targetAudience: "",
    language: "",
    numberOfModules: "",
    uploadExtraFiles: null as File | null,
    price: "",
    discount: "",
    licenseRights: false,
  });

  // Handle text input / textarea
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, [fileType]: file }));
  };

  // Handle checkbox
  const handleCheckboxChange = (value: boolean | "indeterminate") => {
    setFormData((prev) => ({ ...prev, licenseRights: value === true }));
  };

  // Handle select
  const handleCourseLevelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, courseLevel: value }));
  };

  const handleDiscountChange = (value: string) => {
    setFormData((prev) => ({ ...prev, discount: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add API call here
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb Header */}
      <BreadcrumbHeader
        title="Upload New Course"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Upload New Course", href: "/upload_new_course" },
        ]}
      />
      <div className="container mx-auto bg-white rounded-lg p-[96px]">
        <h1 className="text-3xl font-bold text-gray-900 mb-14 text-center">
          Upload New Course
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Course Title & Level */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="courseTitle">Course Title</Label>
              <Input
                id="courseTitle"
                name="courseTitle"
                value={formData.courseTitle}
                onChange={handleInputChange}
                placeholder="Enter Course Name"
              />
            </div>

            <div>
              <Label htmlFor="courseLevel">Course Level</Label>
              <Select
                value={formData.courseLevel}
                onValueChange={handleCourseLevelChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write Course Description"
              rows={5}
            />
          </div>

          {/* Thumbnail & Intro Video */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label>Course Thumbnail</Label>
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400">
                <span>
                  {formData.courseThumbnail
                    ? formData.courseThumbnail.name
                    : "No File Chosen"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "courseThumbnail")}
                />
              </label>
            </div>
            <div>
              <Label htmlFor="introductionVideo">Introduction Video URL</Label>
              <Input
                id="introductionVideo"
                name="introductionVideo"
                value={formData.introductionVideo}
                onChange={handleInputChange}
                placeholder="Enter video URL"
              />
            </div>
          </div>

          {/* Full Course Video & Total Duration */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullCourseVideo">Full Course Video URL</Label>
              <Input
                id="fullCourseVideo"
                name="fullCourseVideo"
                value={formData.fullCourseVideo}
                onChange={handleInputChange}
                placeholder="Enter video URL"
              />
            </div>
            <div>
              <Label htmlFor="totalDuration">Total Duration</Label>
              <Input
                id="totalDuration"
                name="totalDuration"
                value={formData.totalDuration}
                onChange={handleInputChange}
                placeholder="e.g., 2 hours 30 minutes"
              />
            </div>
          </div>

          {/* Target Audience & Language */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="targetAudience">Target Audience</Label>
              <Input
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                placeholder="Enter target audience"
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                placeholder="Enter language"
              />
            </div>
          </div>

          {/* Number of Modules & Extra Files */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="numberOfModules">Number of Modules</Label>
              <Input
                id="numberOfModules"
                name="numberOfModules"
                value={formData.numberOfModules}
                onChange={handleInputChange}
                placeholder="Enter number"
              />
            </div>
            <div>
              <Label>Upload Extra Files</Label>
              <label className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                <span>
                  {formData.uploadExtraFiles
                    ? formData.uploadExtraFiles.name
                    : "No File Chosen"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "uploadExtraFiles")}
                />
              </label>
            </div>
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount (%)</Label>
              <Select
                value={formData.discount}
                onValueChange={handleDiscountChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select discount" />
                </SelectTrigger>
                <SelectContent>
                  {["0", "5", "10", "15", "20", "25", "30"].map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* License Checkbox */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="licenseRights"
              checked={formData.licenseRights}
              onCheckedChange={handleCheckboxChange}
            />
            <Label htmlFor="licenseRights" className="cursor-pointer">
              I confirm I have the license rights to upload this course
            </Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-6">
            Submit Course
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UploadNewCourse;
