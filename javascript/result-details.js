// Result Details Page JavaScript

class ResultDetailsManager {
    constructor() {
        this.studentId = this.getStudentIdFromUrl();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.loadStudentData();
    }

    getStudentIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('student') || '1';
    }

    setupEventListeners() {
        const printBtn = document.getElementById('printBtn');

        if (printBtn) {
            printBtn.addEventListener('click', () => {
                this.printReport();
            });
        }
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const html = document.documentElement;
        
        // Check for saved theme preference or default to light
        const currentTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
        });
    }

    updateThemeIcon(theme) {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const icon = themeToggle.querySelector('i');
        if (!icon) return;
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    loadStudentData() {
        // Simulate loading student data from API
        const studentData = {
            1: {
                name: 'John Doe',
                id: '001',
                phone: '01840000000',
                totalMarks: 100,
                percentage: 100,
                status: 'passed',
                correctAnswers: 8,
                incorrectAnswers: 2,
                timeTaken: '45 min',
                performance: 'Excellent',
                questions: [
                    {
                        number: 1,
                        text: 'Sample Question',
                        status: 'correct',
                        options: [
                            { label: 'A', text: 'Sample Option' },
                            { label: 'B', text: 'Sample Option' },
                            { label: 'C', text: 'Sample Option (Correct)', correct: true },
                            { label: 'D', text: 'Sample Option' }
                        ],
                        studentAnswer: 'C',
                        studentAnswerText: 'C - Sample Option (Correct)'
                    },
                    {
                        number: 2,
                        text: 'What is the capital of Bangladesh?',
                        status: 'incorrect',
                        options: [
                            { label: 'A', text: 'Chittagong' },
                            { label: 'B', text: 'Dhaka (Correct)', correct: true },
                            { label: 'C', text: 'Sylhet' },
                            { label: 'D', text: 'Rajshahi' }
                        ],
                        studentAnswer: 'A',
                        studentAnswerText: 'A - Chittagong'
                    },
                    {
                        number: 3,
                        text: 'Which programming language is known as the language of the web?',
                        status: 'correct',
                        options: [
                            { label: 'A', text: 'Python' },
                            { label: 'B', text: 'Java' },
                            { label: 'C', text: 'C++' },
                            { label: 'D', text: 'JavaScript (Correct)', correct: true }
                        ],
                        studentAnswer: 'D',
                        studentAnswerText: 'D - JavaScript (Correct)'
                    }
                ]
            }
        };

        const student = studentData[this.studentId];
        if (student) {
            this.updateStudentInfo(student);
            this.updateQuestionsList(student.questions);
            this.updatePerformanceSummary(student);
        }
    }

    updateStudentInfo(student) {
        const studentName = document.querySelector('.student-name');
        const studentId = document.querySelector('.student-id');
        const totalMarks = document.querySelector('.performance-item .value');

        if (studentName) {
            studentName.textContent = student.name;
        }

        if (studentId) {
            studentId.textContent = `ID: ${student.id} | Phone: ${student.phone}`;
        }

        if (totalMarks) {
            totalMarks.textContent = `${student.totalMarks}/100`;
        }
    }

    updateQuestionsList(questions) {
        const questionsList = document.getElementById('questionsList');
        if (!questionsList) return;

        questionsList.innerHTML = questions.map(question => `
            <div class="question-item">
                <div class="question-header">
                    <span class="question-number">Q${question.number}</span>
                    <span class="question-status ${question.status}">
                        <i class="fas fa-${question.status === 'correct' ? 'check' : 'times'}"></i>
                        ${question.status === 'correct' ? 'Correct' : 'Incorrect'}
                    </span>
                </div>
                <div class="question-content">
                    <h4 class="question-text">${question.text}</h4>
                    <div class="options-list">
                        ${question.options.map(option => `
                            <div class="option-item ${option.correct ? 'correct' : ''}">
                                <span class="option-label">${option.label}.</span>
                                <span class="option-text">${option.text}</span>
                                ${option.correct ? `
                                    <span class="correct-badge">
                                        <i class="fas fa-check"></i>
                                    </span>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                    <div class="student-answer">
                        <span class="answer-label">Student's Answer:</span>
                        <span class="answer-value ${question.status}">${question.studentAnswerText}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updatePerformanceSummary(student) {
        const summaryCards = document.querySelectorAll('.summary-card .card-value');
        if (summaryCards.length >= 4) {
            summaryCards[0].textContent = `${student.correctAnswers}/10`;
            summaryCards[1].textContent = `${student.incorrectAnswers}/10`;
            summaryCards[2].textContent = student.timeTaken;
            summaryCards[3].textContent = student.performance;
        }
    }

    printReport() {
        const printBtn = document.getElementById('printBtn');
        const originalText = printBtn.innerHTML;
        
        // Show loading state
        printBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        printBtn.disabled = true;

        // Simulate print preparation
        setTimeout(() => {
            // Create print-friendly version
            this.createPrintVersion();
            
            // Show success message
            this.showNotification('Report prepared for printing!', 'success');
            
            // Reset button
            printBtn.innerHTML = originalText;
            printBtn.disabled = false;
        }, 1500);
    }

    createPrintVersion() {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        const studentName = document.querySelector('.student-name')?.textContent || 'Student';
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Result Report - ${studentName}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: white;
                        color: black;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #333;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .student-info {
                        background: #f5f5f5;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 30px;
                    }
                    .question {
                        margin-bottom: 30px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        overflow: hidden;
                    }
                    .question-header {
                        background: #f0f0f0;
                        padding: 15px;
                        border-bottom: 1px solid #ddd;
                    }
                    .question-content {
                        padding: 20px;
                    }
                    .option {
                        margin: 10px 0;
                        padding: 10px;
                        border-left: 3px solid #ddd;
                    }
                    .option.correct {
                        border-left-color: #22c55e;
                        background: #f0f9ff;
                    }
                    .student-answer {
                        margin-top: 15px;
                        padding: 10px;
                        background: #f8f9fa;
                        border-radius: 4px;
                    }
                    .summary {
                        margin-top: 30px;
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                        gap: 20px;
                    }
                    .summary-item {
                        text-align: center;
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .summary-value {
                        font-size: 24px;
                        font-weight: bold;
                        color: #3b82f6;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>TeachMate AI</h1>
                    <h2>Result Report</h2>
                    <p>Student: ${studentName}</p>
                    <p>Date: ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="student-info">
                    <h3>Student Information</h3>
                    <p><strong>Name:</strong> ${studentName}</p>
                    <p><strong>Total Marks:</strong> 100/100</p>
                    <p><strong>Percentage:</strong> 100%</p>
                    <p><strong>Status:</strong> Passed</p>
                </div>
                
                <div class="questions">
                    <h3>Question Analysis</h3>
                    ${document.querySelector('.questions-list')?.innerHTML || ''}
                </div>
                
                <div class="summary">
                    <div class="summary-item">
                        <h4>Correct Answers</h4>
                        <div class="summary-value">8/10</div>
                    </div>
                    <div class="summary-item">
                        <h4>Incorrect Answers</h4>
                        <div class="summary-value">2/10</div>
                    </div>
                    <div class="summary-item">
                        <h4>Time Taken</h4>
                        <div class="summary-value">45 min</div>
                    </div>
                    <div class="summary-item">
                        <h4>Performance</h4>
                        <div class="summary-value">Excellent</div>
                    </div>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.focus();
        
        // Wait for content to load then print
        printWindow.onload = function() {
            printWindow.print();
            printWindow.close();
        };
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize the result details manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resultDetailsManager = new ResultDetailsManager();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 