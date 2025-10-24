import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "", style }) => {
  return (
    <div className={`min-h-screen flex flex-col bg-gray-50 ${className}`} style={style}>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
