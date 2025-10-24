import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const AssessmentLayout = ({ children }: { children: React.ReactNode }) => (
      <div className="min-h-screen flex flex-col bg-background">
    <Navigation />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AssessmentLayout; 