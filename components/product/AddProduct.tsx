"use client";

import ImageSelect from "./ImageSelect";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";

import { createProduct, updateProduct } from "@/actions/product";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Image, Product, Review } from "@/generated/prisma/client";

export const revalidate = 1;

interface ProductEditProps extends Product {
  id: number;
  review: Review[];
  images: Image[];
}

export default function AddProduct({
  edit,
  id,
  product,
}: {
  edit?: boolean;
  id?: string;
  product?: ProductEditProps;
}) {
  const title = edit ? "Edit Product " + id : "Add Product";
  const subText = edit
    ? "Update the details of your product here."
    : "Add a new product to your store.";

  const [images, setImages] = useState<string[]>(
    product?.images.map((i) => i.url) || []
  );
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log({ name, category, images, description, price });

    try {
      if (edit && product) {
        const updatedProduct = await updateProduct(product.id, {
          name,
          category,
          description,
          price,
          images,
        });

        if (updatedProduct) {
          console.log("Product updated successfully:", updatedProduct);
          router.push(`/product/view/${updatedProduct.id}`);
        }
      } else {
        const newProduct = await createProduct({
          name,
          category,
          description,
          price,
          images,
        });
        if (newProduct) {
          console.log("Product created successfully:", newProduct);
          router.push(`/product/view/${newProduct.id}`);
        }
      }
    } catch (error) {
      console.error("Error editing/creating product:", error);
    }
  };

  return (
    <div className="gap-8 grid mx-auto px-4 md:px-6 py-20 md:py-24 w-full max-w-4xl min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="gap-4 grid">
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="text-gray-500 dark:text-gray-400">{subText}</p>
        </div>
        <div className="gap-6 grid">
          <div className="gap-6 grid md:grid-cols-2">
            <div className="gap-2 grid">
              <Label htmlFor="name">Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Product Name"
              />
            </div>
            <div className="gap-2 grid">
              <Label htmlFor="category">Category</Label>
              <Select
                onValueChange={(value) => setCategory(value)}
                defaultValue={category}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="gap-2 grid">
            <Label htmlFor="price">Price</Label>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              id="price"
              type="number"
              placeholder="Price"
            />
          </div>
          <div className="gap-2 grid">
            <Label htmlFor="description">Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Describe your product"
              rows={5}
            />
          </div>
          <ImageSelect onChange={(value) => setImages(value)} />
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </form>
    </div>
  );
}
