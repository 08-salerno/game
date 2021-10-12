import React from 'react';
import useCanvas from '../../utils/hooks';

type drawHandlers = {
  draw: (ctx: CanvasRenderingContext2D) => void,
  predraw?: (ctx: CanvasRenderingContext2D, stage: string, relativeDuration: number) => void,
  postdraw?: (ctx: CanvasRenderingContext2D) => void,
}

type Props = drawHandlers & React.CanvasHTMLAttributes<HTMLCanvasElement>

const Canvas: React.FC<Props> = ({
  draw, predraw, postdraw, ...rest
}) => {
  const canvasRef = useCanvas(draw, { predraw, postdraw });
  return <canvas ref={canvasRef} {...rest} />;
};
export default Canvas;
