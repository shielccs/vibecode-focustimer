class FocusTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.originalTime = 25 * 60;
        this.isRunning = false;
        this.isPaused = false;
        this.interval = null;
        
        this.timeDisplay = document.getElementById('timeDisplay');
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.add5Btn = document.getElementById('add5Btn');
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.add5Btn.addEventListener('click', () => this.addFiveMinutes());
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.isPaused = false;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
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
    }
    
    pause() {
        if (this.isRunning && !this.isPaused) {
            this.isPaused = true;
            this.pauseBtn.textContent = 'Resume';
            this.startBtn.disabled = true;
        } else if (this.isRunning && this.isPaused) {
            this.isPaused = false;
            this.pauseBtn.textContent = 'Pause';
            this.startBtn.disabled = true;
        }
    }
    
    stop() {
        if (this.isRunning || this.isPaused) {
            this.isRunning = false;
            this.isPaused = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            this.pauseBtn.textContent = 'Pause';
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

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FocusTimer();
}); 