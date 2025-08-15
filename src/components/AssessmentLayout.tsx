import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const AssessmentLayout = ({ children }: { children: React.ReactNode }) => (
      <div className="min-h-screen flex flex-col bg-background">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AssessmentLayout; 