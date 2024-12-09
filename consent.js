// consent.js
class DateSelector {
    constructor() {
        this.yearSelect = document.getElementById('yearSelect');
        this.monthSelect = document.getElementById('monthSelect');
        this.daySelect = document.getElementById('daySelect');
        this.consentButton = document.getElementById('consentButton');
        
        this.initializeSelectors();
        this.setupEventListeners();
    }

    initializeSelectors() {
        // 年の選択肢を生成
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= 1920; year--) {
            this.createOption(this.yearSelect, year, year);
        }

        // 月の選択肢を生成
        for (let month = 1; month <= 12; month++) {
            this.createOption(this.monthSelect, month, month);
        }
    }

    createOption(select, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    updateDays() {
        const year = parseInt(this.yearSelect.value);
        const month = parseInt(this.monthSelect.value);
        const selectedDay = this.daySelect.value;
        
        this.daySelect.innerHTML = '<option value="">日</option>';
        
        if (year && month) {
            const daysInMonth = new Date(year, month, 0).getDate();
            for (let day = 1; day <= daysInMonth; day++) {
                this.createOption(this.daySelect, day, day);
            }
            if (selectedDay && selectedDay <= daysInMonth) {
                this.daySelect.value = selectedDay;
            }
        }
    }

    checkCompletion() {
        const isComplete = this.yearSelect.value && 
                          this.monthSelect.value && 
                          this.daySelect.value;
        this.consentButton.disabled = !isComplete;
    }

    handleConsent() {
        const day = parseInt(this.daySelect.value);
        const redirectUrl = day % 2 === 1 
            ? 'https://hirao-kukutyann.vercel.app/'
            : 'https://hirao-kukucyan-experiment.vercel.app/';
        
        window.location.href = redirectUrl;
    }

    setupEventListeners() {
        // 日付更新のイベントリスナー
        this.yearSelect.addEventListener('change', () => {
            this.updateDays();
            this.checkCompletion();
        });
        
        this.monthSelect.addEventListener('change', () => {
            this.updateDays();
            this.checkCompletion();
        });

        this.daySelect.addEventListener('change', () => this.checkCompletion());

        // 同意ボタンのイベントリスナー
        this.consentButton.addEventListener('click', () => this.handleConsent());
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new DateSelector();
});