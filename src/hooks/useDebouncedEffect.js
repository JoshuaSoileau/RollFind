/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Taken from: https://github.com/samanmohamadi/use-debounced-effect/blob/master/src/index.js
 */
import { useEffect, useRef } from "react";

export function useDebouncedEffect(callback, delay, deps = []) {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay, ...deps]);
}

export default useDebouncedEffect;
