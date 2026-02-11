'use client';

import { useState, useEffect, RefObject } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(ref?: RefObject<HTMLElement>): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } else {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref]);

  return position;
}

export function useTilt(ref: RefObject<HTMLElement>) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      setTilt({
        rotateX: y * -10,
        rotateY: x * 10,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ rotateX: 0, rotateY: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return tilt;
}
