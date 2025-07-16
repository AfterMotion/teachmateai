// Exam Module JavaScript

class ExamManager {
    constructor() {
        this.exams = [
            {
                id: 1,
                name: 'Text Exam 1',
                status: 'active',
                createdDate: 'Dec 15, 2024',
                totalMarks: 100,
                duration: 60,
                questions: 10
            },
            {
                id: 2,
                name: 'Mathematics Quiz',
                status: 'draft',
                createdDate: 'Dec 14, 2024',
                totalMarks: 50,
                duration: 30,
                questions: 5
            },
            {
                id: 3,
                name: 'Science Assessment',
                status: 'completed',
                createdDate: 'Dec 13, 2024',
                totalMarks: 75,
                duration: 45,
                questions: 8
            }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        const createExamBtn = document.getElementById('createExamBtn');
        
        if (createExamBtn) {
            createExamBtn.addEventListener('click', () => {
                this.createNewExam();
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

    createNewExam() {
        // Navigate to create exam page
        window.location.href = 'exam.create.html';
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
        }, 3000);
    }
}

// Global functions for exam actions
function editExam(examId) {
    // Navigate to edit exam page
    window.location.href = `exam.edit.html?id=${examId}`;
}

function addUser(examId) {
    // Navigate to add user page
    window.location.href = `exam.adduser.html?id=${examId}`;
}

function getWidgetCode(examId) {
    // Navigate to widget code page
    window.location.href = `exam.widget.html?id=${examId}`;
}

function viewResult(examId) {
    // Navigate to results page
    window.location.href = `exam.result.html?id=${examId}`;
}

function createNewExam() {
    // Navigate to create exam page
    window.location.href = 'exam.create.html';
}

// Initialize the exam manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.examManager = new ExamManager();
});

// Add CSS animations for notifications
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