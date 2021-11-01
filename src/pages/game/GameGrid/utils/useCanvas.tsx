// import React, { useRef, useEffect } from 'react';
// import { DrawQueueItem } from './types';
//
// const useCanvas = (drawQueue: DrawQueueItem[]): React.RefObject<HTMLCanvasElement> => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const context = canvas.getContext('2d') as CanvasRenderingContext2D;
//
//       const drawPromises = drawQueue.map((drawItem) => {
//         if (drawItem.animationTime) {
//           return (): Promise<void> => animationInPromise(context, drawItem.animationTime!, drawItem.drawFn);
//         }
//         return (): Promise<void> => Promise.resolve(drawItem.drawFn(context));
//       });
//
//       // todo [sitnik] выполнить draw после promises
//       runPromises(drawPromises);
//     }
//   }, [drawQueue]);
//
//   return canvasRef;
// };
// export default useCanvas;
//
// async function runPromises(promises: Array<() => Promise<void>>): Promise<void> {
//   if (promises.length === 0) {
//     return Promise.resolve();
//   }
//   // eslint-disable-next-line no-restricted-syntax
//   for (const promise of promises) {
//     // eslint-disable-next-line no-await-in-loop
//     await promise();
//   }
// }
//
// function animationInPromise(ctx: CanvasRenderingContext2D, duration: number, animationFn: DrawFn): Promise<void> {
//   return new Promise((resolve) => {
//     const startTime: number = performance.now();
//     const preDrawAnimation = (): void => {
//       const time: number = performance.now();
//       const shiftTime = time - startTime;
//       const relativeDuration = shiftTime / duration;
//
//       animationFn(ctx, relativeDuration);
//
//       if (relativeDuration < 1) {
//         requestAnimationFrame(preDrawAnimation);
//       } else {
//         resolve();
//       }
//     };
//     preDrawAnimation();
//   });
// }
