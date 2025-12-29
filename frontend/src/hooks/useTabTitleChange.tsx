import { useEffect, useRef } from "react";

export function useTabTitleChange(
  rotatingTitles = [
    "Come back 👀",
    "We miss you 💔",
    "Sale waiting 🛍️",
  ],
  delay = 2000
) {
  const originalTitleRef = useRef(document.title);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // always clear first (important)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (document.hidden) {
        // wait before starting rotation
        timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
            document.title =
              rotatingTitles[indexRef.current % rotatingTitles.length];
            indexRef.current++;
          }, 2000);
        }, delay);
      } else {
        // user returned
        document.title = originalTitleRef.current;
        indexRef.current = 0;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [rotatingTitles, delay]);
}
