import { useState, RefObject, useEffect } from "react";

export default function useIsInViewport(
  ref: RefObject<HTMLElement>,
  parentRef: any
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const options = {
    root: parentRef.current,
    rootMargin: "0px",
    threshold: 0.9,
  };

  const observer = new IntersectionObserver(
    ([entry]) => setIsIntersecting(entry.isIntersecting),
    options
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref.current, observer]);

  return isIntersecting;
}
