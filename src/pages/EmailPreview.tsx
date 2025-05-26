
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const EmailPreview = () => {
  const [selectedCategory, setSelectedCategory] = useState('stories');

  const categoryData = {
    stories: {
      name: 'Local Stories',
      city: 'San Francisco',
      cityLogo: '🏙️',
      description: 'Tales and legends that define our city\'s character'
    },
    'street-art': {
      name: 'Street Art',
      city: 'Austin',
      cityLogo: '🎸',
      description: 'Urban expression and cultural creativity'
    },
    poetry: {
      name: 'City Poetry',
      city: 'New York',
      cityLogo: '🗽',
      description: 'Verses that capture the soul of our streets'
    },
    photography: {
      name: 'Urban Photography',
      city: 'Seattle',
      cityLogo: '🌧️',
      description: 'Visual stories through the lens'
    }
  };

  const category = categoryData[selectedCategory as keyof typeof categoryData];

  const generateEmailHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sponsor ${category.name} - CityLore</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f8fafc;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #f59e0b20;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .header {
            background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        
        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 700;
            color: #f59e0b;
            margin-bottom: 10px;
        }
        
        .tagline {
            font-size: 14px;
            opacity: 0.9;
            margin: 0;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .city-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .city-logo {
            font-size: 48px;
            margin-bottom: 15px;
        }
        
        .category-title {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            font-weight: 600;
            color: #1e3a8a;
            margin: 0 0 5px 0;
        }
        
        .city-name {
            font-size: 16px;
            color: #6b7280;
            margin: 0;
        }
        
        .description {
            font-size: 16px;
            line-height: 1.6;
            color: #374151;
            text-align: center;
            margin: 20px 0 30px 0;
        }
        
        .sponsor-section {
            background: linear-gradient(135deg, #f59e0b10 0%, #1e3a8a10 100%);
            border: 1px solid #f59e0b30;
            border-radius: 8px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        
        .sponsor-title {
            font-family: 'Playfair Display', serif;
            font-size: 20px;
            font-weight: 600;
            color: #1e3a8a;
            margin: 0 0 15px 0;
        }
        
        .price {
            font-size: 32px;
            font-weight: 700;
            color: #f59e0b;
            margin: 15px 0;
        }
        
        .benefits {
            text-align: left;
            margin: 25px 0;
        }
        
        .benefit-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            font-size: 14px;
            color: #374151;
        }
        
        .benefit-icon {
            width: 20px;
            height: 20px;
            background-color: #f59e0b;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            flex-shrink: 0;
        }
        
        .benefit-icon::after {
            content: "✓";
            color: #1e3a8a;
            font-weight: bold;
            font-size: 12px;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #f59e0b;
            color: #1e3a8a;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 16px;
            margin: 20px 0;
            transition: all 0.2s ease;
        }
        
        .cta-button:hover {
            background-color: #d97706;
            transform: translateY(-1px);
        }
        
        .footer {
            background-color: #1e3a8a;
            color: white;
            padding: 30px;
            text-align: center;
            font-size: 14px;
        }
        
        .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 18px;
            color: #f59e0b;
            margin-bottom: 10px;
        }
        
        .footer-text {
            opacity: 0.8;
            line-height: 1.5;
        }
        
        @media (max-width: 480px) {
            .content {
                padding: 30px 20px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .sponsor-section {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">CityLore</div>
            <p class="tagline">Connecting Cities Through Stories</p>
        </div>
        
        <!-- Main Content -->
        <div class="content">
            <div class="city-header">
                <div class="city-logo">${category.cityLogo}</div>
                <h1 class="category-title">${category.name}</h1>
                <p class="city-name">${category.city}</p>
            </div>
            
            <p class="description">
                ${category.description}. Join us in celebrating and preserving the unique cultural heritage of ${category.city} through community storytelling.
            </p>
            
            <div class="sponsor-section">
                <h2 class="sponsor-title">Become a Category Sponsor</h2>
                <div class="price">$1,000</div>
                <p style="margin: 15px 0; color: #6b7280;">
                    Support local culture and get your brand featured
                </p>
                
                <div class="benefits">
                    <div class="benefit-item">
                        <div class="benefit-icon"></div>
                        <span>Prominent logo placement on category page</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon"></div>
                        <span>Recognition in all category communications</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon"></div>
                        <span>Direct link to your website</span>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon"></div>
                        <span>Community appreciation and goodwill</span>
                    </div>
                </div>
                
                <a href="https://citylore.example.com/sponsor?cat=${selectedCategory}" class="cta-button">
                    Sponsor ${category.name}
                </a>
            </div>
            
            <p style="text-align: center; color: #6b7280; font-size: 14px; line-height: 1.5;">
                Questions? Reply to this email or contact us at <a href="mailto:sponsors@citylore.com" style="color: #f59e0b;">sponsors@citylore.com</a>
            </p>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">CityLore</div>
            <div class="footer-text">
                Helping cities preserve and share their unique stories<br>
                through community-driven cultural content.
            </div>
        </div>
    </div>
</body>
</html>`;
  };

  const downloadHTML = () => {
    const htmlContent = generateEmailHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `citylore-sponsor-email-${selectedCategory}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-cl-primary mb-4">
            Email Template Preview
          </h1>
          <p className="text-lg text-gray-600">
            Professional sponsor pitch emails with category details and clear CTAs
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-cl-primary">
              Select Category:
            </label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stories">Local Stories - San Francisco</SelectItem>
                <SelectItem value="street-art">Street Art - Austin</SelectItem>
                <SelectItem value="poetry">City Poetry - New York</SelectItem>
                <SelectItem value="photography">Urban Photography - Seattle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={downloadHTML}
            className="bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold"
          >
            Download HTML
          </Button>
        </div>

        <Card className="cl-card overflow-hidden">
          <div className="bg-gray-100 p-4 border-b">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="font-medium">Preview:</span>
              <span>Sponsor {category.name} - CityLore</span>
            </div>
          </div>
          
          <div className="bg-white">
            <iframe
              srcDoc={generateEmailHTML()}
              className="w-full"
              style={{ height: '800px' }}
              title="Email Preview"
            />
          </div>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            This responsive HTML email template is optimized for 600px width and includes:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-cl-primary/5 p-3 rounded">
              <strong className="text-cl-primary">Mobile Responsive</strong><br />
              Adapts to all screen sizes
            </div>
            <div className="bg-cl-primary/5 p-3 rounded">
              <strong className="text-cl-primary">Brand Consistent</strong><br />
              Uses CityLore fonts & colors
            </div>
            <div className="bg-cl-primary/5 p-3 rounded">
              <strong className="text-cl-primary">Clear CTA</strong><br />
              Direct link to sponsor page
            </div>
            <div className="bg-cl-primary/5 p-3 rounded">
              <strong className="text-cl-primary">Professional Design</strong><br />
              Ready for email campaigns
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmailPreview;
