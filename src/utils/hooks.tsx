import React, { useRef, useEffect } from 'react';

type Options = {
  predraw?: (ctx: CanvasRenderingContext2D, relativeDuration: number) => void
  postdraw?: (ctx: CanvasRenderingContext2D) => void
}

const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void,
  options: Options): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    const promise = new Promise((resolve) => {
      if (options.predraw) {
        const startTime: number = performance.now();
        const animationTime: number = 500;
        const predrawanimation = (): void => {
          const time: number = performance.now();
          const shiftTime = time - startTime;
          const relativeDuration = shiftTime / animationTime;
          if (options.predraw) {
            options.predraw(context, relativeDuration);
          }
          if (relativeDuration < 1) {
            requestAnimationFrame(predrawanimation);
          } else {
            resolve('success');
          }
        };
        predrawanimation();
      }
    });
    promise.then(() => draw(context));
    //draw(context);

    /*     let frameCount = 30;
    let animationFrameId: number;
    const render = (): void => {
      frameCount++;
      draw(context, frameCount);
      if (options.postdraw) {
        options.postdraw(context, frameCount);
      }
      //animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return (): void => {
      window.cancelAnimationFrame(animationFrameId);
    }; */
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
