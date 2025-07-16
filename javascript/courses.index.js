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

// Navigation function for cards
function navigateTo(destination) {
    // Add visual feedback
    const card = event.currentTarget;
    card.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        card.style.transform = '';
        
        // Simulate navigation (in a real app, this would redirect to actual pages)
        console.log(`Navigating to: ${destination}`);
        
        // Show a temporary message (you can replace this with actual navigation)
        showNotification(`Navigating to ${destination.charAt(0).toUpperCase() + destination.slice(1)}...`);
        
        // In a real application, you would use:
        // window.location.href = `/${destination}`;
        // or
        // router.push(`/${destination}`);
    }, 150);
}

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
