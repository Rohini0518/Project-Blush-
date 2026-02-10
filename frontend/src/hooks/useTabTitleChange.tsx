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
      // console.log(timeoutRef.current,"timeoutref.current")
      if (timeoutRef.current) {
        
        clearTimeout(timeoutRef.current)};
      if (intervalRef.current){
        // console.log("clear interval -first -mount")
        clearInterval(intervalRef.current)};

      if (document.hidden) {
        // wait before starting rotation
        timeoutRef.current = setTimeout(() => {
            // console.log("set-timeout,delay,2000")

          intervalRef.current = setInterval(() => {
            // console.log("set-interval,1000")
            document.title =
              rotatingTitles[indexRef.current % rotatingTitles.length];
            indexRef.current++;
          }, 2000);
        }, delay);
      } else {
        // user returned
        document.title = originalTitleRef.current;
        indexRef.current = 0;
        // console.log("user returned")
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      if (timeoutRef.current){      
          //  console.log("clear timeout")
       clearTimeout(timeoutRef.current)};
      if (intervalRef.current) {
        // console.log("clear timeout")
        clearInterval(intervalRef.current)};
    };
  }, [rotatingTitles, delay]);
}
