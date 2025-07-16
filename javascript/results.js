// Results Page JavaScript

class ResultsManager {
    constructor() {
        this.questions = [];
        this.filteredQuestions = [];
        this.generationData = null;
        
        this.init();
    }

    init() {
        this.loadGenerationData();
        this.setupEventListeners();
        this.setupThemeToggle();
        this.generateQuestions();
        this.setupFilters();
    }

    loadGenerationData() {
        const data = localStorage.getItem('questionGenerationData');
        if (!data) {
            this.showError('No generation data found. Please go back and generate questions.');
            return;
        }

        try {
            this.generationData = JSON.parse(data);
            this.updateGenerationInfo();
        } catch (error) {
            console.error('Error parsing generation data:', error);
            this.showError('Invalid generation data. Please go back and generate questions.');
        }
    }

    updateGenerationInfo() {
        const infoElement = document.getElementById('generationInfo');
        if (!this.generationData) return;

        const courses = this.generationData.courses.map(c => c.name).join(', ');
        const questionType = this.getQuestionTypeLabel(this.generationData.questionType);
        const count = this.generationData.questionCount;

        infoElement.textContent = `${questionType} questions for ${courses} (${count} questions)`;
    }

    getQuestionTypeLabel(type) {
        const labels = {
            'mcq': 'MCQ',
            'subjective': 'Subjective',
            'one-line': 'One Line Answer',
            'true-false': 'True/False',
            'fill-blank': 'Fill in the Blank',
            'matching': 'Matching'
        };
        return labels[type] || type;
    }

    setupEventListeners() {
        const backBtn = document.getElementById('backBtn');
        const downloadBtn = document.getElementById('downloadBtn');

        backBtn.addEventListener('click', () => {
            window.location.href = 'question.index.html';
        });

        downloadBtn.addEventListener('click', () => {
            this.downloadAsExcel();
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
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

    generateQuestions() {
        if (!this.generationData) return;

        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';

        // Simulate question generation
        setTimeout(() => {
            this.questions = this.createSampleQuestions();
            this.filteredQuestions = [...this.questions];
            this.renderQuestions();
        }, 1500);
    }

    createSampleQuestions() {
        const questions = [];
        const { courses, questionType, questionCount } = this.generationData;

        for (let i = 1; i <= questionCount; i++) {
            const course = courses[Math.floor(Math.random() * courses.length)];
            const question = this.createQuestion(i, course, questionType);
            questions.push(question);
        }

        return questions;
    }

    createQuestion(number, course, type) {
        const questionTemplates = {
            mcq: {
                text: `What is the primary concept in ${course.name}?`,
                options: [
                    'Option A: Basic principles',
                    'Option B: Advanced techniques', 
                    'Option C: Fundamental theories',
                    'Option D: Core concepts'
                ],
                correctAnswer: 0,
                answer: 'Option A: Basic principles'
            },
            subjective: {
                text: `Explain the main principles of ${course.name} and how they apply in real-world scenarios.`,
                answer: `${course.name} involves understanding fundamental concepts that form the basis of the subject. These principles are essential for building a strong foundation and applying knowledge in practical situations.`
            },
            'one-line': {
                text: `Define the key term in ${course.name}.`,
                answer: `The key term in ${course.name} refers to the fundamental concept that defines the core principles of the subject.`
            },
            'true-false': {
                text: `${course.name} is a fundamental subject in education.`,
                answer: 'True',
                options: ['True', 'False'],
                correctAnswer: 0
            },
            'fill-blank': {
                text: `The main focus of ${course.name} is to understand _____.`,
                answer: 'core concepts and principles'
            },
            matching: {
                text: `Match the following terms with their definitions in ${course.name}:`,
                answer: 'A-1, B-2, C-3, D-4',
                options: [
                    'Term A - Definition 1',
                    'Term B - Definition 2',
                    'Term C - Definition 3',
                    'Term D - Definition 4'
                ]
            }
        };

        const template = questionTemplates[type] || questionTemplates.mcq;
        
        return {
            id: number,
            number: number,
            course: course.name,
            type: type,
            text: template.text,
            answer: template.answer,
            options: template.options || [],
            correctAnswer: template.correctAnswer
        };
    }

    renderQuestions() {
        const questionsList = document.getElementById('questionsList');
        const noQuestions = document.getElementById('noQuestions');

        if (this.filteredQuestions.length === 0) {
            questionsList.style.display = 'none';
            noQuestions.style.display = 'block';
            return;
        }

        questionsList.style.display = 'block';
        noQuestions.style.display = 'none';
        questionsList.innerHTML = '';

        this.filteredQuestions.forEach(question => {
            const questionElement = this.createQuestionElement(question);
            questionsList.appendChild(questionElement);
        });
    }

    createQuestionElement(question) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';

        const questionHeader = document.createElement('div');
        questionHeader.className = 'question-header';

        const questionNumber = document.createElement('div');
        questionNumber.className = 'question-number';
        questionNumber.innerHTML = `<i class="fas fa-hashtag"></i> Question ${question.number}`;

        const questionType = document.createElement('div');
        questionType.className = 'question-type';
        questionType.textContent = this.getQuestionTypeLabel(question.type).toUpperCase();

        questionHeader.appendChild(questionNumber);
        questionHeader.appendChild(questionType);

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.textContent = question.text;

        questionDiv.appendChild(questionHeader);
        questionDiv.appendChild(questionText);

        // Add options for MCQ and True/False
        if (question.options && question.options.length > 0) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'mcq-options';

            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.className = 'mcq-option';
                
                if (question.correctAnswer !== undefined && index === question.correctAnswer) {
                    optionDiv.classList.add('correct');
                } else if (question.correctAnswer !== undefined) {
                    optionDiv.classList.add('incorrect');
                }

                const optionLetter = document.createElement('div');
                optionLetter.className = 'option-letter';
                optionLetter.textContent = String.fromCharCode(65 + index);

                const optionText = document.createElement('span');
                optionText.textContent = option;

                optionDiv.appendChild(optionLetter);
                optionDiv.appendChild(optionText);
                optionsDiv.appendChild(optionDiv);
            });

            questionDiv.appendChild(optionsDiv);
        }

