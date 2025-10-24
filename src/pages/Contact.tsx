import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';

const Contact = () => {
  return (
    <Layout className="gradient-bg text-gray-800 antialiased" style={{
      fontFamily: "'Inter', sans-serif",
      backgroundColor: '#f8fafc',
      backgroundImage: `
        radial-gradient(at 0% 0%, hsla(212,80%,98%,1) 0px, transparent 50%),
        radial-gradient(at 100% 100%, hsla(280,80%,98%,1) 0px, transparent 50%)
      `
    }}>
      {/* Main Container */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        
        {/* Header Section */}
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Let's Connect</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We're always happy to hear from you. Find the right channel below to get in touch with our team.</p>
        </header>

        {/* Contact Cards Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Feedback */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 text-blue-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
                        </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Feedback & Suggestions</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">Help us improve! If you're referring to a specific assessment, please mention it in the subject line.</p>
            <a href="mailto:contact.factorbeam@gmail.com?subject=Feedback%20and%20Suggestions" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">feedback@factorbeam.com</a>
                      </div>
                      
          {/* Card 2: Media */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 text-purple-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
                      </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Media Inquiries</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">We have exciting career assessment stories to share, and our career experts are happy to answer your questions.</p>
            <a href="mailto:contact.factorbeam@gmail.com?subject=Media%20Inquiry" className="font-semibold text-purple-600 hover:text-purple-700 transition-colors">media@factorbeam.com</a>
                      </div>
                      
          {/* Card 3: Partnerships */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
                          </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Partnerships & Collabs</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">For assessment integrations, educational partnerships, or collaboration ideas, let's explore the possibilities together! 😀</p>
            <a href="mailto:contact.factorbeam@gmail.com?subject=Partnership%20Inquiry" className="font-semibold text-green-600 hover:text-green-700 transition-colors">partnerships@factorbeam.com</a>
              </div>

          {/* Card 4: Advertising */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Advertising</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">Interested in advertising your career services or educational programs? Let's discuss opportunities.</p>
            <a href="mailto:contact.factorbeam@gmail.com?subject=Advertising%20Inquiry" className="font-semibold text-yellow-700 hover:text-yellow-800 transition-colors">sales@factorbeam.com</a>
                </div>

          {/* Card 5: Ethics & Integrity */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
                        </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Ethics & Integrity</h2>
            <p className="text-gray-600 mb-5 leading-relaxed">We're committed to the highest standards in career assessment. Report any suspected violations of policy, law, or ethics.</p>
            <a href="mailto:contact.factorbeam@gmail.com?subject=Ethics%20Report" className="font-semibold text-red-600 hover:text-red-700 transition-colors">ethics@factorbeam.com</a>
                </div>

          {/* Card 6: Main Office */}
          <div className="bg-white/60 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
                <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">Our Office</h2>

            <address className="text-gray-600 not-italic mb-5">
              Drehill Private Limited, <br/>
              Chhatrapati Sambhajinagar, <br/>
              Maharashtra , India 431001
            </address>
            <a href="mailto:info@factorbeam.com?subject=General%20Inquiry" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">info@factorbeam.com</a>
          </div>
        </main>

        {/* Privacy & Consent Footer */}
        <footer className="mt-16 md:mt-24 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 max-w-4xl mx-auto">
          <p className="mb-4">
            By providing your email address, you agree to receive communications from FactorBeam. You can withdraw consent at any time by responding to any communication or by contacting <a href="mailto:contact.factorbeam@gmail.com?subject=Unsubscribe" className="font-medium text-gray-600 hover:text-gray-800 underline">feedback@factorbeam.com</a>
          </p>
          <p>
            Your personal information will only be used to handle your inquiry. We store and process personal data on the terms defined in our <Link to="/privacy" className="font-medium text-gray-600 hover:text-gray-800 underline">Privacy Policy</Link>
          </p>
        </footer>
        </div>
    </Layout>
  );
};

export default Contact; 