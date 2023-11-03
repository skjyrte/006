import { useState, RefObject, useMemo, useEffect } from "react";

export default function useIsInViewport(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    [] // will calculate useMemo once, on mount.
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, observer]); //if ref or observer changes, disconnect the observer.

  return isIntersecting;
}
