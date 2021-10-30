import React from 'react';
import useCanvas, { UseCanvasOptions } from '../../utils/hooks';

type drawHandlers = {
  draw: (ctx: CanvasRenderingContext2D) => void
} & UseCanvasOptions

type Props = drawHandlers & React.CanvasHTMLAttributes<HTMLCanvasElement>

const Canvas: React.FC<Props> = ({
  draw, preDraw, drawSelected, ...rest
}) => {
  const canvasRef = useCanvas(draw, { preDraw, drawSelected });

  return <canvas ref={canvasRef} {...rest} />;
};
export default Canvas;
