import { useState, useMemo, useEffect } from "react";

interface ExampleProps {
  ref: React.RefObject<HTMLElement>;
}

export default function useIsInViewport(props: ExampleProps) {
  const { ref } = props;
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting)
      ),
    []
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, observer]);

  return isIntersecting;
}
