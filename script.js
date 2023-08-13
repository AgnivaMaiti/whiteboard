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

const languageSelector = document.getElementById('languageSelector');

languageSelector.addEventListener('change', function() {
    const selectedLanguage = languageSelector.value;
    changeLanguage(selectedLanguage);
});

const translations = {
    en: {
        welcomeMessage: 'Virtual Whiteboard',
        DrawAsYouLike: 'Draw as you like:',
        MadeBy: 'Made by Agniva Maiti'
    },
    bn: {
        welcomeMessage: 'ভার্চুয়াল হোয়াইটবোর্ড',
        DrawAsYouLike: 'আপনার ইচ্ছা মত আঁকো:',
        MadeBy: ' অগ্নিভ মাইতি দ্বারা বানানো'
    },
    hi: {
        welcomeMessage: 'वर्चुअल व्हाइटबोर्ड',
        DrawAsYouLike: 'जैसा चाहो वैसा चित्र बनाओ:',
        MadeBy: 'अग्निभ माइति द्वारा बनाया गया'
    },
    ur: {
        welcomeMessage: 'ورچوئل وائٹ بورڈ',
        DrawAsYouLike: ':اپنی مرضی کے مطابق تصویر بنائیں',
        MadeBy: ' اگنیبھ مایتی کا بنایا ہوا'
    }
};

function changeLanguage(language) {
    const translation = translations[language];
    document.getElementById('welcomeMessage').textContent = translation.welcomeMessage;
    document.getElementById('DrawAsYouLike').textContent = translation.DrawAsYouLike;
    document.getElementById('MadeBy').textContent = translation.MadeBy;

}

changeLanguage('en'); 