class FocusTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.originalTime = 25 * 60;
        this.isRunning = false;
        this.isPaused = false;
        this.interval = null;

        this.timeDisplay = document.getElementById('timeDisplay');
        this.startPauseBtn = document.getElementById('startPauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.add5Btn = document.getElementById('add5Btn');

        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        this.startPauseBtn.addEventListener('click', () => this.toggleStartPause());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.add5Btn.addEventListener('click', () => this.addFiveMinutes());
    }

    toggleStartPause() {
        if (!this.isRunning) {
            this.start();
        } else if (!this.isPaused) {
            this.pause();
        } else {
            this.resume();
        }
    }

    start() {
        this.isRunning = true;
        this.isPaused = false;
        this.startPauseBtn.textContent = 'Pause';
        this.startPauseBtn.classList.remove('start');
        this.startPauseBtn.classList.add('pause');
        this.stopBtn.disabled = false;

        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.timeLeft--;
                this.updateDisplay();

                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }
        }, 1000);
    }

    pause() {
        this.isPaused = true;
        this.startPauseBtn.textContent = 'Start';
        this.startPauseBtn.classList.remove('pause');
        this.startPauseBtn.classList.add('start');
    }

    resume() {
        this.isPaused = false;
        this.startPauseBtn.textContent = 'Pause';
        this.startPauseBtn.classList.remove('start');
        this.startPauseBtn.classList.add('pause');
    }

    stop() {
        if (this.isRunning || this.isPaused) {
            this.isRunning = false;
            this.isPaused = false;
            this.startPauseBtn.textContent = 'Start';
            this.startPauseBtn.classList.remove('pause');
            this.startPauseBtn.classList.add('start');
            this.stopBtn.disabled = true;
            clearInterval(this.interval);
        }
    }

    reset() {
        this.stop();
        this.timeLeft = 25 * 60;
        this.originalTime = 25 * 60;
        this.updateDisplay();
    }

    addFiveMinutes() {
        this.timeLeft += 5 * 60;
        this.updateDisplay();
    }

    complete() {
        this.stop();
        this.timeLeft = 0;
        this.updateDisplay();
        alert('Focus session completed! 🎉');
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new FocusTimer();
}); 