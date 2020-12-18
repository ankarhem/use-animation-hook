import React, { useState, useEffect, useRef } from 'react';

export const useAnimation = (
  cb: () => {
    delay: number;
    duration: number;
    css: (t: number) => React.CSSProperties;
  },
  options?: { animateOnRender?: boolean },
  deps: any[] = []
) => {
  const [componentStyles, setStyles] = useState<React.CSSProperties>();
  const frame = useRef<number>();
  const lastTime = useRef(performance.now());
  const initTime = useRef(performance.now());
  const { delay, duration, css } = cb();

  const triggerAnimation = () => {
    lastTime.current = 0;
    initTime.current = performance.now();
    frame.current = requestAnimationFrame(animate);
  };

  const animate = React.useCallback(() => {
    // In ms
    const now = performance.now();
    const time = now - initTime.current;

    if (lastTime.current - delay <= duration) {
      // time normalized to represent progression
      // t >= 0, t<= 1
      const t = Math.min((time - delay) / duration, 1);
      const currentStyles = css(t);
      setStyles(currentStyles);

      frame.current = requestAnimationFrame(animate);
      lastTime.current = time;
    } else {
      setStyles(undefined);
    }
  }, [delay, duration, css]);

  useEffect(() => {
    if (
      typeof options?.animateOnRender === 'undefined' ||
      options.animateOnRender
    ) {
      frame.current = requestAnimationFrame(animate);
    }
    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [...deps, animate, options?.animateOnRender]); // Make sure to change it if the deps change

  return { styles: componentStyles, triggerAnimation };
};
