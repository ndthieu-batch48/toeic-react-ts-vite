import { useState, useRef, useEffect } from 'react';

type ScrollTarget = 'window' | 'container';

export const useScrollControl = (
  target: ScrollTarget = 'container',
  initialX = 0,
  initialY = 0
) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState<{ x: number; y: number }>({
    x: initialX,
    y: initialY
  });
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const scrollTo = (x: number, y: number): void => {
    if (target === 'window') {
      window.scrollTo({
        left: x,
        top: y,
        behavior: "smooth"
      });
    } else if (ref.current) {
      ref.current.scrollTo({
        left: x,
        top: y,
        behavior: "smooth"
      });
    }
  };

  const scrollBy = (deltaX: number, deltaY: number): void => {
    if (target === 'window') {
      window.scrollBy({
        left: deltaX,
        top: deltaY,
        behavior: "smooth"
      });
    } else if (ref.current) {
      ref.current.scrollBy({
        left: deltaX,
        top: deltaY,
        behavior: "smooth"
      });
    }
  };

  // Set initial scroll position for container
  useEffect(() => {
    if (target === 'container' && ref.current) {
      ref.current.scrollLeft = initialX;
      ref.current.scrollTop = initialY;
    }
  }, [initialX, initialY, target]);

  // Listen to scroll events
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (target === 'window') {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY
        });
      } else {
        const element = ref.current;
        if (!element) return;

        setScrollPosition({
          x: element.scrollLeft,
          y: element.scrollTop
        });
      }

      setIsScrolling(true);
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    if (target === 'window') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    } else {
      const element = ref.current;
      if (!element) return;

      element.addEventListener('scroll', handleScroll);

      return () => {
        element.removeEventListener('scroll', handleScroll);
        clearTimeout(scrollTimeout);
      };
    }
  }, [target]);

  return {
    ref: target === 'container' ? ref : null,
    scrollPosition,
    scrollTo,
    scrollBy,
    isScrolling
  };
};