import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const AssessmentLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default AssessmentLayout; 