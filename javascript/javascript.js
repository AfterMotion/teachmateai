// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    applyTheme(currentTheme);
    updateThemeToggleIcon();
});

// Theme toggle function
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    updateThemeToggleIcon();
    localStorage.setItem('theme', currentTheme);
}

// Apply theme to document
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

// Update theme toggle button icon
function updateThemeToggleIcon() {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (currentTheme === 'dark') {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// Navigation function
function navigateTo(module) {
    switch(module) {
        case 'course':
            window.location.href = 'courses.index.html';
            break;
        case 'exam':
            window.location.href = 'exam.index.html';
            break;
        case 'question':
            window.location.href = 'question.index.html';
            break;
        case 'dashboard':
            window.location.href = 'dashboard.index.html';
            break;
        default:
            console.log('Unknown module:', module);
    }
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const html = document.documentElement;
    
    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
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

// Card hover effects
function setupCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupCardEffects();
    
    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading states for navigation
function addLoadingState(element) {
    if (!element) return;
    
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
    element.style.pointerEvents = 'none';
    
    return () => {
        element.innerHTML = originalContent;
        element.style.pointerEvents = 'auto';
    };
}

// Enhanced navigation with loading state
function navigateToWithLoading(module) {
    const card = event?.currentTarget;
    if (card) {
        const resetLoading = addLoadingState(card);
        
        // Simulate loading delay
        setTimeout(() => {
            navigateTo(module);
        }, 300);
    } else {
        navigateTo(module);
    }
}

// Export functions for global access
window.navigateTo = navigateTo;
window.navigateToWithLoading = navigateToWithLoading;

// Notification function
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--card);
        color: var(--card-foreground);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        font-weight: 500;
        animation: slideInDown 0.3s ease;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideOutUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Toggle theme with Ctrl/Cmd + T
    if ((event.ctrlKey || event.metaKey) && event.key === 't') {
        event.preventDefault();
        toggleTheme();
    }
    
    // Navigate with arrow keys (if cards are focused)
    if (event.target.classList.contains('card')) {
        const cards = Array.from(document.querySelectorAll('.card'));
        const currentIndex = cards.indexOf(event.target);
        
        switch(event.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                event.preventDefault();
                const nextIndex = (currentIndex + 1) % cards.length;
                cards[nextIndex].focus();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                event.preventDefault();
                const prevIndex = (currentIndex - 1 + cards.length) % cards.length;
                cards[prevIndex].focus();
                break;
            case 'Enter':
            case ' ':
                event.preventDefault();
                event.target.click();
                break;
        }
    }
});

// Add focus management for better accessibility
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Navigate to ${card.querySelector('.card-title').textContent}`);
    });
});

// Add loading state management
window.addEventListener('load', function() {
    // Remove loading animation after page is fully loaded
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add smooth hover effects for better UX
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Add error handling for theme toggle
function safeToggleTheme() {
    try {
        toggleTheme();
    } catch (error) {
        console.error('Error toggling theme:', error);
        // Fallback to light theme
        currentTheme = 'light';
        applyTheme('light');
        updateThemeToggleIcon();
    }
}

// Override the onclick handler to use the safe version
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = safeToggleTheme;
    }
});
