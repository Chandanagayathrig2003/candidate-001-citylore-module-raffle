
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/categories', label: 'Categories' },
    { path: '/sponsor', label: 'Sponsor' },
    { path: '/admin', label: 'Admin' },
    { path: '/email-preview', label: 'Email Preview' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-cl-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-playfair font-bold text-cl-accent">
                CityLore
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium cl-link-hover ${
                      location.pathname === item.path
                        ? 'bg-cl-accent text-cl-primary'
                        : 'text-white hover:bg-cl-primary/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-cl-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-cl-accent font-playfair text-lg mb-2">CityLore</p>
            <p className="text-sm opacity-80">
              Connecting cities through stories, legends, and cultural insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
