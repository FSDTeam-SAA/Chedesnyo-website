"use client";

import React from "react";
import { ReviewsCarousel, Review } from "../ReusableCard/CustomerReviewsCard"; // ✅ import Review type

// ✅ Sample Data
const reviewsData: Review[] = [
  {
    id: 1,
    name: "Maya Russo",
    avatar: "/images/reviewImage.jpg",
    rating: 5,
    date: "February 13, 2025",
    text: "They didn't just design a beautiful space—they really understood what I wanted and brought it to life. The attention to detail is incredible. Everything feels both modern but cozy.",
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "/images/reviewImage.jpg",
    rating: 4,
    date: "February 10, 2025",
    text: "Excellent service and very professional team. They delivered exactly what was promised on time and within budget. Highly recommended!",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    avatar: "/images/reviewImage.jpg",
    rating: 5,
    date: "February 08, 2025",
    text: "Amazing experience from start to finish. The team was responsive and made sure every detail was perfect. Will definitely work with them again!",
  },
  {
    id: 4,
    name: "David Lee",
    avatar: "/images/reviewImage.jpg",
    rating: 4,
    date: "February 05, 2025",
    text: "Great communication throughout the entire process. The final product exceeded my expectations. Would hire again!",
  },
  {
    id: 5,
    name: "Emma Brown",
    avatar: "/images/reviewImage.jpg",
    rating: 5,
    date: "February 02, 2025",
    text: "Superb quality and attention to detail. They truly care about customer satisfaction. Highly recommend their services!",
  },
];

// ✅ Main Review Page
export default function CustomerReviews() {
  return (
    <ReviewsCarousel
      reviews={reviewsData}
      itemsPerView={3}
      showHeader={true}
      title="Customer Reviews"
    />
  );
}
