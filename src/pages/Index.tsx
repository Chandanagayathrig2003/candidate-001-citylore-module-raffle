
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-cl-primary to-cl-primary/90 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-playfair font-bold mb-6">
              Welcome to <span className="text-cl-accent">CityLore</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Help cities create microsites where locals and visitors share tales, legends, 
              and cultural insights through photos, videos, poems, and street art.
            </p>
            <div className="space-x-4">
              <Link to="/categories">
                <Button className="bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold px-8 py-3 text-lg">
                  Explore Categories
                </Button>
              </Link>
              <Link to="/sponsor">
                <Button variant="outline" className="border-cl-accent text-cl-accent hover:bg-cl-accent/10 px-8 py-3 text-lg">
                  Become a Sponsor
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-playfair font-bold text-cl-primary mb-4">
                Sponsor Rapid-Win Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Partner with us to sponsor award categories for just $1,000 and showcase your 
                brand on dedicated city category pages.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="cl-card p-6 text-center">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-xl font-playfair font-semibold text-cl-primary mb-3">
                  Email Templates
                </h3>
                <p className="text-gray-600 mb-4">
                  Professional sponsor pitch emails with category details and clear CTAs.
                </p>
                <Link to="/email-preview">
                  <Button variant="outline" className="border-cl-accent text-cl-accent hover:bg-cl-accent/10">
                    View Email Preview
                  </Button>
                </Link>
              </Card>

              <Card className="cl-card p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-playfair font-semibold text-cl-primary mb-3">
                  Category Sponsorship
                </h3>
                <p className="text-gray-600 mb-4">
                  Sponsor award categories and get featured on city-specific pages.
                </p>
                <Link to="/categories">
                  <Button variant="outline" className="border-cl-accent text-cl-accent hover:bg-cl-accent/10">
                    Browse Categories
                  </Button>
                </Link>
              </Card>

              <Card className="cl-card p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-playfair font-semibold text-cl-primary mb-3">
                  Admin Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                  Simple interface for tracking and managing sponsorship requests.
                </p>
                <Link to="/admin">
                  <Button variant="outline" className="border-cl-accent text-cl-accent hover:bg-cl-accent/10">
                    View Dashboard
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-cl-primary/5 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold text-cl-primary mb-4">
              Ready to Support Local Culture?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join our network of sponsors supporting cities worldwide in preserving and 
              sharing their unique stories and cultural heritage.
            </p>
            <Link to="/sponsor">
              <Button className="bg-cl-accent hover:bg-cl-accent/90 text-cl-primary font-semibold px-12 py-4 text-lg">
                Start Sponsoring Today
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
