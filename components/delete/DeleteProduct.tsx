"use client";

import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteProduct } from "@/actions/product";
import { Button } from "@/components/ui/button";
export default function DeleteProduct({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const deletedProduct = await deleteProduct(Number(id));
      if (deletedProduct) {
        router.push("/search");
      } else {
        // Optionally, show an error message to the user if deletion failed
        console.error("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100 dark:bg-gray-900 px-4 py-12 pt-20 min-h-screen">
      <div className="space-y-6 bg-white dark:bg-gray-800 shadow-lg p-6 rounded-lg w-full max-w-md">
        <div className="space-y-4">
          <div className="flex justify-center items-center">
            <TrashIcon className="w-12 h-12 text-red-500" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="font-bold text-2xl">Are you sure?</h2>
            <p className="text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete product
              #{id}.
            </p>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button variant="destructive" onClick={handleDelete}>
            Confirm Delete
          </Button>

          <Button
            onClick={() => router.push(`/product/view/${id}`)}
            variant="outline"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
