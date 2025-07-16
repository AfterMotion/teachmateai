// Result Page JavaScript

class ResultManager {
    constructor() {
        this.results = [];
        this.filteredResults = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.loadResults();
    }

    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const filterSelect = document.getElementById('filterSelect');
        const exportBtn = document.getElementById('exportBtn');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                this.handleFilter(e.target.value);
            });
        }

        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportResults();
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

    loadResults() {
        // Get exam ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const examId = urlParams.get('id') || '1';
        
        // Simulate loading results from API based on exam ID
        const examResults = {
            1: [
                {
                    id: 1,
                    name: '01840000000 (John Doe)',
                    studentId: 'ID: 001',
                    marks: 100,
                    percentage: 100,
                    status: 'passed'
                },
                {
                    id: 2,
                    name: '01840000001 (Jane Smith)',
                    studentId: 'ID: 002',
                    marks: 85,
                    percentage: 85,
                    status: 'passed'
                },
                {
                    id: 3,
                    name: '01840000002 (Mike Johnson)',
                    studentId: 'ID: 003',
                    marks: 65,
                    percentage: 65,
                    status: 'failed'
                },
                {
                    id: 4,
                    name: '01840000003 (Sarah Wilson)',
                    studentId: 'ID: 004',
                    marks: 92,
                    percentage: 92,
                    status: 'passed'
                }
            ],
            2: [
                {
                    id: 1,
                    name: '01840000004 (Alex Brown)',
                    studentId: 'ID: 005',
                    marks: 45,
                    percentage: 90,
                    status: 'passed'
                },
                {
                    id: 2,
                    name: '01840000005 (Emma Davis)',
                    studentId: 'ID: 006',
                    marks: 40,
                    percentage: 80,
                    status: 'passed'
                }
            ],
            3: [
                {
                    id: 1,
                    name: '01840000006 (Tom Wilson)',
                    studentId: 'ID: 007',
                    marks: 60,
                    percentage: 80,
                    status: 'passed'
                },
                {
                    id: 2,
                    name: '01840000007 (Lisa Anderson)',
                    studentId: 'ID: 008',
                    marks: 52,
                    percentage: 69,
                    status: 'failed'
                }
            ]
        };

        this.results = examResults[examId] || examResults[1];
        this.filteredResults = [...this.results];
        this.updateResultsDisplay();
        
        // Update exam info based on exam ID
        this.updateExamInfo(examId);
    }

    updateExamInfo(examId) {
        const examInfo = {
            1: { name: 'Text Exam 1', participants: 24, averageScore: '78.5%' },
            2: { name: 'Mathematics Quiz', participants: 12, averageScore: '85.0%' },
            3: { name: 'Science Assessment', participants: 18, averageScore: '72.3%' }
        };

        const exam = examInfo[examId] || examInfo[1];
        
        // Update exam name
        const examNameElement = document.querySelector('.exam-detail .value');
        if (examNameElement) {
            examNameElement.textContent = exam.name;
        }
        
        // Update participants count
        const participantsElement = document.querySelector('.exam-detail:nth-child(2) .value');
        if (participantsElement) {
            participantsElement.textContent = exam.participants;
        }
        
        // Update average score
        const averageElement = document.querySelector('.exam-detail:nth-child(3) .value');
        if (averageElement) {
            averageElement.textContent = exam.averageScore;
        }
    }

    handleSearch(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredResults = [...this.results];
        } else {
            this.filteredResults = this.results.filter(result => 
                result.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                result.studentId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        this.updateResultsDisplay();
    }

    handleFilter(filterValue) {
        if (!filterValue) {
            this.filteredResults = [...this.results];
        } else {
            this.filteredResults = this.results.filter(result => 
                result.status === filterValue
            );
        }
        this.updateResultsDisplay();
    }

    updateResultsDisplay() {
        const resultsBody = document.getElementById('resultsBody');
        const noResults = document.getElementById('noResults');

        if (!resultsBody) return;

        if (this.filteredResults.length === 0) {
            resultsBody.innerHTML = '';
            if (noResults) {
                noResults.style.display = 'block';
            }
            return;
        }

        if (noResults) {
            noResults.style.display = 'none';
        }

        resultsBody.innerHTML = this.filteredResults.map(result => `
            <tr>
                <td>
                    <div class="student-info">
                        <div class="student-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="student-details">
                            <span class="student-name">${result.name}</span>
                            <span class="student-id">${result.studentId}</span>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="marks">${result.marks}</span>
                </td>
                <td>
                    <span class="percentage">${result.percentage}%</span>
                </td>
                <td>
                    <span class="status ${result.status}">${result.status === 'passed' ? 'Passed' : 'Failed'}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewResultDetails(${result.id})">
                        <i class="fas fa-eye"></i>
                        Show Detail
                    </button>
                </td>
            </tr>
        `).join('');
    }

    exportResults() {
        const exportBtn = document.getElementById('exportBtn');
        const originalText = exportBtn.innerHTML;
        
        // Show loading state
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
        exportBtn.disabled = true;

        // Simulate export process
        setTimeout(() => {
            // Create CSV content
            const csvContent = this.generateCSV();
            
            // Create download link
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'exam_results.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Show success message
            this.showNotification('Results exported successfully!', 'success');
            
            // Reset button
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 1500);
    }

    generateCSV() {
        const headers = ['Student Name', 'Student ID', 'Total Marks', 'Percentage', 'Status'];
        const rows = this.filteredResults.map(result => [
            result.name,
            result.studentId,
            result.marks,
            `${result.percentage}%`,
            result.status === 'passed' ? 'Passed' : 'Failed'
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        return csvContent;
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

// Global function to view result details
function viewResultDetails(studentId) {
    // Navigate to result details page
    window.location.href = `exam.result.details.html?student=${studentId}`;
}

// Initialize the result manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resultManager = new ResultManager();
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