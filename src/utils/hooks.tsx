import React, { useRef, useEffect, useState } from 'react';

type Options = {
  predraw?: (ctx: CanvasRenderingContext2D, stage: string, relativeDuration: number) => void
  postdraw?: (ctx: CanvasRenderingContext2D) => void
}

const useCanvas = (draw: (ctx: CanvasRenderingContext2D) => void,
  options: Options): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [firstAnimationTime, setFirstAnimationTime] = useState(0);
  const [secondAnimationTime, setSecondAnimationTime] = useState(0);
  const [thirdAnimationTime, setThirdAnimationTime] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    function animationInPromise(duration: number, stage: string): Promise<string> {
      return new Promise((resolve, reject) => {
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
        } else {
          reject(new Error('no predraw'));
        }
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
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
