import React from 'react';
import useCanvas from '../../utils/hooks';

type drawHandlers = {
  draw: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  predraw?: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  postdraw?: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
  //predrawanimation?: (ctx: CanvasRenderingContext2D, frameCount: number) => void,
}

type Props = drawHandlers & React.CanvasHTMLAttributes<HTMLCanvasElement>

const Canvas: React.FC<Props> = ({
  draw, predraw, postdraw, /* predrawanimation, */ ...rest
}) => {
  const canvasRef = useCanvas(draw, { predraw, postdraw/* , predrawanimation */ });
  return <canvas ref={canvasRef} {...rest} />;
};
export default Canvas;
