// Add User JavaScript

class AddUserManager {
    constructor() {
        this.userCount = 4;
        this.maxUsers = 20;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.loadExamInfo();
    }

    setupEventListeners() {
        const addMoreBtn = document.getElementById('addMoreBtn');
        const saveUsersBtn = document.getElementById('saveUsersBtn');
        const csvFileInput = document.getElementById('csvFile');

        if (addMoreBtn) {
            addMoreBtn.addEventListener('click', () => {
                this.addMoreUsers();
            });
        }

        if (saveUsersBtn) {
            saveUsersBtn.addEventListener('click', () => {
                this.saveUsers();
            });
        }

        if (csvFileInput) {
            csvFileInput.addEventListener('change', (e) => {
                this.handleFileUpload(e);
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

    loadExamInfo() {
        // Get exam ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const examId = urlParams.get('id');
        
        if (examId) {
            // In a real app, you would fetch exam details from API
            const examName = document.getElementById('examName');
            if (examName) {
                examName.textContent = `Exam ${examId}`;
            }
        }
    }

    addMoreUsers() {
        if (this.userCount >= this.maxUsers) {
            this.showNotification('Maximum number of users reached (20)', 'error');
            return;
        }

        const userInputs = document.getElementById('userInputs');
        this.userCount++;

        const newUserGroup = document.createElement('div');
        newUserGroup.className = 'user-input-group';
        newUserGroup.style.animation = 'slideInUp 0.6s ease-out';

        newUserGroup.innerHTML = `
            <label for="user${this.userCount}" class="input-label">User ${this.userCount}</label>
            <input 
                type="text" 
                id="user${this.userCount}" 
                class="user-input" 
                placeholder="01840000000"
            >
            <button type="button" class="remove-user-btn" onclick="removeUser(this)">
                <i class="fas fa-times"></i>
            </button>
        `;

        userInputs.appendChild(newUserGroup);

        // Update add more button text
        const addMoreBtn = document.getElementById('addMoreBtn');
        if (addMoreBtn) {
            addMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Add More Users (${this.maxUsers - this.userCount} remaining)`;
        }

        // Disable add more button if max reached
        if (this.userCount >= this.maxUsers) {
            addMoreBtn.disabled = true;
            addMoreBtn.innerHTML = '<i class="fas fa-ban"></i> Maximum Users Reached';
        }
    }

    removeUser(button) {
        const userGroup = button.closest('.user-input-group');
        if (userGroup) {
            userGroup.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                userGroup.remove();
                this.userCount--;
                
                // Update add more button
                const addMoreBtn = document.getElementById('addMoreBtn');
                if (addMoreBtn) {
                    addMoreBtn.disabled = false;
                    addMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Add More Users (${this.maxUsers - this.userCount} remaining)`;
                }
            }, 300);
        }
    }

    validateUserInputs() {
        const userInputs = document.querySelectorAll('.user-input');
        const validUsers = [];
        const errors = [];

        userInputs.forEach((input, index) => {
            const value = input.value.trim();
            if (value) {
                // Basic validation for phone number format
                if (this.isValidPhoneNumber(value)) {
                    validUsers.push(value);
                } else {
                    errors.push(`User ${index + 1}: Invalid phone number format`);
                }
            }
        });

        return { validUsers, errors };
    }

    isValidPhoneNumber(phone) {
        // Basic validation for Bangladeshi phone numbers
        const phoneRegex = /^01[3-9]\d{8}$/;
        return phoneRegex.test(phone);
    }

    saveUsers() {
        const { validUsers, errors } = this.validateUserInputs();

        if (errors.length > 0) {
            this.showNotification(errors.join('\n'), 'error');
            return;
        }

        if (validUsers.length === 0) {
            this.showNotification('Please enter at least one valid phone number', 'error');
            return;
        }

        // Show loading state
        const saveBtn = document.getElementById('saveUsersBtn');
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
        saveBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            this.showNotification(`Successfully added ${validUsers.length} users to the exam`, 'success');
            
            // Reset button
            saveBtn.innerHTML = originalText;
            saveBtn.disabled = false;

            // Optionally redirect back to exam list
            setTimeout(() => {
                window.location.href = 'exam.index.html';
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

        if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
            this.showNotification('Please select a valid CSV file', 'error');
            fileInfo.textContent = 'Invalid file type';
            return;
        }

        fileInfo.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

        // Read and parse CSV file
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csvData = e.target.result;
                const users = this.parseCSV(csvData);
                
                if (users.length > 0) {
                    this.populateFromCSV(users);
                    this.showNotification(`Loaded ${users.length} users from CSV file`, 'success');
                } else {
                    this.showNotification('No valid users found in CSV file', 'error');
                }
            } catch (error) {
                this.showNotification('Error reading CSV file', 'error');
            }
        };

        reader.readAsText(file);
    }

    parseCSV(csvData) {
        const lines = csvData.split('\n');
        const users = [];

        lines.forEach((line, index) => {
            if (line.trim()) {
                const columns = line.split(',');
                const phoneNumber = columns[0]?.trim();
                
                if (phoneNumber && this.isValidPhoneNumber(phoneNumber)) {
                    users.push(phoneNumber);
                }
            }
        });

        return users;
    }

    populateFromCSV(users) {
        const userInputs = document.getElementById('userInputs');
        userInputs.innerHTML = '';

        users.slice(0, this.maxUsers).forEach((user, index) => {
            this.userCount = index + 1;
            
            const userGroup = document.createElement('div');
            userGroup.className = 'user-input-group';
            userGroup.style.animation = 'slideInUp 0.6s ease-out';

            userGroup.innerHTML = `
                <label for="user${this.userCount}" class="input-label">User ${this.userCount}</label>
                <input 
                    type="text" 
                    id="user${this.userCount}" 
                    class="user-input" 
                    placeholder="01840000000"
                    value="${user}"
                >
                <button type="button" class="remove-user-btn" onclick="removeUser(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;

            userInputs.appendChild(userGroup);
        });

        // Update add more button
        const addMoreBtn = document.getElementById('addMoreBtn');
        if (addMoreBtn) {
            addMoreBtn.innerHTML = `<i class="fas fa-plus"></i> Add More Users (${this.maxUsers - this.userCount} remaining)`;
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

// Global function for removing users
function removeUser(button) {
    if (window.addUserManager) {
        window.addUserManager.removeUser(button);
    }
}

// Initialize the add user manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.addUserManager = new AddUserManager();
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