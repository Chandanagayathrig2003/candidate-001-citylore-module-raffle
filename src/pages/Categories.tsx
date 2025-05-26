
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockApi, type Category } from '@/services/mockApi';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await mockApi.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cl-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-cl-primary mb-4">
            Award Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and sponsor the categories that celebrate local culture and creativity 
            across cities worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="cl-card overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{category.cityLogo}</span>
                    <div>
                      <h3 className="font-playfair font-semibold text-cl-primary text-lg">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">{category.city}</p>
                    </div>
                  </div>
                  {category.currentSponsor && (
                    <div className="text-right">
                      <span className="text-xs bg-cl-accent/20 text-cl-primary px-2 py-1 rounded-full">
                        Sponsored
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                  {category.description}
                </p>

                {category.currentSponsor ? (
                  <div className="bg-cl-accent/10 p-3 rounded-lg mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.currentSponsor.logo}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cl-primary">
                          {category.currentSponsor.name}
                        </p>
                        <p className="text-xs text-gray-600">Current Sponsor</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-cl-accent/10 to-cl-primary/10 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-cl-primary text-center">
                      Available for Sponsorship
                    </p>
                    <p className="text-xs text-gray-600 text-center">
                      ${category.sponsorshipPrice.toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Link to={`/category/${category.id}`} className="block">
                    <Button 
                      variant="outline" 
                      className="w-full border-cl-accent text-cl-primary hover:bg-cl-accent/10"
                    >
                      View Category Page
                    </Button>
                  </Link>
                  {!category.currentSponsor && (
                    <Link to={`/sponsor?cat=${category.id}`} className="block">
                      <Button className="w-full bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold">
                        Sponsor for ${category.sponsorshipPrice.toLocaleString()}
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
