import React, { useEffect, useRef } from 'react';
import { DrawFn, DrawQueueItem } from '../utils/types';

type Props = { drawQueue: DrawQueueItem[] } & React.CanvasHTMLAttributes<HTMLCanvasElement>

const Canvas: React.FC<Props> = ({
  drawQueue, ...rest
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;

      const drawPromises = drawQueue.map((drawItem) => {
        if (drawItem.animationTime) {
          return (): Promise<void> => animationInPromise(context, drawItem.animationTime!, drawItem.drawFn).then(() => {
            if (drawItem.afterFn) {
              drawItem.afterFn(context);
            }
          });
        }
        return (): Promise<void> => Promise.resolve(drawItem.drawFn(context)).then(() => {
          if (drawItem.afterFn) {
            drawItem.afterFn(context);
          }
        });
      });

      runPromises(drawPromises);
    }
  }, [drawQueue]);

  return <canvas ref={canvasRef} {...rest} />;
};
export default Canvas;

async function runPromises(promises: Array<() => Promise<void>>): Promise<void> {
  if (promises.length === 0) {
    return Promise.resolve();
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const promise of promises) {
    // eslint-disable-next-line no-await-in-loop
    await promise();
  }
}

function animationInPromise(ctx: CanvasRenderingContext2D, duration: number, animationFn: DrawFn): Promise<void> {
  return new Promise((resolve) => {
    const startTime: number = performance.now();
    const preDrawAnimation = (): void => {
      const time: number = performance.now();
      const shiftTime = time - startTime;
      const relativeDuration = shiftTime / duration;

      animationFn(ctx, relativeDuration);

      if (relativeDuration < 1) {
        requestAnimationFrame(preDrawAnimation);
      } else {
        resolve();
      }
    };
    preDrawAnimation();
  });
}
