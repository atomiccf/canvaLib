import {useEffect, useRef, useState} from "react";
import {drawLine, drawRect} from '../../scripts/shape'
// @ts-ignore
import React from "react";
type CanvasProps = {
    image: string ;
}

export const Canvas:React.FC<CanvasProps> = ({image}) => {

    const canvas = useRef<HTMLCanvasElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const tab = document.getElementById('tabs')



    useEffect(() => {

        const context = canvas.current!.getContext('2d')
        const canvasOffset = canvas.current!.getBoundingClientRect();

        const canvasX = Math.round(canvasOffset?.left); // Subtract the 'left' of the canvas
        const img = new Image();

        img.onload = function() {
            context?.drawImage(img, 0, 0);
        }
        img.src = `${image}`


        const mouseDown = (e: MouseEvent) => {
            const canvasX = Math.round(e.clientX - canvasOffset?.left); // Subtract the 'left' of the canvas
            const canvasY = Math.round(e.clientY - canvasOffset?.top);

            setX(canvasX);
            setY(canvasY);
            setIsDrawing(true);
        }

        const mouseMove = (e: MouseEvent) => {
            if (!isDrawing) return;
            const newX = Math.round(e.clientX - canvasOffset?.left); // Subtract the 'left' of the canvas
            const newY = Math.round(e.clientY - canvasOffset?.top);
            const width = newX - x
            const height = newY - y
            drawLine(context, x, y, width, height)

            setX(canvasX);
            setY(canvasX);
        }

        const mouseUp = () => {
            if (!isDrawing) return;
            setIsDrawing(false);
        }

        if (canvas && canvas.current) {
            canvas?.current.addEventListener('mousedown', mouseDown);
            canvas?.current.addEventListener('mousemove', mouseMove);

        }
        window.addEventListener("mouseup", mouseUp);
        return () => {

            if (canvas && canvas.current) {
                canvas.current.removeEventListener('mousedown', mouseDown);
                canvas.current.removeEventListener('mousemove', mouseMove);
            }
            window.removeEventListener("mouseup", mouseUp)
        }
    })

    return (
        <canvas id="canvas" width={tab?.offsetWidth} height="300px" ref={canvas!}></canvas>
    )
}