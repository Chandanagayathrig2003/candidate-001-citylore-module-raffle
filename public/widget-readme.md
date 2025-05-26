
# CityLore Sponsor Widget

A standalone JavaScript widget that can be embedded on any website to display CityLore sponsor categories and collect sponsorship requests.

## Quick Start

1. **Include the script:**
```html
<script src="https://your-domain.com/citylore-widget.js"></script>
```

2. **Add a container element:**
```html
<div data-citylore-widget="stories"></div>
```

The widget will automatically initialize and display the specified category.

## Available Categories

- `stories` - Local Stories (San Francisco) 🏙️
- `street-art` - Street Art (Austin) 🎸  
- `poetry` - City Poetry (New York) 🗽

## Manual Initialization

You can also initialize the widget manually with custom options:

```javascript
CityLoreWidget.init({
  categoryId: 'stories',
  container: '#my-widget-container'
});
```

## Widget Features

- **Responsive Design**: Works on all screen sizes
- **Self-Contained**: Includes all necessary CSS, no conflicts
- **Multiple Categories**: Support for different sponsor categories
- **Inline Forms**: Built-in sponsorship request form
- **Brand Consistent**: Uses CityLore fonts and colors
- **Easy Integration**: Just add script + div element

## Widget API

### Methods

- `CityLoreWidget.init(options)` - Initialize widget
- `CityLoreWidget.toggleForm(categoryId)` - Show/hide sponsorship form
- `CityLoreWidget.submitForm(categoryId)` - Submit sponsorship request

### Options

- `categoryId` (string) - Category to display ('stories', 'street-art', 'poetry')
- `container` (string|element) - CSS selector or DOM element for widget container

## Styling

The widget uses self-contained CSS with the `.citylore-widget` namespace to prevent conflicts with host site styles. All styles are injected automatically when the script loads.

## Integration Examples

### Basic Integration
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Site</h1>
    
    <!-- CityLore Widget -->
    <div data-citylore-widget="stories"></div>
    
    <script src="https://your-domain.com/citylore-widget.js"></script>
</body>
</html>
```

### Multiple Widgets
```html
<div data-citylore-widget="stories"></div>
<div data-citylore-widget="street-art"></div>
<div data-citylore-widget="poetry"></div>
```

### Dynamic Loading
```javascript
// Load different categories dynamically
function loadCategory(categoryId) {
    CityLoreWidget.init({
        categoryId: categoryId,
        container: '#dynamic-widget'
    });
}
```

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## File Size

- JavaScript: ~8KB (minified)
- CSS: Injected automatically (~3KB)
- Total: ~11KB

## Demo

See `widget-demo.html` for a complete working example with all categories and initialization methods.
