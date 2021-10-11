import React, { useRef, useEffect } from 'react';

type Options = {
  predraw?: (ctx: CanvasRenderingContext2D, frameCount: number) => void
  postdraw?: (ctx: CanvasRenderingContext2D, frameCount: number) => void
}

const useCanvas = (draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  options: Options): React.RefObject<HTMLCanvasElement> => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    let frameCount = 30;
    let animationFrameId: number;
    const render = (): void => {
      frameCount++;
      if (options.predraw) {
        options.predraw(context, frameCount);
      }
      draw(context, frameCount);
      if (options.postdraw) {
        options.postdraw(context, frameCount);
      }
      //animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return (): void => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);
  return canvasRef;
};
export default useCanvas;
