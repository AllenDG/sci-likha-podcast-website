import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT;
    }
    return false;
  });

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Modern browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handleResize);
    } else {
      // Fallback for older browsers
      mql.addListener(handleResize);
    }

    // Also listen to resize events for better compatibility
    window.addEventListener('resize', handleResize);
    
    // Set initial value
    handleResize();

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleResize);
      } else {
        mql.removeListener(handleResize);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return isMobile;
}
