import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReleaseNotes from '@/components/ReleaseNotes';

const ReleaseNotesPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1">
        <ReleaseNotes />
      </main>
      <Footer />
    </div>
  );
};

export default ReleaseNotesPage;
