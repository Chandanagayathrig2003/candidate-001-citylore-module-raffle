
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockApi, type Category } from '@/services/mockApi';

const SponsorPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('cat');
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryId || '');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    partnerName: '',
    contactEmail: '',
    message: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await mockApi.getCategories();
        setCategories(data.filter(cat => !cat.currentSponsor)); // Only show available categories
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) {
      toast({
        title: "Error",
        description: "Please select a category to sponsor.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await mockApi.submitSponsorRequest({
        categoryId: selectedCategory,
        ...formData
      });

      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: `Your sponsorship request has been received. Request ID: ${result.requestId}`,
        });
        setFormData({ partnerName: '', contactEmail: '', message: '' });
        setSelectedCategory('');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit sponsorship request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair font-bold text-cl-primary mb-4">
            Become a Category Sponsor
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Support local culture and creativity by sponsoring an award category for just $1,000. 
            Your brand will be featured on the category page and in sponsor communications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Sponsorship Benefits */}
          <Card className="cl-card p-8">
            <h2 className="text-2xl font-playfair font-bold text-cl-primary mb-6">
              Sponsorship Benefits
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cl-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cl-primary text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cl-primary">Brand Visibility</h3>
                  <p className="text-gray-600 text-sm">
                    Your logo and company information prominently displayed on the category page
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cl-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cl-primary text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cl-primary">Community Recognition</h3>
                  <p className="text-gray-600 text-sm">
                    Acknowledged as a supporter of local culture and storytelling
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cl-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cl-primary text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cl-primary">Email Marketing</h3>
                  <p className="text-gray-600 text-sm">
                    Featured in sponsor pitch emails sent to potential participants
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cl-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-cl-primary text-sm font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-cl-primary">Direct Link</h3>
                  <p className="text-gray-600 text-sm">
                    Clickable link to your website from the sponsorship display
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-cl-accent/10 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-playfair font-bold text-cl-primary">$1,000</p>
                <p className="text-sm text-gray-600">Per category sponsorship</p>
              </div>
            </div>
          </Card>

          {/* Sponsorship Form */}
          <Card className="cl-card p-8">
            <h2 className="text-2xl font-playfair font-bold text-cl-primary mb-6">
              Submit Sponsorship Request
            </h2>

            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cl-primary mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading categories...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-cl-primary mb-2">
                    Select Category to Sponsor
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    required
                    className="w-full p-3 border border-cl-accent/30 rounded-md focus:ring-2 focus:ring-cl-accent focus:border-transparent"
                  >
                    <option value="">Choose a category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name} - {category.city}
                      </option>
                    ))}
                  </select>
                  
                  {selectedCategoryData && (
                    <div className="mt-3 p-3 bg-cl-primary/5 rounded-md">
                      <p className="text-sm text-gray-600">
                        <strong>{selectedCategoryData.name}</strong>: {selectedCategoryData.description}
                      </p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-cl-primary mb-2">
                    Partner/Company Name *
                  </label>
                  <Input
                    type="text"
                    required
                    value={formData.partnerName}
                    onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                    className="cl-gold-border"
                    placeholder="Your organization name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cl-primary mb-2">
                    Contact Email *
                  </label>
                  <Input
                    type="email"
                    required
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="cl-gold-border"
                    placeholder="your.email@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-cl-primary mb-2">
                    Message (Optional)
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="cl-gold-border"
                    placeholder="Tell us about your organization and why you'd like to sponsor this category..."
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || !selectedCategory}
                  className="w-full bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold py-3 text-lg"
                >
                  {isSubmitting ? 'Submitting Request...' : 'Submit Sponsorship Request'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SponsorPage;
