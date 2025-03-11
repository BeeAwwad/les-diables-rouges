"use client";

import * as React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { cn } from "@/utils/cn";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The items to display in the carousel
   */
  items: React.ReactNode[];
  /**
   * The interval in milliseconds between automatic slides
   * Set to 0 to disable automatic sliding
   * @default 5000
   */
  interval?: number;
  /**
   * Whether to pause automatic sliding when hovering over the carousel
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Whether to show navigation buttons
   * @default true
   */
  showNavigation?: boolean;
  /**
   * Whether to show indicators
   * @default true
   */
  showIndicators?: boolean;
  /**
   * Whether to loop the carousel
   * @default true
   */
  loop?: boolean;
}

export type RatingProps = {
  name: string;
  number: number;
};

export const PlayerSlide = ({ name, number }: RatingProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-2 rounded-lg bg-white p-3 py-5 sm:gap-4 sm:p-6 sm:py-8">
      <span className="text-lg font-medium">{name}</span>
      <span className="text-3xl font-semibold">{number}</span>
    </div>
  );
};

export const Carousel = ({
  items,
  interval = 5000,
  pauseOnHover = true,
  showNavigation = true,
  showIndicators = true,
  loop = true,
  className,
  ...props
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const totalItems = items.length;

  // Handle automatic sliding
  React.useEffect(() => {
    if (interval <= 0 || isPaused) return;

    const timer = setInterval(() => {
      if (currentIndex === totalItems - 1) {
        if (loop) setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, isPaused, loop, totalItems]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    if (currentIndex === 0) {
      if (loop) setCurrentIndex(totalItems - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === totalItems - 1) {
      if (loop) setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Pause on hover handlers
  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className={cn("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Carousel content */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {item}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      {showNavigation && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary-300"
            aria-label="Previous slide"
          >
            <Icon icon="iconamoon:arrow-left-2" className="size-6" />
          </button>
          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-primary-200"
            aria-label="Next slide"
          >
            <Icon icon="iconamoon:arrow-right-2" className="size-6" />
          </button>
        </>
      )}
    </div>
  );
};
