
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { mockApi } from '@/services/mockApi';
import type { Category } from '@/services/mockApi';

interface SponsorPitchPanelProps {
  category: Category;
}

const SponsorPitchPanel: React.FC<SponsorPitchPanelProps> = ({ category }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    partnerName: '',
    contactEmail: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await mockApi.submitSponsorRequest({
        categoryId: category.id,
        ...formData
      });

      if (result.success) {
        toast({
          title: "Request Submitted!",
          description: `Your sponsorship request for ${category.name} has been received. Request ID: ${result.requestId}`,
        });
        setFormData({ partnerName: '', contactEmail: '', message: '' });
        setIsFormOpen(false);
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

  if (category.currentSponsor) {
    return (
      <Card className="cl-card p-6 border-cl-accent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-playfair font-semibold text-cl-primary">
            Proudly Sponsored By
          </h3>
          <span className="text-2xl">{category.currentSponsor.logo}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <h4 className="font-semibold text-cl-primary mb-1">
              {category.currentSponsor.name}
            </h4>
            <p className="text-sm text-gray-600 mb-2">
              {category.currentSponsor.description}
            </p>
            <a
              href={category.currentSponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cl-accent cl-link-hover text-sm font-medium"
            >
              Visit Website →
            </a>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="cl-card p-6 border-cl-accent bg-gradient-to-r from-cl-accent/5 to-cl-primary/5">
      <div className="text-center">
        <h3 className="text-xl font-playfair font-bold text-cl-primary mb-2">
          Sponsor This Category
        </h3>
        <p className="text-gray-600 mb-4">
          Support {category.name} in {category.city} for just ${category.sponsorshipPrice}
        </p>
        
        {!isFormOpen ? (
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold px-8 py-2"
          >
            Become a Sponsor
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-cl-primary mb-1">
                Partner/Company Name
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
              <label className="block text-sm font-medium text-cl-primary mb-1">
                Contact Email
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
              <label className="block text-sm font-medium text-cl-primary mb-1">
                Message (Optional)
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="cl-gold-border"
                placeholder="Tell us why you'd like to sponsor this category..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold flex-1"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="border-cl-accent text-cl-primary hover:bg-cl-accent/10"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </Card>
  );
};

export default SponsorPitchPanel;