        // Add answer section
        const answerDiv = document.createElement('div');
        answerDiv.className = 'question-answer';

        const answerLabel = document.createElement('div');
        answerLabel.className = 'answer-label';
        answerLabel.textContent = 'Answer';

        const answerText = document.createElement('div');
        answerText.className = 'answer-text';
        answerText.textContent = question.answer;

        answerDiv.appendChild(answerLabel);
        answerDiv.appendChild(answerText);
        questionDiv.appendChild(answerDiv);

        return questionDiv;
    }

    setupFilters() {
        const typeFilter = document.getElementById('questionTypeFilter');
        const courseFilter = document.getElementById('courseFilter');

        // Populate course filter
        if (this.generationData) {
            const courses = [...new Set(this.questions.map(q => q.course))];
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseFilter.appendChild(option);
            });
        }

        // Add filter event listeners
        typeFilter.addEventListener('change', () => this.applyFilters());
        courseFilter.addEventListener('change', () => this.applyFilters());
    }

    applyFilters() {
        const typeFilter = document.getElementById('questionTypeFilter').value;
        const courseFilter = document.getElementById('courseFilter').value;

        this.filteredQuestions = this.questions.filter(question => {
            const typeMatch = !typeFilter || question.type === typeFilter;
            const courseMatch = !courseFilter || question.course === courseFilter;
            return typeMatch && courseMatch;
        });

        this.renderQuestions();
    }

    downloadAsExcel() {
        if (this.filteredQuestions.length === 0) {
            this.showError('No questions to download.');
            return;
        }

        // Create CSV content
        let csvContent = 'Question Number,Question Type,Course,Question,Answer\n';
        
        this.filteredQuestions.forEach(question => {
            const questionText = question.text.replace(/"/g, '""');
            const answerText = question.answer.replace(/"/g, '""');
            
            csvContent += `${question.number},"${this.getQuestionTypeLabel(question.type)}","${question.course}","${questionText}","${answerText}"\n`;
        });

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', `questions_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showError(message) {
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

// Initialize the results manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.resultsManager = new ResultsManager();
}); 