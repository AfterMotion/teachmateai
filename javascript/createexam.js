// Create Exam JavaScript

class CreateExamManager {
    constructor() {
        this.questionCount = 1;
        this.maxQuestions = 50;
        this.currentQuestion = 1;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.setDefaultSchedule();
    }

    setupEventListeners() {
        const addQuestionBtn = document.getElementById('addQuestionBtn');
        const addAnswerBtn = document.getElementById('addAnswerBtn');
        const saveExamBtn = document.getElementById('saveExamBtn');
        const questionFileInput = document.getElementById('questionFile');
        const questionTypeSelect = document.getElementById('questionType');

        if (addQuestionBtn) {
            addQuestionBtn.addEventListener('click', () => {
                this.addNewQuestion();
            });
        }

        if (addAnswerBtn) {
            addAnswerBtn.addEventListener('click', () => {
                this.addNewAnswer();
            });
        }

        if (saveExamBtn) {
            saveExamBtn.addEventListener('click', () => {
                this.saveExam();
            });
        }

        if (questionFileInput) {
            questionFileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        }

        if (questionTypeSelect) {
            questionTypeSelect.addEventListener('change', (e) => {
                this.handleQuestionTypeChange(e.target.value);
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

    setDefaultSchedule() {
        const scheduleInput = document.getElementById('schedule');
        if (scheduleInput) {
            // Set default to tomorrow at 10 AM
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10, 0, 0, 0);
            
            const formattedDate = tomorrow.toISOString().slice(0, 16);
            scheduleInput.value = formattedDate;
        }
    }

    handleQuestionTypeChange(questionType) {
        const questionSection = document.getElementById('questionSection');
        const questionTypePrompt = document.getElementById('questionTypePrompt');
        const questionContent = document.getElementById('questionContent');

        if (!questionType) {
            // Hide question section and show prompt
            questionSection.style.display = 'none';
            questionTypePrompt.style.display = 'block';
            return;
        }

        // Hide prompt and show question section
        questionTypePrompt.style.display = 'none';
        questionSection.style.display = 'block';

        // Load appropriate template based on question type
        const template = this.getQuestionTemplate(questionType);
        questionContent.innerHTML = template;

        // Re-initialize event listeners for the new template
        this.initializeTemplateEventListeners();
    }

    getQuestionTemplate(questionType) {
        const templates = {
            'mcq': this.getMCQTemplate(),
            'true-false': this.getTrueFalseTemplate(),
            'fill-blank': this.getFillBlankTemplate(),
            'subjective': this.getSubjectiveTemplate()
        };

        return templates[questionType] || this.getMCQTemplate();
    }

    getMCQTemplate() {
        return `
            <div class="question-input-group">
                <label for="questionText" class="input-label">Question</label>
                <textarea 
                    id="questionText" 
                    class="question-textarea" 
                    placeholder="Q1- What is the capital of Bangladesh?"
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">Multiple Choice Options</label>
                <div class="answers-container" id="answersContainer">
                    <div class="answer-input-group">
                        <div class="answer-number">A</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option A"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">B</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option B"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">C</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option C"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">D</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option D"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <button type="button" class="btn btn-sm btn-outline add-answer-btn" id="addAnswerBtn">
                        <i class="fas fa-plus"></i>
                        Add Option
                    </button>
                    <small class="hint">Click the checkmark to mark the correct answer</small>
                </div>
            </div>
        `;
    }

    getTrueFalseTemplate() {
        return `
            <div class="question-input-group">
                <label for="questionText" class="input-label">Question</label>
                <textarea 
                    id="questionText" 
                    class="question-textarea" 
                    placeholder="Q1- The Earth is round."
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">True/False Options</label>
                <div class="answers-container" id="answersContainer">
                    <div class="answer-input-group">
                        <div class="answer-number">T</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            value="True"
                            readonly
                            style="background-color: var(--accent);"
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">F</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            value="False"
                            readonly
                            style="background-color: var(--accent);"
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <small class="hint">Click the checkmark to mark the correct answer (True or False)</small>
                </div>
            </div>
        `;
    }

    getFillBlankTemplate() {
        return `
            <div class="question-input-group">
                <label for="questionText" class="input-label">Question with Blanks</label>
                <textarea 
                    id="questionText" 
                    class="question-textarea" 
                    placeholder="Q1- The capital of Bangladesh is _____ and it was founded in _____."
                    rows="3"
                    required
                ></textarea>
                <small class="hint">Use underscores (_) to indicate blank spaces</small>
            </div>

            <div class="answers-section">
                <label class="input-label">Correct Answers for Blanks</label>
                <div class="answers-container" id="answersContainer">
                    <div class="answer-input-group">
                        <div class="answer-number">1</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Answer for first blank"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">2</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Answer for second blank"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <button type="button" class="btn btn-sm btn-outline add-answer-btn" id="addAnswerBtn">
                        <i class="fas fa-plus"></i>
                        Add Blank Answer
                    </button>
                    <small class="hint">Add answers for each blank space in order</small>
                </div>
            </div>
        `;
    }

    getSubjectiveTemplate() {
        return `
            <div class="question-input-group">
                <label for="questionText" class="input-label">Question</label>
                <textarea 
                    id="questionText" 
                    class="question-textarea" 
                    placeholder="Q1- Explain the importance of education in modern society."
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">Sample Answer (Optional)</label>
                <div class="answers-container" id="answersContainer">
                    <div class="answer-input-group">
                        <div class="answer-number">✓</div>
                        <textarea 
                            class="answer-input" 
                            placeholder="Sample answer or key points for evaluation"
                            rows="4"
                            style="resize: vertical; min-height: 80px;"
                        ></textarea>
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <small class="hint">Add sample answer or key points for evaluation (optional)</small>
                </div>
            </div>
        `;
    }

    initializeTemplateEventListeners() {
        // Re-initialize add answer button
        const addAnswerBtn = document.getElementById('addAnswerBtn');
        if (addAnswerBtn) {
            addAnswerBtn.addEventListener('click', () => {
                this.addNewAnswer();
            });
        }
    }

    addNewQuestion() {
        if (this.questionCount >= this.maxQuestions) {
            this.showNotification('Maximum number of questions reached (50)', 'error');
            return;
        }

        this.questionCount++;
        this.currentQuestion = this.questionCount;

        const questionType = document.getElementById('questionType').value;
        const questionsList = document.getElementById('questionsList');
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';
        questionItem.style.animation = 'slideInUp 0.6s ease-out';

        // Get template based on question type
        const template = this.getQuestionTemplateForList(questionType, this.questionCount);
        
        questionItem.innerHTML = `
            <div class="question-item-header">
                <div class="question-item-title">Question ${this.questionCount}</div>
                <button type="button" class="remove-question-btn" onclick="removeQuestion(this)">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            
            <div class="question-content">
                ${template}
            </div>
        `;

        questionsList.appendChild(questionItem);

        // Update add question button text
        const addQuestionBtn = document.getElementById('addQuestionBtn');
        if (addQuestionBtn) {
            addQuestionBtn.innerHTML = `<i class="fas fa-plus"></i> Add Question (${this.maxQuestions - this.questionCount} remaining)`;
        }

        // Disable add question button if max reached
        if (this.questionCount >= this.maxQuestions) {
            addQuestionBtn.disabled = true;
            addQuestionBtn.innerHTML = '<i class="fas fa-ban"></i> Maximum Questions Reached';
        }
    }

    getQuestionTemplateForList(questionType, questionNumber) {
        const templates = {
            'mcq': this.getMCQTemplateForList(questionNumber),
            'true-false': this.getTrueFalseTemplateForList(questionNumber),
            'fill-blank': this.getFillBlankTemplateForList(questionNumber),
            'subjective': this.getSubjectiveTemplateForList(questionNumber)
        };

        return templates[questionType] || this.getMCQTemplateForList(questionNumber);
    }

    getMCQTemplateForList(questionNumber) {
        return `
            <div class="question-input-group">
                <label class="input-label">Question</label>
                <textarea 
                    class="question-textarea" 
                    placeholder="Q${questionNumber}- What is the capital of Bangladesh?"
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">Multiple Choice Options</label>
                <div class="answers-container">
                    <div class="answer-input-group">
                        <div class="answer-number">A</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option A"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">B</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option B"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">C</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option C"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">D</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Option D"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <button type="button" class="btn btn-sm btn-outline add-answer-btn" onclick="addAnswerToQuestion(this)">
                        <i class="fas fa-plus"></i>
                        Add Option
                    </button>
                    <small class="hint">Click the checkmark to mark the correct answer</small>
                </div>
            </div>
        `;
    }

    getTrueFalseTemplateForList(questionNumber) {
        return `
            <div class="question-input-group">
                <label class="input-label">Question</label>
                <textarea 
                    class="question-textarea" 
                    placeholder="Q${questionNumber}- The Earth is round."
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">True/False Options</label>
                <div class="answers-container">
                    <div class="answer-input-group">
                        <div class="answer-number">T</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            value="True"
                            readonly
                            style="background-color: var(--accent);"
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">F</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            value="False"
                            readonly
                            style="background-color: var(--accent);"
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <small class="hint">Click the checkmark to mark the correct answer (True or False)</small>
                </div>
            </div>
        `;
    }

    getFillBlankTemplateForList(questionNumber) {
        return `
            <div class="question-input-group">
                <label class="input-label">Question with Blanks</label>
                <textarea 
                    class="question-textarea" 
                    placeholder="Q${questionNumber}- The capital of Bangladesh is _____ and it was founded in _____."
                    rows="3"
                    required
                ></textarea>
                <small class="hint">Use underscores (_) to indicate blank spaces</small>
            </div>

            <div class="answers-section">
                <label class="input-label">Correct Answers for Blanks</label>
                <div class="answers-container">
                    <div class="answer-input-group">
                        <div class="answer-number">1</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Answer for first blank"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>

                    <div class="answer-input-group">
                        <div class="answer-number">2</div>
                        <input 
                            type="text" 
                            class="answer-input" 
                            placeholder="Answer for second blank"
                            required
                        >
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <button type="button" class="btn btn-sm btn-outline add-answer-btn" onclick="addAnswerToQuestion(this)">
                        <i class="fas fa-plus"></i>
                        Add Blank Answer
                    </button>
                    <small class="hint">Add answers for each blank space in order</small>
                </div>
            </div>
        `;
    }

    getSubjectiveTemplateForList(questionNumber) {
        return `
            <div class="question-input-group">
                <label class="input-label">Question</label>
                <textarea 
                    class="question-textarea" 
                    placeholder="Q${questionNumber}- Explain the importance of education in modern society."
                    rows="3"
                    required
                ></textarea>
            </div>

            <div class="answers-section">
                <label class="input-label">Sample Answer (Optional)</label>
                <div class="answers-container">
                    <div class="answer-input-group">
                        <div class="answer-number">✓</div>
                        <textarea 
                            class="answer-input" 
                            placeholder="Sample answer or key points for evaluation"
                            rows="4"
                            style="resize: vertical; min-height: 80px;"
                        ></textarea>
                        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                            <i class="fas fa-check"></i>
                        </button>
                    </div>
                </div>

                <div class="answer-actions">
                    <small class="hint">Add sample answer or key points for evaluation (optional)</small>
                </div>
            </div>
        `;
    }

    addNewAnswer() {
        const answersContainer = document.getElementById('answersContainer');
        const questionType = document.getElementById('questionType').value;
        const answerCount = answersContainer.children.length + 1;

        const answerGroup = document.createElement('div');
        answerGroup.className = 'answer-input-group';
        answerGroup.style.animation = 'slideInUp 0.6s ease-out';

        let answerNumber, placeholder;
        
        switch(questionType) {
            case 'mcq':
                answerNumber = String.fromCharCode(64 + answerCount); // A, B, C, D...
                placeholder = `Option ${answerNumber}`;
                break;
            case 'fill-blank':
                answerNumber = answerCount;
                placeholder = `Answer for blank ${answerCount}`;
                break;
            case 'subjective':
                answerNumber = '✓';
                placeholder = 'Additional key point';
                break;
            default:
                answerNumber = answerCount;
                placeholder = `Answer ${answerCount}`;
        }

        answerGroup.innerHTML = `
            <div class="answer-number">${answerNumber}</div>
            <input 
                type="text" 
                class="answer-input" 
                placeholder="${placeholder}"
                required
            >
            <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
                <i class="fas fa-check"></i>
            </button>
        `;

        answersContainer.appendChild(answerGroup);
    }

    validateExam() {
        const examName = document.getElementById('examName').value.trim();
        const totalMarks = document.getElementById('totalMarks').value;
        const duration = document.getElementById('duration').value;
        const schedule = document.getElementById('schedule').value;
        const questionType = document.getElementById('questionType').value;

        const errors = [];

        if (!examName) {
            errors.push('Please enter an exam name');
        }

        if (!totalMarks || totalMarks < 1 || totalMarks > 1000) {
            errors.push('Please enter a valid total marks (1-1000)');
        }

        if (!duration || duration < 1 || duration > 300) {
            errors.push('Please enter a valid duration (1-300 minutes)');
        }

        if (!schedule) {
            errors.push('Please select a schedule');
        }

        if (!questionType) {
            errors.push('Please select a question type');
        }

        // Validate questions
        const questions = this.getAllQuestions();
        if (questions.length === 0) {
            errors.push('Please add at least one question');
        }

        questions.forEach((question, index) => {
            if (!question.text.trim()) {
                errors.push(`Question ${index + 1}: Please enter a question`);
            }

            const validAnswers = question.answers.filter(answer => answer.trim());
            if (validAnswers.length < 2) {
                errors.push(`Question ${index + 1}: Please add at least 2 answers`);
            }

            if (!question.correctAnswer) {
                errors.push(`Question ${index + 1}: Please mark a correct answer`);
            }
        });

        return { isValid: errors.length === 0, errors };
    }

    getAllQuestions() {
        const questions = [];
        
        // Get main question
        const mainQuestionText = document.getElementById('questionText').value.trim();
        const mainAnswers = this.getAnswersFromContainer(document.getElementById('answersContainer'));
        
        if (mainQuestionText || mainAnswers.some(answer => answer.text.trim())) {
            questions.push({
                text: mainQuestionText,
                answers: mainAnswers.map(a => a.text),
                correctAnswer: mainAnswers.findIndex(a => a.isCorrect)
            });
        }

        // Get additional questions
        const questionItems = document.querySelectorAll('.question-item');
        questionItems.forEach((item, index) => {
            const questionText = item.querySelector('.question-textarea').value.trim();
            const answersContainer = item.querySelector('.answers-container');
            const answers = this.getAnswersFromContainer(answersContainer);

            if (questionText || answers.some(answer => answer.text.trim())) {
                questions.push({
                    text: questionText,
                    answers: answers.map(a => a.text),
                    correctAnswer: answers.findIndex(a => a.isCorrect)
                });
            }
        });

        return questions;
    }

    getAnswersFromContainer(container) {
        const answers = [];
        const answerGroups = container.querySelectorAll('.answer-input-group');
        
        answerGroups.forEach((group, index) => {
            const input = group.querySelector('.answer-input');
            const isCorrect = group.classList.contains('correct');
            
            answers.push({
                text: input.value.trim(),
                isCorrect: isCorrect
            });
        });

        return answers;
    }

    saveExam() {
        const validation = this.validateExam();

        if (!validation.isValid) {
            this.showNotification(validation.errors.join('\n'), 'error');
            return;
        }

        // Show enhanced loading state
        const saveBtn = document.getElementById('saveExamBtn');
        const originalText = saveBtn.innerHTML;
        const originalClasses = saveBtn.className;
        
        // Add loading animation
        saveBtn.classList.add('loading');
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Exam...';
        saveBtn.disabled = true;
        
        // Add pulse effect
        saveBtn.style.animation = 'save-pulse 0.8s ease-in-out infinite alternate';

        // Collect exam data
        const examData = {
            name: document.getElementById('examName').value.trim(),
            totalMarks: parseInt(document.getElementById('totalMarks').value),
            duration: parseInt(document.getElementById('duration').value),
            schedule: document.getElementById('schedule').value,
            questionType: document.getElementById('questionType').value,
            questions: this.getAllQuestions(),
            createdAt: new Date().toISOString()
        };

        // Simulate API call with progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            if (progress <= 90) {
                saveBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Creating Exam... ${progress}%`;
            }
        }, 150);

        setTimeout(() => {
            clearInterval(progressInterval);
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Exam Created!';
            saveBtn.style.animation = 'success-pulse 0.5s ease-in-out';
            
            this.showNotification('Exam created successfully!', 'success');

            // Reset button after delay
            setTimeout(() => {
                saveBtn.classList.remove('loading');
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
                saveBtn.style.animation = 'save-pulse 3s ease-in-out infinite alternate';

                // Redirect to exam list
                setTimeout(() => {
                    window.location.href = 'exam.index.html';
                }, 1000);
            }, 2000);
        }, 1500);
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        const fileInfo = document.getElementById('fileInfo');

        if (!file) {
            fileInfo.textContent = 'No file selected';
            return;
        }

        const allowedTypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain'];
        const allowedExtensions = ['.csv', '.xlsx', '.txt'];

        if (!allowedTypes.includes(file.type) && !allowedExtensions.some(ext => file.name.endsWith(ext))) {
            this.showNotification('Please select a valid file (CSV, XLSX, or TXT)', 'error');
            fileInfo.textContent = 'Invalid file type';
            return;
        }

        fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

        // Read and parse file
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const fileData = e.target.result;
                this.parseQuestionFile(fileData, file.name);
                this.showNotification('Questions loaded from file successfully', 'success');
            } catch (error) {
                this.showNotification('Error reading file', 'error');
            }
        };

        reader.readAsText(file);
    }

    parseQuestionFile(fileData, fileName) {
        // Simple parsing - in a real app, you'd have more sophisticated parsing
        const lines = fileData.split('\n');
        let currentQuestion = null;
        let questionIndex = 0;

        lines.forEach((line, index) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            if (trimmedLine.startsWith('Q') || trimmedLine.startsWith('Question')) {
                // New question
                if (currentQuestion) {
                    this.addQuestionFromData(currentQuestion);
                }
                currentQuestion = {
                    text: trimmedLine,
                    answers: [],
                    correctAnswer: -1
                };
                questionIndex++;
            } else if (currentQuestion && trimmedLine.startsWith('A') || trimmedLine.startsWith('Answer')) {
                // Answer
                const isCorrect = trimmedLine.includes('(correct)') || trimmedLine.includes('(correct answer)');
                const answerText = trimmedLine.replace(/\(correct.*?\)/i, '').trim();
                
                currentQuestion.answers.push(answerText);
                if (isCorrect) {
                    currentQuestion.correctAnswer = currentQuestion.answers.length - 1;
                }
            }
        });

        // Add the last question
        if (currentQuestion) {
            this.addQuestionFromData(currentQuestion);
        }
    }

    addQuestionFromData(questionData) {
        // Add new question
        this.addNewQuestion();
        
        // Get the last added question
        const questionItems = document.querySelectorAll('.question-item');
        const lastQuestion = questionItems[questionItems.length - 1];
        
        if (lastQuestion) {
            const textarea = lastQuestion.querySelector('.question-textarea');
            const answersContainer = lastQuestion.querySelector('.answers-container');
            
            // Set question text
            textarea.value = questionData.text;
            
            // Set answers
            questionData.answers.forEach((answer, index) => {
                const answerGroups = answersContainer.querySelectorAll('.answer-input-group');
                if (answerGroups[index]) {
                    const input = answerGroups[index].querySelector('.answer-input');
                    input.value = answer;
                    
                    // Mark correct answer
                    if (index === questionData.correctAnswer) {
                        const correctBtn = answerGroups[index].querySelector('.correct-answer-btn');
                        setCorrectAnswer(correctBtn);
                    }
                }
            });
        }
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
            white-space: pre-line;
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

// Global functions
function setCorrectAnswer(button) {
    // Remove active class from all buttons in the same container
    const container = button.closest('.answers-container');
    const allButtons = container.querySelectorAll('.correct-answer-btn');
    const allGroups = container.querySelectorAll('.answer-input-group');
    
    allButtons.forEach(btn => btn.classList.remove('active'));
    allGroups.forEach(group => group.classList.remove('correct'));
    
    // Add active class to clicked button
    button.classList.add('active');
    button.closest('.answer-input-group').classList.add('correct');
}

function removeQuestion(button) {
    const questionItem = button.closest('.question-item');
    if (questionItem) {
        questionItem.style.animation = 'slideOutUp 0.3s ease-out';
        setTimeout(() => {
            questionItem.remove();
            if (window.createExamManager) {
                window.createExamManager.questionCount--;
            }
        }, 300);
    }
}

function addAnswerToQuestion(button) {
    const questionItem = button.closest('.question-item');
    const answersContainer = questionItem.querySelector('.answers-container');
    const questionType = document.getElementById('questionType').value;
    const answerCount = answersContainer.children.length + 1;

    const answerGroup = document.createElement('div');
    answerGroup.className = 'answer-input-group';
    answerGroup.style.animation = 'slideInUp 0.6s ease-out';

    let answerNumber, placeholder;
    
    switch(questionType) {
        case 'mcq':
            answerNumber = String.fromCharCode(64 + answerCount); // A, B, C, D...
            placeholder = `Option ${answerNumber}`;
            break;
        case 'fill-blank':
            answerNumber = answerCount;
            placeholder = `Answer for blank ${answerCount}`;
            break;
        case 'subjective':
            answerNumber = '✓';
            placeholder = 'Additional key point';
            break;
        default:
            answerNumber = answerCount;
            placeholder = `Answer ${answerCount}`;
    }

    answerGroup.innerHTML = `
        <div class="answer-number">${answerNumber}</div>
        <input 
            type="text" 
            class="answer-input" 
            placeholder="${placeholder}"
            required
        >
        <button type="button" class="correct-answer-btn" onclick="setCorrectAnswer(this)">
            <i class="fas fa-check"></i>
        </button>
    `;

    answersContainer.appendChild(answerGroup);
}

// Initialize the create exam manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.createExamManager = new CreateExamManager();
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

    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style); 