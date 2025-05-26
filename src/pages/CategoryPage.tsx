
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import SponsorPitchPanel from '@/components/SponsorPitchPanel';
import { Card } from '@/components/ui/card';
import { mockApi, type Category } from '@/services/mockApi';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategory = async () => {
      if (!id) return;
      
      try {
        const data = await mockApi.getCategory(id);
        setCategory(data);
      } catch (error) {
        console.error('Failed to load category:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cl-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading category...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-playfair font-bold text-cl-primary mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="text-6xl">{category.cityLogo}</span>
            <div className="text-left">
              <h1 className="text-4xl font-playfair font-bold text-cl-primary">
                {category.name}
              </h1>
              <p className="text-xl text-gray-600">{category.city}</p>
            </div>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Sample Content */}
            <Card className="cl-card p-8">
              <h2 className="text-2xl font-playfair font-bold text-cl-primary mb-6">
                Featured Submissions
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-cl-accent pl-6">
                  <h3 className="font-semibold text-cl-primary mb-2">
                    "The Coffee Shop Chronicles"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    A story about the historic corner café that has been serving the neighborhood 
                    for over 50 years, where three generations of families have shared their daily rituals.
                  </p>
                  <p className="text-sm text-gray-500">Submitted by Maria Rodriguez</p>
                </div>
                
                <div className="border-l-4 border-cl-accent pl-6">
                  <h3 className="font-semibold text-cl-primary mb-2">
                    "Street Musicians of Main Street"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    A photo series capturing the talented performers who bring life to our downtown 
                    area every weekend, each with their own unique story and musical journey.
                  </p>
                  <p className="text-sm text-gray-500">Submitted by Alex Chen</p>
                </div>
                
                <div className="border-l-4 border-cl-accent pl-6">
                  <h3 className="font-semibold text-cl-primary mb-2">
                    "The Bridge That Connects Us"
                  </h3>
                  <p className="text-gray-600 mb-2">
                    A poem about the old stone bridge that spans our river, connecting not just 
                    two sides of the city, but generations of memories and love stories.
                  </p>
                  <p className="text-sm text-gray-500">Submitted by Jordan Smith</p>
                </div>
              </div>
            </Card>

            <Card className="cl-card p-8">
              <h2 className="text-2xl font-playfair font-bold text-cl-primary mb-6">
                How to Participate
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-cl-primary mb-2">📝 Share Your Story</h3>
                  <p className="text-gray-600 text-sm">
                    Write about a place, person, or moment that captures the essence of our city.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-cl-primary mb-2">📸 Upload Media</h3>
                  <p className="text-gray-600 text-sm">
                    Include photos, videos, or audio recordings that bring your story to life.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-cl-primary mb-2">🏆 Win Recognition</h3>
                  <p className="text-gray-600 text-sm">
                    Outstanding submissions are featured and eligible for monthly awards.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-cl-primary mb-2">🤝 Build Community</h3>
                  <p className="text-gray-600 text-sm">
                    Connect with fellow storytellers and celebrate our shared heritage.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sponsor Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <SponsorPitchPanel category={category} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
