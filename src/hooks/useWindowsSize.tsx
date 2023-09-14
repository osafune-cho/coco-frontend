import { useLayoutEffect, useState, useRef } from 'react';

export const useWindowSize = (delay: number = 150): number[] => {
  const [size, setSize] = useState([0, 0]);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }

      resizeTimeout.current = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
        resizeTimeout.current = null;
      }, delay);
    };

    window.addEventListener('resize', updateSize);

    return () => {
      if (resizeTimeout.current) {
        clearTimeout(resizeTimeout.current);
      }
      window.removeEventListener('resize', updateSize);
    };
  }, [delay]);

  return size;
};
