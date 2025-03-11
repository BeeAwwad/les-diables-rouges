"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const Overlay = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState<number>(0);

  useLayoutEffect(() => {
    let currentValue = 0;
    let timeOutId: NodeJS.Timeout;

    // Disable scrolling
    const disableScroll = () => {
      document.body.style.overflow = "hidden";
    };
    const enableScroll = () => {
      document.body.style.overflow = "";
    };

    disableScroll();

    const updateCounter = (): void => {
      if (currentValue === 100) return;

      currentValue += Math.floor(Math.random() * 10) + 1;

      if (currentValue > 100) currentValue = 100;

      setCounter(currentValue);

      let delay = Math.floor(Math.random() * 200) + 50;

      timeOutId = setTimeout(updateCounter, delay);
    };

    updateCounter();

    const counter = overlayRef.current?.querySelector(
      "#counterId",
    ) as HTMLDivElement;
    const bar = overlayRef.current?.querySelector(".bar") as HTMLDivElement;

    let ctx = gsap.context(() => {
      gsap.to(counter, {
        duration: 0.25,
        delay: 2.5,
        autoAlpha: 0,
      });
      gsap.to(bar, {
        duration: 2.5,
        delay: 2.5,
        height: 0,
        ease: "power4.out",
        onComplete: enableScroll,
      });
    }, overlayRef);

    return () => {
      clearTimeout(timeOutId);
      ctx.revert();
      enableScroll();
    };
  }, []);

  return (
    <div className="z-50" ref={overlayRef}>
      <div
        id="counterId"
        className="counter fixed flex h-full w-full items-end justify-end text-white"
      >
        <span>{counter}</span>
      </div>

      <div id="overlayId" className="overlay z-50">
        <div className="bar z-50 h-[105vh] w-full bg-primary-200"></div>
      </div>
    </div>
  );
};

export default Overlay;
