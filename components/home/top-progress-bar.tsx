"use client";

import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TopProgressBar = () => {
  const pathname = usePathname();
  const ref = useRef<LoadingBarRef | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !pathname) return;

    ref.current?.continuousStart();

    const timer = setTimeout(() => {
      ref.current?.complete();
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, isClient]);

  if (!isClient) return null;

  return (
    <LoadingBar
      color="#c72736"
      ref={ref}
      shadow
      height={3}
      transitionTime={300}
    />
  );
};

export default TopProgressBar;
