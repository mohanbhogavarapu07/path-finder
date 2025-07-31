
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const popularPages = [
    { name: 'Home', path: '/', description: 'Return to our homepage' },
    { name: 'Assessments', path: '/assessments', description: 'Browse career assessments' },
    { name: 'About Us', path: '/about', description: 'Learn more about PathFinder' },
    { name: 'Blog', path: '/blog', description: 'Read career guidance articles' },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-16">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Large 404 */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-thinkera-purple opacity-20">404</h1>
            <div className="-mt-8">
              <h2 className="text-4xl font-bold text-foreground mb-4">Page Not Found</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="flex items-center gap-2">
              <Link to="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button variant="outline" onClick={() => window.history.back()} size="lg" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center justify-center gap-2">
              <Search className="h-5 w-5" />
              Popular Pages
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {popularPages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className="block p-4 border border-border rounded-lg hover:border-thinkera-purple/30 hover:bg-thinkera-purple/5 transition-colors text-left"
                >
                                      <h4 className="font-semibold text-foreground mb-1">{page.name}</h4>
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              If you believe this is an error, please{' '}
              <a href="mailto:support@pathfinder.com" className="text-thinkera-purple hover:underline">
                contact our support team
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
