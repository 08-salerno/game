import { reject } from 'lodash';
import React, { useRef, useEffect, useState } from 'react';

type Options = {
  predraw?: (ctx: CanvasRenderingContext2D, stage: string, relativeDuration: number) => void
  postdraw?: (ctx: CanvasRenderingContext2D) => void
}

const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void,
  options: Options): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [firstAnimationTime, setFirstAnimationTime] = useState<number>(0);
  const [secondAnimationTime, setSecondAnimationTime] = useState<number>(0);
  const [thirdAnimationTime, setThirdAnimationTime] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    function animationInPromise(duration: number, stage: string): Promise<string> {
      return new Promise((resolve) => {
        if (options.predraw) {
          const startTime: number = performance.now();
          const predrawanimation = (): void => {
            const time: number = performance.now();
            const shiftTime = time - startTime;
            const relativeDuration = shiftTime / duration;
            if (options.predraw) {
              options.predraw(context, stage, relativeDuration);
            }
            if (relativeDuration < 1) {
              requestAnimationFrame(predrawanimation);
            } else {
              resolve('success');
            }
          };
          predrawanimation();
        }
        reject('no predraw');
      });
    }
    function resetAnimationsTime(): void {
      setFirstAnimationTime(500);
      setSecondAnimationTime(300);
      setThirdAnimationTime(700);
    }

    animationInPromise(firstAnimationTime, 'swap')
      .then(() => animationInPromise(secondAnimationTime, 'delete'))
      .catch(console.log)
      .then(() => animationInPromise(thirdAnimationTime, 'fill'))
      .catch(console.log)
      .then(() => {
        draw(context);
        resetAnimationsTime();
      })
      .catch(console.log);
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
