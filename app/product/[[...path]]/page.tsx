import { getProductById } from "@/actions/product";
import AddReview from "@/components/product/AddReview";
import Product from "@/components/product/Product";
import AddProduct from "@/components/product/AddProduct";
import DeleteProduct from "@/components/delete/DeleteProduct";
import { Review } from "@/generated/prisma/client";
import ReviewView from "@/components/product/Review";

export const revalidate = 1;

export default async function Page({ params }: { params: { path: string[] } }) {
  const method = params.path[0];
  const id = params.path[1];

  const product = await getProductById(Number(id));

  if (method === "new") {
    return <AddProduct />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  if (method === "edit") {
    return <AddProduct edit id={id} product={product} />;
  }
  if (method === "delete") {
    return <DeleteProduct id={id} />;
  }

  return (
    <div className="gap-8 grid md:grid-cols-2 mx-auto px-4 py-12 pt-20 max-w-6xl">
      <Product product={product} />
      <div className="flex flex-col gap-y-5">
        <span className="h-fit font-bold text-2xl">Customer Reviews</span>
        <div className="gap-5 grid">
          {product.reviews.map((review: Review) => (
            <ReviewView key={review.id} review={review} />
          ))}
        </div>
      </div>
      <div className="md:col-span-2">
        <AddReview id={Number(id)} />
      </div>
    </div>
  );
}
