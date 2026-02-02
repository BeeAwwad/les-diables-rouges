"use client";

import * as React from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  /**
   * @default 5000
   */
  interval?: number;
  /**
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * @default true
   */
  showNavigation?: boolean;
  /**
   * @default true
   */
  showIndicators?: boolean;
  /**
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
      <span className="text-3xl font-semibold lg:text-5xl">{number}</span>
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
  const totalItems = items.length;
  const extendedItems = [items[totalItems - 1], ...items, items[0]];
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(true);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-slide effect
  React.useEffect(() => {
    if (interval <= 0 || isPaused) return;
    const timer = setInterval(() => {
      goToNextSlide();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, isPaused]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevSlide = () => {
    if (currentIndex === 1) {
      // If going from first real item to last, jump instantly then animate
      setIsTransitioning(false);
      setCurrentIndex(totalItems);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(totalItems - 1);
      }, 50);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentIndex === totalItems) {
      // If at the last real item, jump instantly then animate
      setIsTransitioning(false);
      setCurrentIndex(0);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 50);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Pause on hover handlers
  const handleMouseEnter = () => pauseOnHover && setIsPaused(true);
  const handleMouseLeave = () => pauseOnHover && setIsPaused(false);

  return (
    <div
      className={clsx("relative w-full overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Carousel content */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedItems.map((item, index) => (
          <div key={index} className="w-full shrink-0">
            {item}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      {showNavigation && totalItems > 1 && (
        <>
          <button
            onClick={goToPrevSlide}
            className="focus:ring-primary-300 absolute top-1/2 left-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xs transition-all hover:bg-black/30 focus:ring-2 focus:outline-hidden"
            aria-label="Previous slide"
          >
            <ArrowLeft className="size-6" />
          </button>
          <button
            onClick={goToNextSlide}
            className="focus:ring-primary-300 absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-xs transition-all hover:bg-black/30 focus:ring-2 focus:outline-hidden"
            aria-label="Next slide"
          >
            <ArrowRight className="size-6" />
          </button>
        </>
      )}
    </div>
  );
};
