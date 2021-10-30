import React, { useRef, useEffect, useState } from 'react';

export type UseCanvasOptions = {
    preDraw?: (ctx: CanvasRenderingContext2D, stage: string, relativeDuration: number) => void,
    drawSelected?: (ctx: CanvasRenderingContext2D) => void
}

const swapAnimationTime = 500;
const deleteAnimationTime = 300;
const fillAnimationTime = 700;

// todo [sitnik] механизм анимации необходимо разделить, т.к. delete и fill могут возникнуть и без swap

const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void,
  options: UseCanvasOptions): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [init, setInit] = useState(true);

  function animationInPromise(ctx: CanvasRenderingContext2D, duration: number, stage: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (options.preDraw) {
        const startTime: number = performance.now();
        const preDrawAnimation = (): void => {
          const time: number = performance.now();
          const shiftTime = time - startTime;
          const relativeDuration = shiftTime / duration;
          if (options.preDraw) {
            options.preDraw(ctx, stage, relativeDuration);
          }
          if (relativeDuration < 1) {
            requestAnimationFrame(preDrawAnimation);
          } else {
            resolve('success');
          }
        };
        preDrawAnimation();
      } else {
        reject(new Error('no predraw'));
      }
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      if (init) {
        draw(context);
        setInit(false);
      } else {
        animationInPromise(context, swapAnimationTime, 'swap')
          .then(() => Promise.resolve(options.preDraw!(context, 'delete', deleteAnimationTime)))
          .catch(console.log)
          .then(() => animationInPromise(context, fillAnimationTime, 'fill'))
          .catch(console.log)
          .then(() => {
            draw(context);
          })
          .catch(console.log);
      }
    }
  }, [draw]);

  return canvasRef;
};
export default useCanvas;
