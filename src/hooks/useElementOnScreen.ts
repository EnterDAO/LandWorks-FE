import { LegacyRef, MutableRefObject, useEffect, useRef, useState } from 'react';

interface a {
  containerRef: LegacyRef<HTMLDivElement>;
  isVisible: boolean;
}

export const useElementOnScreen = (options: IntersectionObserverInit): any => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const callbackFunction = (entries: any) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};
