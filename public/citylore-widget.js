
(function() {
  'use strict';

  // Widget configuration
  const WIDGET_CONFIG = {
    apiBaseUrl: 'https://api.citylore.com', // Replace with actual API URL
    cssVersion: '1.0.0'
  };

  // Widget CSS styles
  const widgetCSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');
    
    .citylore-widget {
      font-family: 'Poppins', Arial, sans-serif;
      max-width: 400px;
      background: #ffffff;
      border: 1px solid #f59e0b30;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      overflow: hidden;
      margin: 20px 0;
    }
    
    .citylore-widget * {
      box-sizing: border-box;
    }
    
    .citylore-widget-header {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      padding: 20px;
      text-align: center;
    }
    
    .citylore-widget-logo {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: #f59e0b;
      margin: 0 0 5px 0;
    }
    
    .citylore-widget-tagline {
      font-size: 12px;
      opacity: 0.9;
      margin: 0;
    }
    
    .citylore-widget-content {
      padding: 20px;
    }
    
    .citylore-widget-category {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .citylore-widget-category-emoji {
      font-size: 32px;
      margin-bottom: 10px;
      display: block;
    }
    
    .citylore-widget-category-title {
      font-family: 'Playfair Display', serif;
      font-size: 16px;
      font-weight: 600;
      color: #1e3a8a;
      margin: 0 0 5px 0;
    }
    
    .citylore-widget-category-city {
      font-size: 14px;
      color: #6b7280;
      margin: 0 0 10px 0;
    }
    
    .citylore-widget-price {
      font-size: 24px;
      font-weight: 700;
      color: #f59e0b;
      margin: 15px 0;
    }
    
    .citylore-widget-button {
      background-color: #f59e0b;
      color: #1e3a8a;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      font-family: 'Poppins', Arial, sans-serif;
    }
    
    .citylore-widget-button:hover {
      background-color: #d97706;
      transform: translateY(-1px);
    }
    
    .citylore-widget-form {
      margin-top: 15px;
      display: none;
    }
    
    .citylore-widget-form.active {
      display: block;
    }
    
    .citylore-widget-input {
      width: 100%;
      padding: 10px;
      border: 1px solid #f59e0b30;
      border-radius: 4px;
      margin-bottom: 10px;
      font-family: 'Poppins', Arial, sans-serif;
      font-size: 14px;
    }
    
    .citylore-widget-input:focus {
      outline: none;
      border-color: #f59e0b;
    }
    
    .citylore-widget-form-buttons {
      display: flex;
      gap: 10px;
    }
    
    .citylore-widget-button-secondary {
      background-color: transparent;
      color: #1e3a8a;
      border: 1px solid #f59e0b;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
      font-family: 'Poppins', Arial, sans-serif;
    }
    
    .citylore-widget-button-secondary:hover {
      background-color: #f59e0b10;
    }
    
    .citylore-widget-button-primary {
      background-color: #f59e0b;
      color: #1e3a8a;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex: 1;
      font-family: 'Poppins', Arial, sans-serif;
    }
    
    .citylore-widget-button-primary:hover {
      background-color: #d97706;
    }
    
    .citylore-widget-powered {
      text-align: center;
      padding: 10px;
      background-color: #f8fafc;
      border-top: 1px solid #f59e0b20;
    }
    
    .citylore-widget-powered a {
      color: #6b7280;
      text-decoration: none;
      font-size: 12px;
    }
    
    .citylore-widget-powered a:hover {
      color: #1e3a8a;
      text-decoration: underline;
    }
  `;

  // Mock category data
  const mockCategories = [
    {
      id: 'stories',
      name: 'Local Stories',
      city: 'San Francisco',
      emoji: '🏙️',
      price: 1000
    },
    {
      id: 'street-art',
      name: 'Street Art',
      city: 'Austin',
      emoji: '🎸',
      price: 1000
    },
    {
      id: 'poetry',
      name: 'City Poetry',
      city: 'New York',
      emoji: '🗽',
      price: 1000
    }
  ];

  // Widget HTML template
  function createWidgetHTML(category) {
    return `
      <div class="citylore-widget" data-category="${category.id}">
        <div class="citylore-widget-header">
          <h3 class="citylore-widget-logo">CityLore</h3>
          <p class="citylore-widget-tagline">Connecting Cities Through Stories</p>
        </div>
        
        <div class="citylore-widget-content">
          <div class="citylore-widget-category">
            <span class="citylore-widget-category-emoji">${category.emoji}</span>
            <h4 class="citylore-widget-category-title">${category.name}</h4>
            <p class="citylore-widget-category-city">${category.city}</p>
            <div class="citylore-widget-price">$${category.price.toLocaleString()}</div>
            <button class="citylore-widget-button" onclick="CityLoreWidget.toggleForm('${category.id}')">
              Sponsor This Category
            </button>
          </div>
          
          <div class="citylore-widget-form" id="form-${category.id}">
            <input type="text" class="citylore-widget-input" placeholder="Partner/Company Name" id="name-${category.id}" required>
            <input type="email" class="citylore-widget-input" placeholder="Contact Email" id="email-${category.id}" required>
            <div class="citylore-widget-form-buttons">
              <button class="citylore-widget-button-secondary" onclick="CityLoreWidget.toggleForm('${category.id}')">
                Cancel
              </button>
              <button class="citylore-widget-button-primary" onclick="CityLoreWidget.submitForm('${category.id}')">
                Submit
              </button>
            </div>
          </div>
        </div>
        
        <div class="citylore-widget-powered">
          <a href="https://citylore.com" target="_blank">Powered by CityLore</a>
        </div>
      </div>
    `;
  }

  // Main widget object
  window.CityLoreWidget = {
    init: function(options = {}) {
      const defaultOptions = {
        categoryId: 'stories',
        container: null
      };
      
      const config = { ...defaultOptions, ...options };
      
      // Inject CSS if not already present
      if (!document.getElementById('citylore-widget-css')) {
        const style = document.createElement('style');
        style.id = 'citylore-widget-css';
        style.textContent = widgetCSS;
        document.head.appendChild(style);
      }
      
      // Find category
      const category = mockCategories.find(cat => cat.id === config.categoryId) || mockCategories[0];
      
      // Create widget HTML
      const widgetHTML = createWidgetHTML(category);
      
      // Insert widget into container or create one
      let container = config.container;
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }
      
      if (!container) {
        // Find all elements with data-citylore-widget attribute
        const widgetElements = document.querySelectorAll('[data-citylore-widget]');
        widgetElements.forEach(element => {
          const categoryId = element.getAttribute('data-citylore-widget') || 'stories';
          const widgetCategory = mockCategories.find(cat => cat.id === categoryId) || mockCategories[0];
          element.innerHTML = createWidgetHTML(widgetCategory);
        });
      } else {
        container.innerHTML = widgetHTML;
      }
      
      console.log('CityLore Widget initialized');
    },

    toggleForm: function(categoryId) {
      const form = document.getElementById(`form-${categoryId}`);
      if (form) {
        form.classList.toggle('active');
      }
    },

    submitForm: function(categoryId) {
      const nameInput = document.getElementById(`name-${categoryId}`);
      const emailInput = document.getElementById(`email-${categoryId}`);
      
      if (!nameInput.value || !emailInput.value) {
        alert('Please fill in all required fields.');
        return;
      }
      
      const formData = {
        categoryId: categoryId,
        partnerName: nameInput.value,
        contactEmail: emailInput.value
      };
      
      // Simulate API call
      console.log('Submitting sponsor request:', formData);
      
      // Mock API response
      setTimeout(() => {
        alert(`Thank you ${formData.partnerName}! Your sponsorship request has been submitted. We'll contact you at ${formData.contactEmail} soon.`);
        
        // Reset form
        nameInput.value = '';
        emailInput.value = '';
        this.toggleForm(categoryId);
      }, 500);
    }
  };

  // Auto-initialize when DOM is ready
  function autoInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        CityLoreWidget.init();
      });
    } else {
      CityLoreWidget.init();
    }
  }

  // Start auto-initialization
  autoInit();

})();
