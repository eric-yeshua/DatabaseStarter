"use server";

import { unstable_cache as cache, revalidateTag } from "next/cache";

import { prisma } from "@/lib/prisma";
import { Review } from "@/generated/prisma/client";
// import { Prisma } from "@/generated/prisma/client";

type CreateProductInput = {
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
};

type CreateReviewInput = {
  rating: number;
  content: string;
  name: string;
  productId: number;
};

export async function createProduct(product: CreateProductInput) {
  try {
    // create a new Product in the database
    const newProduct = await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        images: {
          // create: product.images?.create || [],
          create: (product.images as string[])?.map((url) => ({ url })),
        },
        //   reviews: {
        //     create: product.reviews?.create || [],
        //   },
      },
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

const _getProductById = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
        reviews: true,
      },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch the product");
  }
};

export const getProductById = cache(_getProductById, ["getProductById"], {
  tags: ["Product"],
  revalidate: 60, // Cache for 60 seconds
});

export const updateProduct = async (id: number, data: CreateProductInput) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        images: {
          deleteMany: {}, // Delete existing images
          create: (data.images as string[])?.map((url) => ({ url })), // Add new images
        },
      },
    });
    revalidateTag("Product");
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw new Error("Failed to update the product");
  }
};

export const deleteProduct = async (id: number) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidateTag("Product");
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete the product");
  }
};

export const createReview = async (review: CreateReviewInput) => {
  try {
    const newReview = await prisma.review.create({
      data: {
        rating: review.rating,
        content: review.content,
        name: review.name,
        product: {
          connect: { id: review.productId },
        },
        // productId: review.productId,
      },
    });
    revalidateTag("Product");
    return newReview;
  } catch (error) {
    console.error("Error creating review:", error);
    throw new Error("Failed to create review");
  }
};
