
// @ts-ignore
export const  drawLine = (context, x1, y1, x2, y2) => {

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

// @ts-ignore
export const drawRect = (context, x, y, width, height) => {
    context.beginPath();
    context.clearRect(0,0,window.innerWidth,window.innerHeight)
    context.rect(x, y, width, height);
    context.stroke();
    context.closePath();
}



