// Question Generation Module JavaScript

class QuestionGenerator {
    constructor() {
        this.selectedCourses = [];
        this.courses = [
            { id: 1, name: 'Mathematics', type: 'Course' },
            { id: 2, name: 'Physics', type: 'Course' },
            { id: 3, name: 'Chemistry', type: 'Course' },
            { id: 4, name: 'Biology', type: 'Course' },
            { id: 5, name: 'English Literature', type: 'Course' },
            { id: 6, name: 'History', type: 'Course' },
            { id: 7, name: 'Geography', type: 'Course' },
            { id: 8, name: 'Computer Science', type: 'Course' },
            { id: 9, name: 'Algebra', type: 'Module' },
            { id: 10, name: 'Calculus', type: 'Module' },
            { id: 11, name: 'Trigonometry', type: 'Module' },
            { id: 12, name: 'Mechanics', type: 'Module' },
            { id: 13, name: 'Thermodynamics', type: 'Module' },
            { id: 14, name: 'Organic Chemistry', type: 'Module' },
            { id: 15, name: 'Inorganic Chemistry', type: 'Module' },
            { id: 16, name: 'Cell Biology', type: 'Module' },
            { id: 17, name: 'Genetics', type: 'Module' },
            { id: 18, name: 'Shakespeare', type: 'Module' },
            { id: 19, name: 'Modern Literature', type: 'Module' },
            { id: 20, name: 'World War II', type: 'Module' },
            { id: 21, name: 'Ancient Civilizations', type: 'Module' },
            { id: 22, name: 'Climate Change', type: 'Module' },
            { id: 23, name: 'Programming Fundamentals', type: 'Module' },
            { id: 24, name: 'Data Structures', type: 'Module' }
        ];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.populateDropdown();
    }

    setupEventListeners() {
        const courseSearch = document.getElementById('courseSearch');
        const courseDropdown = document.getElementById('courseDropdown');
        const questionForm = document.getElementById('questionForm');
        const generateBtn = document.getElementById('generateBtn');

        // Course search functionality
        courseSearch.addEventListener('input', (e) => {
            this.handleCourseSearch(e.target.value);
        });

        courseSearch.addEventListener('focus', () => {
            this.showDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!courseSearch.contains(e.target) && !courseDropdown.contains(e.target)) {
                this.hideDropdown();
            }
        });

        // Form submission
        questionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Prevent form submission on Enter in search input
        courseSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            }
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
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
        const icon = themeToggle.querySelector('i');
        
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    populateDropdown() {
        const dropdown = document.getElementById('courseDropdown');
        dropdown.innerHTML = '';
        
        this.courses.forEach(course => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.dataset.id = course.id;
            item.innerHTML = `
                <span>${course.name}</span>
                <small style="color: var(--muted-foreground); margin-left: auto;">${course.type}</small>
            `;
            
            item.addEventListener('click', () => {
                this.selectCourse(course);
            });
            
            dropdown.appendChild(item);
        });
    }

    handleCourseSearch(query) {
        const dropdown = document.getElementById('courseDropdown');
        const items = dropdown.querySelectorAll('.dropdown-item');
        
        items.forEach(item => {
            const courseName = item.querySelector('span').textContent.toLowerCase();
            const courseType = item.querySelector('small').textContent.toLowerCase();
            const searchQuery = query.toLowerCase();
            
            if (courseName.includes(searchQuery) || courseType.includes(searchQuery)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        this.showDropdown();
    }

    showDropdown() {
        const dropdown = document.getElementById('courseDropdown');
        dropdown.classList.add('show');
    }

    hideDropdown() {
        const dropdown = document.getElementById('courseDropdown');
        dropdown.classList.remove('show');
    }

    selectCourse(course) {
        // Check if course is already selected
        if (this.selectedCourses.find(c => c.id === course.id)) {
            return;
        }

        this.selectedCourses.push(course);
        this.updateSelectedCourses();
        this.hideDropdown();
        
        // Clear search input
        document.getElementById('courseSearch').value = '';
    }

    removeCourse(courseId) {
        this.selectedCourses = this.selectedCourses.filter(c => c.id !== courseId);
        this.updateSelectedCourses();
    }

    updateSelectedCourses() {
        const container = document.getElementById('selectedCourses');
        container.innerHTML = '';
        
        this.selectedCourses.forEach(course => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            item.innerHTML = `
                <span>${course.name}</span>
                <button class="remove-btn" onclick="questionGenerator.removeCourse(${course.id})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            container.appendChild(item);
        });
    }

    validateForm() {
        const questionType = document.getElementById('questionType').value;
        const questionCount = document.getElementById('questionCount').value;
        
        if (this.selectedCourses.length === 0) {
            this.showError('Please select at least one course or module.');
            return false;
        }
        
        if (!questionType) {
            this.showError('Please select a question type.');
            return false;
        }
        
        if (!questionCount || questionCount < 1 || questionCount > 100) {
            this.showError('Please enter a valid number of questions (1-100).');
            return false;
        }
        
        return true;
    }

    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    async handleFormSubmission() {
        if (!this.validateForm()) {
            return;
        }

        const generateBtn = document.getElementById('generateBtn');
        const originalText = generateBtn.innerHTML;
        
        // Show loading state
        generateBtn.classList.add('loading');
        generateBtn.innerHTML = '<span class="btn-text">Generating Questions...</span>';
        generateBtn.disabled = true;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Prepare data for results page
            const formData = {
                courses: this.selectedCourses,
                questionType: document.getElementById('questionType').value,
                questionCount: document.getElementById('questionCount').value,
                timestamp: new Date().toISOString()
            };
            
            // Store data in localStorage for results page
            localStorage.setItem('questionGenerationData', JSON.stringify(formData));
            
            // Navigate to results page
            window.location.href = 'question.results.html';
            
        } catch (error) {
            console.error('Error generating questions:', error);
            this.showError('An error occurred while generating questions. Please try again.');
            
            // Reset button state
            generateBtn.classList.remove('loading');
            generateBtn.innerHTML = originalText;
            generateBtn.disabled = false;
        }
    }
}

// Initialize the question generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.questionGenerator = new QuestionGenerator();
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