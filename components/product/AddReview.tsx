"use client";

import RatingSelect from "./Review/RatingSelect";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createReview } from "@/actions/product";

export default function AddReviewComponent({ id }: { id: number }) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");

  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    console.log({ name, rating, review });
    try {
      const newReview = createReview({
        name,
        rating,
        content: review,
        productId: id,
      });

      router.refresh();
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };
  return (
    <section className="bg-gray-100 dark:bg-gray-800 shadow-md p-6 rounded-lg">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-4 font-bold text-2xl">Add Review</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              className="block font-medium text-gray-700 dark:text-gray-300"
              htmlFor="name"
            >
              Name
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="dark:bg-gray-950 shadow-sm px-3 py-2 border border-gray-300 focus:border-primary-500 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary-500 w-full dark:text-gray-300"
              id="name"
              placeholder="Enter your name"
              type="text"
            />
          </div>
          <div>
            <label
              className="block font-medium text-gray-700 dark:text-gray-300"
              htmlFor="rating"
            >
              Rating
            </label>
            <div className="flex items-center">
              <RatingSelect onChange={setRating} />
            </div>
          </div>
          <div>
            <label
              className="block font-medium text-gray-700 dark:text-gray-300"
              htmlFor="review"
            >
              Review
            </label>
            <textarea
              value={review}
              onChange={(event) => setReview(event.target.value)}
              className="dark:bg-gray-950 shadow-sm px-3 py-2 border border-gray-300 focus:border-primary-500 dark:border-gray-700 rounded-md focus:outline-none focus:ring-primary-500 w-full dark:text-gray-300"
              id="review"
              placeholder="Write your review"
              rows={4}
            />
          </div>
          <button
            className="bg-black hover:bg-primary-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 w-full font-medium text-white"
            type="submit"
          >
            Submit Review
          </button>
        </form>
      </div>
    </section>
  );
}
