const canvas = document.getElementById('whiteboard');
const context = canvas.getContext('2d');
const whiteboardContainer = document.querySelector('.whiteboard-container');
let drawing = false;

resizeCanvas();

context.strokeStyle = '#000';
context.lineWidth = 3;
context.lineCap = 'round';

canvas.addEventListener('mousedown', handleStartDrawing);
canvas.addEventListener('mousemove', handleDraw);
canvas.addEventListener('mouseup', handleStopDrawing);
canvas.addEventListener('mouseleave', handleStopDrawing);

canvas.addEventListener('touchstart', handleStartDrawing);
canvas.addEventListener('touchmove', handleDraw);
canvas.addEventListener('touchend', handleStopDrawing);
canvas.addEventListener('touchcancel', handleStopDrawing);

function handleStartDrawing(e) {
    e.preventDefault();
    drawing = true;
    const [x, y] = getXY(e);
    context.beginPath();
    context.moveTo(x, y);
}

function handleDraw(e) {
    if (!drawing) return;
    const [x, y] = getXY(e);
    context.lineTo(x, y);
    context.stroke();
    e.preventDefault();
}

function handleStopDrawing() {
    drawing = false;
    context.beginPath();
}

function getXY(event) {
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (event.touches && event.touches.length === 1) {
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
    } else if (event.clientX !== undefined && event.clientY !== undefined) {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    return [clientX - rect.left, clientY - rect.top];
}

function resizeCanvas() {
    canvas.width = whiteboardContainer.clientWidth;
    canvas.height = whiteboardContainer.clientHeight;
}

window.addEventListener('resize', resizeCanvas);
