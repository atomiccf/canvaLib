import {useLayoutEffect, useRef, useState} from "react";
import {drawRect} from '../../scripts/shape'
import React from "react";

export const Canvas = () => {
      const root = document.getElementById('root')
      const canvas = useRef<HTMLCanvasElement>(null)

      const [isDrawing, setIsDrawing] = useState(false)
      const [x, setX] = useState<number>(0)
      const [y, setY] = useState<number>(0)

    useLayoutEffect(() => {
        const context = canvas.current!.getContext('2d')
        const canvasOffset = canvas.current!.getBoundingClientRect();
        const canvasX = Math.round(canvasOffset?.left); // Subtract the 'left' of the canvas

      // @ts-ignore
      const mouseDown = (e) => {
          const canvasX = Math.round(e.clientX - canvasOffset?.left); // Subtract the 'left' of the canvas
          const canvasY = Math.round(e.clientY - canvasOffset?.top);

          setX(canvasX);
          setY(canvasY);
          setIsDrawing(true);
      }

      // @ts-ignore
      const mouseMove = (e) => {
          if (!isDrawing) return;
          const newX = Math.round(e.clientX - canvasOffset?.left); // Subtract the 'left' of the canvas
          const newY = Math.round(e.clientY - canvasOffset?.top);
          const width = newX - x
          const height = newY - y
          drawRect(context,x,y, width, height)

          setX(canvasX);
          setY(canvasX);
      }


      // @ts-ignore
      const mouseUp = (e) => {
          if (!isDrawing) return;
          setIsDrawing(false);
      }



          // @ts-ignore
        canvas!.current.addEventListener('mousedown', mouseDown);
          // @ts-ignore
        canvas!.current.addEventListener('mousemove', mouseMove);
          window.addEventListener("mouseup", mouseUp);
          return () => {
              // @ts-ignore
              canvas!.current.removeEventListener('mousedown', mouseDown)
              // @ts-ignore
              canvas!.current.removeEventListener('mousemove', mouseMove)
              window.removeEventListener("mouseup", mouseUp)
          }
      })
    return (
        <canvas id="canvas" width={root!.offsetWidth} height={root!.offsetHeight} ref={canvas!} ></canvas>
    )
}