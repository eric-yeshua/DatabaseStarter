"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ImageDisplay({ images }: { images: string[] }) {
  return (
    <div className="relative w-full">
      <Carousel className="h-fit">
        <CarouselPrevious className="top-1/2 left-0 z-[100] absolute -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </CarouselPrevious>
        <CarouselContent>
          {images.map((url, index) => (
            <CarouselItem key={index}>
              <img src={url} alt="product" className="size-full object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="top-1/2 right-0 absolute -translate-y-1/2 transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </CarouselNext>
      </Carousel>
    </div>
  );
}
