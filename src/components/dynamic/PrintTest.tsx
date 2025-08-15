import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Printer, Download } from 'lucide-react';

const PrintTest: React.FC = () => {
  const handlePrint = () => {
    // Add print-specific styles before printing
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.innerHTML = `
      @media print {
        @page {
          margin: 0.5in;
          size: A4;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        body {
          background: white !important;
          color: #1e293b !important;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          margin: 0;
          padding: 0;
        }
        
        .no-print {
          display: none !important;
        }
        
        .print-only {
          display: block !important;
        }
        
        /* Professional Header */
        .print-header {
          display: block !important;
          background: linear-gradient(135deg, #1EAEDB 0%, #33C3F0 100%);
          color: white;
          padding: 2rem 0;
          margin-bottom: 2rem;
          text-align: center;
          border-radius: 0;
        }
        
        .print-logo {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: white;
          font-family: 'Poppins', sans-serif;
        }
        
        .print-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1rem;
        }
        
        .print-date {
          font-size: 0.9rem;
          opacity: 0.8;
          border-top: 1px solid rgba(255,255,255,0.3);
          padding-top: 1rem;
          margin-top: 1rem;
        }
        
        /* Assessment Title Section */
        .print-assessment-title {
          text-align: center;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
        }
        
        .print-assessment-title h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .print-assessment-title h2 {
          font-size: 1.2rem;
          color: #64748b;
          font-weight: 500;
        }
        
        /* Score Cards */
        .print-score-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-score-card {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .print-score-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #1EAEDB, #33C3F0);
        }
        
        .print-score-card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-score-value {
          font-size: 3rem;
          font-weight: 800;
          color: #1EAEDB;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .print-score-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }
        
        .print-score-badge.excellent {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #22c55e;
        }
        
        .print-score-badge.good {
          background: #fef3c7;
          color: #92400e;
          border: 1px solid #f59e0b;
        }
        
        .print-score-badge.needs-work {
          background: #fee2e2;
          color: #991b1b;
          border: 1px solid #ef4444;
        }
        
        .print-progress-container {
          margin: 1rem 0;
        }
        
        .print-progress-bar {
          height: 12px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
          position: relative;
        }
        
        .print-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1EAEDB, #33C3F0);
          border-radius: 6px;
          transition: width 0.3s ease;
        }
        
        .print-score-description {
          font-size: 0.9rem;
          color: #64748b;
          margin-top: 0.5rem;
        }
        
        /* Career Paths */
        .print-career-section {
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .print-career-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .print-career-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .print-career-card {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1rem;
        }
        
        .print-career-card-title {
          font-size: 1rem;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 0.5rem;
        }
        
        .print-career-card-description {
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.75rem;
        }
        
        .print-career-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .print-career-badge {
          background: #1EAEDB;
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .print-career-alignment {
          font-size: 0.85rem;
          color: #1EAEDB;
          font-weight: 600;
        }
        
        /* Professional Footer */
        .print-footer {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          color: white;
          padding: 2rem;
          margin-top: 3rem;
          border-radius: 12px;
          text-align: center;
        }
        
        .print-footer-brand {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: white;
        }
        
        .print-footer-description {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .print-footer-contact {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          font-size: 0.8rem;
          opacity: 0.7;
        }
        
        .print-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        /* Hide interactive elements */
        button, .btn, .button, .interactive-element {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Remove print styles after printing
    setTimeout(() => {
      const printStyle = document.getElementById('print-styles');
      if (printStyle) {
        printStyle.remove();
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 assessment-print-container">
      {/* Print Header - Hidden on screen, visible in print */}
      <div className="hidden print:block print-header">
        <div className="print-logo">Path Finder</div>
        <div className="print-subtitle">Career Assessment & Guidance Platform</div>
        <div className="print-date">Generated on: {new Date().toLocaleDateString()}</div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 no-print">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Print Test - Assessment Results</h1>
          <p className="text-xl text-gray-600">Test the print functionality for dynamic assessment results</p>
        </div>

        {/* Print Title */}
        <div className="hidden print:block print-section">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Assessment Results</h1>
          <h2 className="text-xl text-gray-600 text-center mb-6">AWS Cloud Practitioner</h2>
        </div>

        {/* Sample Results */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 print-grid">
          <Card className="bg-white shadow-lg border-l-4 border-l-purple-500 hover:shadow-xl transition-shadow print-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-purple-100 rounded-lg no-print">
                  <div className="w-5 h-5 bg-purple-600 rounded"></div>
                </div>
                <span>Psychological Fit</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-purple-600 print-score">85%</span>
                    <Badge variant="default" className="text-xs px-3 py-1 print-badge">
                      Excellent
                    </Badge>
                  </div>
                  <div className="print-progress">
                    <div 
                      className="print-progress-fill" 
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                  <Progress value={85} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600">
                    Outstanding performance in psychological assessment
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-green-500 hover:shadow-xl transition-shadow print-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-green-100 rounded-lg no-print">
                  <div className="w-5 h-5 bg-green-600 rounded"></div>
                </div>
                <span>Technical Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-green-600 print-score">72%</span>
                    <Badge variant="secondary" className="text-xs px-3 py-1 print-badge">
                      Strong
                    </Badge>
                  </div>
                  <div className="print-progress">
                    <div 
                      className="print-progress-fill" 
                      style={{ width: '72%' }}
                    ></div>
                  </div>
                  <Progress value={72} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600">
                    Strong technical foundation demonstrated
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-l-4 border-l-orange-500 hover:shadow-xl transition-shadow print-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-800">
                <div className="p-2 bg-orange-100 rounded-lg no-print">
                  <div className="w-5 h-5 bg-orange-600 rounded"></div>
                </div>
                <span>WISCAR Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-4xl font-bold text-orange-600 print-score">78%</span>
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 text-xs px-3 py-1 print-badge">Overall</Badge>
                  </div>
                  <div className="print-progress">
                    <div 
                      className="print-progress-fill" 
                      style={{ width: '78%' }}
                    ></div>
                  </div>
                  <Progress value={78} className="h-3 bg-gray-200 no-print" />
                  <div className="mt-2 text-sm text-gray-600">
                    Excellent holistic assessment score
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sample Career Paths */}
        <Card className="mb-8 print-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-600 rounded no-print"></div>
              Recommended Career Paths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 print-career-path">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-5 h-5 bg-green-600 rounded-full no-print"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800 print-career-title">AWS Solutions Architect</h4>
                    <p className="text-sm text-green-700 mt-1 print-career-description">Design and implement scalable cloud solutions</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="text-xs print-badge">
                    High match
                  </Badge>
                  <span className="text-sm text-green-600 font-medium">
                    85% alignment
                  </span>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 print-career-path">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-5 h-5 bg-blue-600 rounded-full no-print"></div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-800 print-career-title">Cloud Security Engineer</h4>
                    <p className="text-sm text-blue-700 mt-1 print-career-description">Secure cloud infrastructure and applications</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <Badge variant="outline" className="text-xs print-badge">
                    Good match
                  </Badge>
                  <span className="text-sm text-blue-600 font-medium">
                    72% alignment
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Print Footer */}
        <div className="hidden print:block print-footer">
          <p>This assessment was conducted on Path Finder - Career Assessment & Guidance Platform</p>
          <p>For more information, visit our platform or contact our career advisors</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center no-print">
          <Button 
            onClick={handlePrint}
            className="flex items-center gap-2"
          >
            <Printer className="h-4 w-4" />
            Test Print Results
          </Button>
          <Button 
            variant="outline"
            onClick={() => {
              // Generate PDF download
              handlePrint();
            }}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintTest;
