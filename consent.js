// consent.js
class DateSelector {
    constructor() {
        this.yearSelect = document.getElementById('yearSelect');
        this.monthSelect = document.getElementById('monthSelect');
        this.consentButton = document.getElementById('consentButton');
        
        this.initializeSelectors();
        this.setupEventListeners();
    }

    initializeSelectors() {
        // 年の選択肢を生成（1960年から2007年まで）
        for (let year = 2007; year >= 1960; year--) {
            this.createOption(this.yearSelect, year, `${year}年`);
        }

        // 月の選択肢を生成
        for (let month = 1; month <= 12; month++) {
            this.createOption(this.monthSelect, month, `${month}月`);
        }
    }

    createOption(select, value, text) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = text;
        select.appendChild(option);
    }

    checkCompletion() {
        const isComplete = this.yearSelect.value && this.monthSelect.value;
        this.consentButton.disabled = !isComplete;
    }

    handleConsent() {
        const year = parseInt(this.yearSelect.value);
        const month = parseInt(this.monthSelect.value);
        
        // 年と月を足した合計値で判定
        const sum = year + month;
        const redirectUrl = sum % 2 === 1 
            ? 'https://hirao-kukutyann.vercel.app/'
            : 'https://hirao-kukucyan-experiment.vercel.app/';
        
        window.location.href = redirectUrl;
    }

    setupEventListeners() {
        // 選択の変更をチェック
        this.yearSelect.addEventListener('change', () => this.checkCompletion());
        this.monthSelect.addEventListener('change', () => this.checkCompletion());

        // 同意ボタンのイベントリスナー
        this.consentButton.addEventListener('click', () => this.handleConsent());
    }
}

// アプリケーションの初期化
document.addEventListener('DOMContentLoaded', () => {
    new DateSelector();
});