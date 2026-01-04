let timeLeft = 25 * 60;
let timerId = null;
let currentMode = 'work';

const timerDisplay = document.querySelector('#timer');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    timerDisplay.textContent = timeString;
    document.title = `${timeString} - Pomodoro`;
}

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const minutes = parseInt(button.getAttribute('data-time'));
        currentMode = button.getAttribute('data-mode');
        
        timeLeft = minutes * 60;
        document.documentElement.style.setProperty('--current-bg', `var(--${currentMode}-bg)`);
        startBtn.style.color = `var(--${currentMode}-bg)`;

        stopTimer();
        updateDisplay();
    });
});

function startTimer() {
    if (timerId !== null) return;
    
    startBtn.textContent = "PAUSE";
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alert("Waktu habis!");
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = "START";
}

startBtn.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        stopTimer();
    }
});

resetBtn.addEventListener('click', () => {
    const activeBtn = document.querySelector('.mode-btn.active');
    timeLeft = parseInt(activeBtn.getAttribute('data-time')) * 60;
    stopTimer();
    updateDisplay();
});

updateDisplay();