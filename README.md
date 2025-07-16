# TeachMate AI - Application Development Portal

A modern, responsive static page for TeachMate AI's application development platform. This page features a clean black and white design with four main navigation cards for Course, Exam, Question, and Dashboard sections.

## 🎨 Design Features

- **Clean & Modern UI**: Inspired by shadcn/ui components with a professional black and white theme
- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Dark/Light Theme Toggle**: Optional theme switching with persistent storage
- **Accessibility**: Full keyboard navigation and screen reader support
- **Smooth Animations**: Subtle hover effects and loading animations
- **Professional Typography**: Uses Inter font family for optimal readability

## 📁 Project Structure

```
teachmateai/
├── index.html              # Main HTML file
├── style/
│   └── style.css          # All CSS styles and theme variables
├── javascript/
│   └── javascript.js      # JavaScript functionality
└── README.md              # Project documentation
```

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **No build process required** - it's a static page that works immediately

## 🎯 Main Components

### Header Section
- Company logo with graduation cap icon
- "TeachMate AI" branding
- Tagline: "Empowering Education Through Technology"

### Navigation Cards
Four clickable cards in the center:

1. **Course** 📚
   - Icon: Book open
   - Description: Manage and organize your educational courses

2. **Exam** ✅
   - Icon: Clipboard check
   - Description: Create and administer assessments

3. **Question** ❓
   - Icon: Question circle
   - Description: Build and manage question banks

4. **Dashboard** 📊
   - Icon: Chart line
   - Description: View analytics and insights

## 🎨 Theme System

### Light Theme (Default)
- Background: White (#ffffff)
- Text: Dark (#0f0f0f)
- Cards: White with subtle borders
- Accents: Light gray (#f5f5f5)

### Dark Theme
- Background: Dark (#0f0f0f)
- Text: White (#ffffff)
- Cards: Dark gray (#1a1a1a)
- Accents: Medium gray (#262626)

### Theme Toggle
- Click the moon/sun icon in the top-right corner
- Theme preference is saved in localStorage
- Keyboard shortcut: `Ctrl/Cmd + T`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (4 cards in a row)
- **Tablet**: 768px - 1199px (2 cards per row)
- **Mobile**: < 768px (1 card per row)

## ⌨️ Keyboard Navigation

- **Tab**: Navigate between cards
- **Arrow Keys**: Navigate between cards when focused
- **Enter/Space**: Activate selected card
- **Ctrl/Cmd + T**: Toggle theme

## 🎭 Animations & Interactions

- **Card Hover**: Subtle lift effect with enhanced shadow
- **Card Click**: Scale down feedback
- **Loading**: Fade-in animation for cards
- **Theme Toggle**: Smooth color transitions
- **Notifications**: Slide-in/out animations

## 🔧 Customization

### Colors
All colors are defined as CSS custom properties in `style/style.css`:

```css
:root {
    --background: #ffffff;
    --foreground: #0f0f0f;
    --primary: #0f0f0f;
    /* ... more variables */
}
```

### Icons
Icons are from Font Awesome 6.4.0. To change icons, update the `<i>` elements in `index.html`.

### Fonts
The page uses Inter font family. To change fonts, update the `font-family` property in the CSS.

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Development Notes

### Static Data
This is a static page with no API calls or dynamic data. All content is hardcoded in the HTML.

### Navigation
Currently shows notification messages when cards are clicked. In a real application, you would:
1. Replace the `navigateTo()` function with actual routing
2. Use `window.location.href` or a router like Vue Router
3. Connect to backend APIs for dynamic content

### Performance
- Optimized for fast loading
- Minimal JavaScript footprint
- Efficient CSS with modern features
- No external dependencies except Font Awesome and Google Fonts

## 🎯 Future Enhancements

Potential improvements for a production environment:

1. **Real Navigation**: Connect to actual pages/routes
2. **User Authentication**: Add login/logout functionality
3. **Dynamic Content**: Fetch data from APIs
4. **Progressive Web App**: Add service worker and offline support
5. **Analytics**: Integrate tracking for user interactions
6. **Internationalization**: Add multi-language support

## 📄 License

This project is created for TeachMate AI's application development platform.

---

**Built with ❤️ for modern web development**
# teachmateai
