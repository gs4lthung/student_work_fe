"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Banner data with images and optional content
const bannerData = [
  {
    id: 1,
    image:
      "https://invietnhat.vn/wp-content/uploads/2023/08/mau-banner-tuyen-dung.jpg",
  },
  {
    id: 2,
    image:
      "https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/banners/At1NZpMftgJXJ9YKgefZ.jpg",
  },
  {
    id: 3,
    image:
      "https://inan2h.vn/wp-content/uploads/2022/11/banner-tuyen-dung-2.jpg",
  },
  {
    id: 4,
    image:
      "https://bangrondongdo.com/wp-content/uploads/2024/12/banner-tuyen-dung-13.jpg",
  },
  {
    id: 5,
    image:
      "https://inan2h.vn/wp-content/uploads/2022/11/banner-tuyen-dung-6.jpg",
  },
  {
    id: 6,
    image:
      "https://treobangrongiare.vn/wp-content/uploads/2021/04/banner-tuyen-dung.jpg",
  },
  {
    id: 7,
    image:
      "https://arena.fpt.edu.vn/wp-content/uploads/2022/10/banner-tuyen-dung-2.jpg",
  },
  {
    id: 8,
    image:
      "https://inan2h.vn/wp-content/uploads/2022/11/banner-tuyen-dung-14.jpg",
  },
];

export function Banner({
  width = 500,
  height = 200,
}: React.HTMLAttributes<HTMLDivElement> & { width?: number; height?: number }) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();
    carouselApi.on("select", updateCarouselState);

    const interval = setInterval(() => {
      // Auto navigate to next slide
      carouselApi.scrollTo((currentIndex + 1) % bannerData.length);
    }, 5000); // Change 5000 to any duration in ms

    return () => {
      carouselApi.off("select", updateCarouselState);
      clearInterval(interval); // Clear on unmount
    };
  }, [carouselApi, currentIndex]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="relative mx-auto mt-5 lg:mt-6" style={{ width, height }}>
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="w-full h-full"
      >
        <CarouselContent>
          {bannerData.map((banner, index) => (
            <CarouselItem key={banner.id}>
              <div
                className="relative overflow-hidden rounded-xl"
                style={{ width, height }}
              >
                <Image
                  src={banner.image || "/placeholder.svg"}
                  alt={banner.id.toString()}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes={`${width}px`}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows - Improved styling */}
      <div className="absolute inset-0 z-20 flex items-center justify-between pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto ml-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-md hover:bg-white/30 transition-colors border border-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto mr-4 h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm text-white shadow-md hover:bg-white/30 transition-colors border border-white/10"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Navigation Dots - Enhanced styling */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-white w-8 shadow-md"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
