import { Image, Product, Review } from "@/generated/prisma/client";
import Stars from "@/components/product/Stars";
import ImageDisplay from "@/components/product/ImageDisplay";

interface ProductViewProps extends Product {
  reviews: Review[];
  images: Image[];
}

export default async function ProductView({
  product,
}: {
  product: ProductViewProps;
}) {
  if (!product) {
    return <div>Product not found</div>;
  }

  const totalRating = product.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const averageRating =
    product.reviews.length > 0 ? totalRating / product.reviews.length : 0;

  const imageUrls = product.images.map((image) => image.url);

  return (
    <div className="gap-6 grid">
      <ImageDisplay images={imageUrls} />
      <div className="gap-2 grid">
        <h1 className="font-bold text-3xl">{product.name}</h1>
        <p className="text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <div className="flex items-center gap-4">
          <span className="font-bold text-4xl">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-0.5">
            <Stars rating={averageRating} />
          </div>
        </div>
      </div>
    </div>
  );
}
