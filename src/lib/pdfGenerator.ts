export class PDFGenerator {

  /**
   * Print the element with custom styles
   */
  static printElement(element: HTMLElement): void {
    // Check if we're on a mobile device with more accurate detection
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                     (window.innerWidth <= 768) || 
                     ('ontouchstart' in window);
    
    if (isMobile) {
      // For mobile devices, use a different approach
      this.printElementMobile(element);
      return;
    }

    // Create a new window for printing (desktop)
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Failed to open print window');
      return;
    }

    // Get the element's HTML and add print styles
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Assessment Results - Print</title>
          <style>
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
              font-size: 12pt;
              line-height: 1.5;
              margin: 0;
              padding: 0;
            }
            
            /* Import the PDF layout styles */
            .pdf-layout-container {
              width: 100% !important;
              max-width: none !important;
              margin: 0 !important;
              padding: 0 !important;
              background: white !important;
              color: #1e293b !important;
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              line-height: 1.5 !important;
              font-size: 12pt !important;
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
              position: static !important;
              left: auto !important;
              top: auto !important;
              z-index: auto !important;
            }
            
            /* Ensure all PDF layout elements are visible */
            .pdf-layout-container * {
              visibility: visible !important;
              opacity: 1 !important;
              display: block !important;
            }
            
            /* Hide any elements that might interfere */
            .hidden, [style*="display: none"], [style*="visibility: hidden"] {
              display: block !important;
              visibility: visible !important;
              opacity: 1 !important;
            }
            
            /* Header styles */
            .pdf-header {
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%) !important;
              color: white !important;
              padding: 2rem 0 !important;
              margin-bottom: 2rem !important;
              text-align: center !important;
              position: relative !important;
              overflow: hidden !important;
            }
           
           .pdf-header-content {
             display: flex !important;
             justify-content: space-between !important;
             align-items: center !important;
             max-width: 700px !important;
             margin: 0 auto !important;
             padding: 0 1.5rem !important;
           }
           
           .pdf-logo-section {
             display: flex !important;
             align-items: center !important;
             gap: 0.75rem !important;
           }
           
           .pdf-logo-icon {
             background: rgba(255, 255, 255, 0.2) !important;
             border-radius: 50% !important;
             padding: 0.5rem !important;
             display: flex !important;
             align-items: center !important;
             justify-content: center !important;
           }
           
           .pdf-logo-title {
             font-size: 1.5rem !important;
             font-weight: 700 !important;
             margin: 0 !important;
             color: white !important;
           }
           
           .pdf-logo-subtitle {
             font-size: 0.9rem !important;
             opacity: 0.9 !important;
             margin: 0 !important;
             color: white !important;
           }
           
           .pdf-header-info {
             text-align: right !important;
           }
           
           .pdf-date {
             font-size: 0.8rem !important;
             opacity: 0.8 !important;
             margin: 0 0 0.25rem 0 !important;
           }
           
           .pdf-assessment-name {
             font-size: 1rem !important;
             font-weight: 600 !important;
             margin: 0 !important;
           }
           
           /* Title section */
           .pdf-title-section {
             margin-bottom: 0.75rem !important;
             padding: 0.5rem 1rem !important;
             background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
             border: 2px solid #e2e8f0 !important;
             border-radius: 12px !important;
             position: relative !important;
             overflow: hidden !important;
             min-height: 80px !important;
             display: flex !important;
             align-items: center !important;
           }
           
           .pdf-title-section::before {
             content: '' !important;
             position: absolute !important;
             top: 0 !important;
             left: 0 !important;
             right: 0 !important;
             height: 4px !important;
             background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4) !important;
           }
           
           /* Header Content Layout */
           .pdf-header-content {
             display: flex !important;
             align-items: flex-start !important;
             justify-content: space-between !important;
             width: 100% !important;
             max-width: 100% !important;
             gap: 2rem !important;
             padding: 0.25rem 0 !important;
           }
           
           .pdf-logo-left {
             flex-shrink: 0 !important;
             display: flex !important;
             flex-direction: column !important;
             align-items: flex-start !important;
             justify-content: flex-start !important;
             width: auto !important;
             min-width: 120px !important;
           }
           
           .pdf-header-text {
             flex: 1 !important;
             text-align: right !important;
             max-width: calc(100% - 8rem) !important;
             padding-left: 0 !important;
             display: flex !important;
             flex-direction: column !important;
             align-items: flex-end !important;
             justify-content: flex-start !important;
           }
           
           .pdf-date-info {
             text-align: right !important;
             margin-top: 0.2rem !important;
             align-self: flex-end !important;
           }
           
           .pdf-main-title {
             font-size: 1.6rem !important;
             font-weight: 800 !important;
             color: #1e293b !important;
             margin: 0 0 0.15rem 0 !important;
             background: linear-gradient(135deg, #1e293b, #475569) !important;
             -webkit-background-clip: text !important;
             -webkit-text-fill-color: transparent !important;
             background-clip: text !important;
             text-align: right !important;
           }
           
           .pdf-assessment-title {
             font-size: 1.1rem !important;
             color: #64748b !important;
             font-weight: 600 !important;
             margin: 0 0 0.2rem 0 !important;
             text-align: right !important;
           }
           
           .pdf-assessment-description {
             font-size: 0.9rem !important;
             color: #64748b !important;
             margin: 0 0 0.15rem 0 !important;
             line-height: 1.2 !important;
             text-align: right !important;
             max-width: 400px !important;
           }
           
                       .pdf-date {
              font-size: 0.85rem !important;
              color: #64748b !important;
              margin: 0 !important;
              font-weight: 500 !important;
              text-align: right !important;
              font-style: italic !important;
            }
           
           /* Recommendation section */
           .pdf-recommendation {
             background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
             border: 3px solid #1e40af !important;
             border-radius: 16px !important;
             padding: 2rem !important;
             margin-bottom: 2rem !important;
             text-align: center !important;
             position: relative !important;
             overflow: hidden !important;
             box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1) !important;
           }
           
           .pdf-recommendation.green {
             background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
             border-color: #22c55e !important;
             box-shadow: 0 4px 16px rgba(34, 197, 94, 0.1) !important;
           }
           
           .pdf-recommendation.orange {
             background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%) !important;
             border-color: #f97316 !important;
             box-shadow: 0 4px 16px rgba(249, 115, 22, 0.1) !important;
           }
           
           .pdf-recommendation.red {
             background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%) !important;
             border-color: #ef4444 !important;
             box-shadow: 0 4px 16px rgba(239, 68, 68, 0.1) !important;
           }
           
           .pdf-recommendation-content {
             display: flex !important;
             align-items: center !important;
             justify-content: center !important;
             gap: 0.75rem !important;
             margin-bottom: 0.75rem !important;
           }
           
           .pdf-recommendation-icon {
             background: rgba(30, 174, 219, 0.1) !important;
             border-radius: 50% !important;
             padding: 0.4rem !important;
             display: flex !important;
             align-items: center !important;
             justify-content: center !important;
           }
           
           .pdf-recommendation.green .pdf-recommendation-icon {
             background: rgba(34, 197, 94, 0.1) !important;
           }
           
           .pdf-recommendation.orange .pdf-recommendation-icon {
             background: rgba(249, 115, 22, 0.1) !important;
           }
           
           .pdf-recommendation.red .pdf-recommendation-icon {
             background: rgba(239, 68, 68, 0.1) !important;
           }
           
           .pdf-recommendation-text {
             flex: 1 !important;
             text-align: left !important;
           }
           
           .pdf-recommendation-title {
             font-size: 1rem !important;
             font-weight: 700 !important;
             color: #1e293b !important;
             margin: 0 0 0.2rem 0 !important;
           }
           
           .pdf-recommendation-description {
             font-size: 0.8rem !important;
             color: #64748b !important;
             margin: 0 !important;
           }
           
           .pdf-recommendation-score {
             display: flex !important;
             flex-direction: column !important;
             align-items: center !important;
             text-align: center !important;
           }
           
           .pdf-score-value {
             font-size: 1.2rem !important;
             font-weight: 800 !important;
             color: #1EAEDB !important;
           }
           
           .pdf-score-label {
             font-size: 0.6rem !important;
             color: #64748b !important;
             font-weight: 500 !important;
           }
           
           .pdf-recommendation-badge {
             text-align: center !important;
           }
           
           .pdf-badge {
             background: #1EAEDB !important;
             color: white !important;
             border: none !important;
             padding: 0.2rem 0.6rem !important;
             border-radius: 10px !important;
             font-weight: 600 !important;
             font-size: 0.6rem !important;
           }
           
           .pdf-recommendation.green .pdf-badge {
             background: #22c55e !important;
           }
           
           .pdf-recommendation.orange .pdf-badge {
             background: #f97316 !important;
           }
           
           .pdf-recommendation.red .pdf-badge {
             background: #ef4444 !important;
           }
           
           /* Section titles */
           .pdf-section-title {
             font-size: 0.9rem !important;
             font-weight: 700 !important;
             color: #1e293b !important;
             margin: 0 0 0.75rem 0 !important;
             text-align: center !important;
             border-bottom: 1px solid #e2e8f0 !important;
             padding-bottom: 0.4rem !important;
           }
           
           /* Score cards */
           .pdf-scores-grid {
             display: grid !important;
             grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
             gap: 0.75rem !important;
             margin-bottom: 1rem !important;
           }
           
           .pdf-score-card {
             background: white !important;
             border: 1px solid #e2e8f0 !important;
             border-radius: 6px !important;
             padding: 0.75rem !important;
             box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
           }
           
           .pdf-score-header {
             display: flex !important;
             align-items: center !important;
             gap: 0.4rem !important;
             margin-bottom: 0.5rem !important;
             color: #64748b !important;
           }
           
           .pdf-score-header h4 {
             font-size: 0.8rem !important;
             font-weight: 600 !important;
             color: #1e293b !important;
             margin: 0 !important;
           }
           
           .pdf-score-content {
             text-align: center !important;
           }
           
           .pdf-score-value {
             font-size: 1.4rem !important;
             font-weight: 800 !important;
             color: #1EAEDB !important;
             margin-bottom: 0.2rem !important;
           }
           
           .pdf-score-progress {
             background: #e2e8f0 !important;
             border-radius: 4px !important;
             height: 4px !important;
             margin: 0.2rem 0 !important;
             overflow: hidden !important;
           }
           
           .pdf-progress-fill {
             background: linear-gradient(90deg, #1EAEDB 0%, #33C3F0 100%) !important;
             height: 100% !important;
             border-radius: 4px !important;
           }
           
           .pdf-score-badge {
             background: #1EAEDB !important;
             color: white !important;
             border: none !important;
             padding: 0.15rem 0.4rem !important;
             border-radius: 6px !important;
             font-size: 0.5rem !important;
             font-weight: 600 !important;
             margin-top: 0.2rem !important;
           }
           
           .pdf-score-badge.excellent {
             background: #22c55e !important;
           }
           
           .pdf-score-badge.good {
             background: #f59e0b !important;
           }
           
           .pdf-score-badge.needs-work {
             background: #ef4444 !important;
           }
           
           /* Career cards */
           .pdf-career-grid {
             display: grid !important;
             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
             gap: 1rem !important;
             margin-bottom: 1rem !important;
           }
           
           .pdf-career-card {
             background: white !important;
             border: 1px solid #e2e8f0 !important;
             border-radius: 8px !important;
             padding: 1rem !important;
             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
           }
           
           .pdf-career-title {
             font-size: 0.9rem !important;
             font-weight: 600 !important;
             color: #1e293b !important;
             margin: 0 0 0.5rem 0 !important;
           }
           
           .pdf-career-description {
             font-size: 0.7rem !important;
             color: #64748b !important;
             margin: 0 0 0.75rem 0 !important;
             line-height: 1.4 !important;
           }
           
           .pdf-career-footer {
             display: flex !important;
             justify-content: space-between !important;
             align-items: center !important;
           }
           
           .pdf-career-badge {
             background: #1EAEDB !important;
             color: white !important;
             border: none !important;
             padding: 0.1rem 0.4rem !important;
             border-radius: 4px !important;
             font-size: 0.5rem !important;
             font-weight: 600 !important;
           }
           
           .pdf-career-match {
             font-size: 0.6rem !important;
             color: #64748b !important;
             font-weight: 500 !important;
           }
           
           /* Skills section */
           .pdf-skills-content {
             display: grid !important;
             grid-template-columns: 1fr 1fr !important;
             gap: 1.5rem !important;
             margin-bottom: 1rem !important;
           }
           
           .pdf-skills-strengths,
           .pdf-skills-gaps {
             background: white !important;
             border: 1px solid #e2e8f0 !important;
             border-radius: 8px !important;
             padding: 1rem !important;
           }
           
           .pdf-skills-subtitle {
             display: flex !important;
             align-items: center !important;
             gap: 0.4rem !important;
             font-size: 0.8rem !important;
             font-weight: 600 !important;
             color: #1e293b !important;
             margin: 0 0 0.75rem 0 !important;
           }
           
           .pdf-skills-list {
             list-style: none !important;
             padding: 0 !important;
             margin: 0 !important;
           }
           
           .pdf-skill-item {
             font-size: 0.7rem !important;
             color: #64748b !important;
             margin-bottom: 0.4rem !important;
             padding: 0.3rem 0.5rem !important;
             border-radius: 4px !important;
             background: #f8fafc !important;
           }
           
           .pdf-skill-item.strength {
             background: #f0fdf4 !important;
             color: #166534 !important;
           }
           
           .pdf-skill-item.gap {
             background: #fef2f2 !important;
             color: #991b1b !important;
           }
           
           /* Next steps */
           .pdf-next-steps-list {
             display: grid !important;
             grid-template-columns: 1fr 1fr !important;
             gap: 0.5rem !important;
             margin-bottom: 1rem !important;
             page-break-inside: avoid !important;
           }
           
           .pdf-next-step-item {
             display: flex !important;
             align-items: flex-start !important;
             gap: 0.5rem !important;
             background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
             border: 2px solid #e2e8f0 !important;
             border-radius: 8px !important;
             padding: 0.75rem !important;
             page-break-inside: avoid !important;
           }
           
           .pdf-step-number {
             background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
             color: white !important;
             border-radius: 50% !important;
             width: 20px !important;
             height: 20px !important;
             display: flex !important;
             align-items: center !important;
             justify-content: center !important;
             font-size: 0.6rem !important;
             font-weight: 800 !important;
             flex-shrink: 0 !important;
             box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3) !important;
           }
           
           .pdf-step-text {
             font-size: 0.8rem !important;
             color: #1e293b !important;
             line-height: 1.3 !important;
             font-weight: 500 !important;
           }
           
           /* Footer */
           .pdf-footer {
             background: #f8fafc !important;
             border-top: 2px solid #e2e8f0 !important;
             padding: 1.5rem !important;
             margin-top: 2rem !important;
           }
           
           .pdf-footer-content {
             text-align: center !important;
           }
           
           .pdf-footer-brand {
             display: flex !important;
             align-items: center !important;
             justify-content: center !important;
             gap: 0.5rem !important;
             font-size: 1rem !important;
             font-weight: 700 !important;
             color: #1e293b !important;
             margin-bottom: 0.75rem !important;
           }
           
           .pdf-footer-description {
             font-size: 0.7rem !important;
             color: #64748b !important;
             line-height: 1.6 !important;
             margin-bottom: 1.5rem !important;
           }
           
           .pdf-footer-contact {
             display: flex !important;
             justify-content: center !important;
             gap: 2rem !important;
             flex-wrap: wrap !important;
           }
           
           .pdf-footer-contact-item {
             display: flex !important;
             align-items: center !important;
             gap: 0.5rem !important;
             font-size: 0.8rem !important;
             color: #64748b !important;
             font-weight: 500 !important;
           }
           
           /* Hide interactive elements */
           button, .btn, .button, .interactive-element {
             display: none !important;
           }
         </style>
       </head>
       <body>
         ${element.outerHTML}
       </body>
     </html>
   `;

   printWindow.document.write(printContent);
   printWindow.document.close();

   // Wait for content to load then print
   printWindow.onload = () => {
     // Add a longer delay to ensure all styles and content are properly rendered
     setTimeout(() => {
       // Force a reflow to ensure content is visible
       printWindow.document.body.offsetHeight;
       printWindow.print();
       printWindow.close();
     }, 1000);
   };
 }

 /**
  * Print element for mobile devices - uses same layout as desktop
  */
 static printElementMobile(element: HTMLElement): void {
   // Create a new window for mobile printing (same as desktop approach)
   const printWindow = window.open('', '_blank', 'width=800,height=600');
   if (!printWindow) {
     // Fallback: show in current window with better mobile handling
     this.printElementMobileFallback(element);
     return;
   }

   // Use the exact same print content as desktop
   const printContent = `
     <!DOCTYPE html>
     <html>
       <head>
         <title>Assessment Results - Print</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <style>
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
             font-size: 12pt;
             line-height: 1.5;
             margin: 0;
             padding: 0;
           }
           
           /* Import the PDF layout styles */
           .pdf-layout-container {
             width: 100% !important;
             max-width: none !important;
             margin: 0 !important;
             padding: 0 !important;
             background: white !important;
             color: #1e293b !important;
             font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
             line-height: 1.5 !important;
             font-size: 12pt !important;
             display: block !important;
             visibility: visible !important;
             opacity: 1 !important;
             position: static !important;
             left: auto !important;
             top: auto !important;
             z-index: auto !important;
           }
           
           /* Ensure all PDF layout elements are visible */
           .pdf-layout-container * {
             visibility: visible !important;
             opacity: 1 !important;
             display: block !important;
           }
           
           /* Hide any elements that might interfere */
           .hidden, [style*="display: none"], [style*="visibility: hidden"] {
             display: block !important;
             visibility: visible !important;
             opacity: 1 !important;
           }
           
           /* Header styles */
           .pdf-header {
             background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%) !important;
             color: white !important;
             padding: 2rem 0 !important;
             margin-bottom: 2rem !important;
             text-align: center !important;
             position: relative !important;
             overflow: hidden !important;
           }
          
          .pdf-header-content {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            max-width: 700px !important;
            margin: 0 auto !important;
            padding: 0 1.5rem !important;
          }
          
          .pdf-logo-section {
            display: flex !important;
            align-items: center !important;
            gap: 0.75rem !important;
          }
          
          .pdf-logo-icon {
            background: rgba(255, 255, 255, 0.2) !important;
            border-radius: 50% !important;
            padding: 0.5rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .pdf-logo-title {
            font-size: 1.5rem !important;
            font-weight: 700 !important;
            margin: 0 !important;
            color: white !important;
          }
          
          .pdf-logo-subtitle {
            font-size: 0.9rem !important;
            opacity: 0.9 !important;
            margin: 0 !important;
            color: white !important;
          }
          
          .pdf-header-info {
            text-align: right !important;
          }
          
          .pdf-date {
            font-size: 0.8rem !important;
            opacity: 0.8 !important;
            margin: 0 0 0.25rem 0 !important;
          }
          
          .pdf-assessment-name {
            font-size: 1rem !important;
            font-weight: 600 !important;
            margin: 0 !important;
          }
          
          /* Title section */
          .pdf-title-section {
            margin-bottom: 0.75rem !important;
            padding: 0.5rem 1rem !important;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
            border: 2px solid #e2e8f0 !important;
            border-radius: 12px !important;
            position: relative !important;
            overflow: hidden !important;
            min-height: 80px !important;
            display: flex !important;
            align-items: center !important;
          }
          
          .pdf-title-section::before {
            content: '' !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            height: 4px !important;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4) !important;
          }
          
          /* Header Content Layout */
          .pdf-header-content {
            display: flex !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            width: 100% !important;
            max-width: 100% !important;
            gap: 2rem !important;
            padding: 0.25rem 0 !important;
          }
          
          .pdf-logo-left {
            flex-shrink: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            justify-content: flex-start !important;
            width: auto !important;
            min-width: 120px !important;
          }
          
          .pdf-header-text {
            flex: 1 !important;
            text-align: right !important;
            max-width: calc(100% - 8rem) !important;
            padding-left: 0 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-end !important;
            justify-content: flex-start !important;
          }
          
          .pdf-date-info {
            text-align: right !important;
            margin-top: 0.2rem !important;
            align-self: flex-end !important;
          }
          
          .pdf-main-title {
            font-size: 1.6rem !important;
            font-weight: 800 !important;
            color: #1e293b !important;
            margin: 0 0 0.15rem 0 !important;
            background: linear-gradient(135deg, #1e293b, #475569) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            text-align: right !important;
          }
          
          .pdf-assessment-title {
            font-size: 1.1rem !important;
            color: #64748b !important;
            font-weight: 600 !important;
            margin: 0 0 0.2rem 0 !important;
            text-align: right !important;
          }
          
          .pdf-assessment-description {
            font-size: 0.9rem !important;
            color: #64748b !important;
            margin: 0 0 0.15rem 0 !important;
            line-height: 1.2 !important;
            text-align: right !important;
            max-width: 400px !important;
          }
          
                      .pdf-date {
             font-size: 0.85rem !important;
             color: #64748b !important;
             margin: 0 !important;
             font-weight: 500 !important;
             text-align: right !important;
             font-style: italic !important;
           }
          
          /* Recommendation section */
          .pdf-recommendation {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%) !important;
            border: 3px solid #1e40af !important;
            border-radius: 16px !important;
            padding: 2rem !important;
            margin-bottom: 2rem !important;
            text-align: center !important;
            position: relative !important;
            overflow: hidden !important;
            box-shadow: 0 4px 16px rgba(30, 64, 175, 0.1) !important;
          }
          
          .pdf-recommendation.green {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%) !important;
            border-color: #22c55e !important;
            box-shadow: 0 4px 16px rgba(34, 197, 94, 0.1) !important;
          }
          
          .pdf-recommendation.orange {
            background: linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%) !important;
            border-color: #f97316 !important;
            box-shadow: 0 4px 16px rgba(249, 115, 22, 0.1) !important;
          }
          
          .pdf-recommendation.red {
            background: linear-gradient(135deg, #fef2f2 0%, #fecaca 100%) !important;
            border-color: #ef4444 !important;
            box-shadow: 0 4px 16px rgba(239, 68, 68, 0.1) !important;
          }
          
          .pdf-recommendation-content {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          
          .pdf-recommendation-icon {
            background: rgba(30, 174, 219, 0.1) !important;
            border-radius: 50% !important;
            padding: 0.4rem !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .pdf-recommendation.green .pdf-recommendation-icon {
            background: rgba(34, 197, 94, 0.1) !important;
          }
          
          .pdf-recommendation.orange .pdf-recommendation-icon {
            background: rgba(249, 115, 22, 0.1) !important;
          }
          
          .pdf-recommendation.red .pdf-recommendation-icon {
            background: rgba(239, 68, 68, 0.1) !important;
          }
          
          .pdf-recommendation-text {
            flex: 1 !important;
            text-align: left !important;
          }
          
          .pdf-recommendation-title {
            font-size: 1rem !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            margin: 0 0 0.2rem 0 !important;
          }
          
          .pdf-recommendation-description {
            font-size: 0.8rem !important;
            color: #64748b !important;
            margin: 0 !important;
          }
          
          .pdf-recommendation-score {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          .pdf-score-value {
            font-size: 1.2rem !important;
            font-weight: 800 !important;
            color: #1EAEDB !important;
          }
          
          .pdf-score-label {
            font-size: 0.6rem !important;
            color: #64748b !important;
            font-weight: 500 !important;
          }
          
          .pdf-recommendation-badge {
            text-align: center !important;
          }
          
          .pdf-badge {
            background: #1EAEDB !important;
            color: white !important;
            border: none !important;
            padding: 0.2rem 0.6rem !important;
            border-radius: 10px !important;
            font-weight: 600 !important;
            font-size: 0.6rem !important;
          }
          
          .pdf-recommendation.green .pdf-badge {
            background: #22c55e !important;
          }
          
          .pdf-recommendation.orange .pdf-badge {
            background: #f97316 !important;
          }
          
          .pdf-recommendation.red .pdf-badge {
            background: #ef4444 !important;
          }
          
          /* Section titles */
          .pdf-section-title {
            font-size: 0.9rem !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            margin: 0 0 0.75rem 0 !important;
            text-align: center !important;
            border-bottom: 1px solid #e2e8f0 !important;
            padding-bottom: 0.4rem !important;
          }
          
          /* Score cards */
          .pdf-scores-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
            gap: 0.75rem !important;
            margin-bottom: 1rem !important;
          }
          
          .pdf-score-card {
            background: white !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 6px !important;
            padding: 0.75rem !important;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) !important;
          }
          
          .pdf-score-header {
            display: flex !important;
            align-items: center !important;
            gap: 0.4rem !important;
            margin-bottom: 0.5rem !important;
            color: #64748b !important;
          }
          
          .pdf-score-header h4 {
            font-size: 0.8rem !important;
            font-weight: 600 !important;
            color: #1e293b !important;
            margin: 0 !important;
          }
          
          .pdf-score-content {
            text-align: center !important;
          }
          
          .pdf-score-value {
            font-size: 1.4rem !important;
            font-weight: 800 !important;
            color: #1EAEDB !important;
            margin-bottom: 0.2rem !important;
          }
          
          .pdf-score-progress {
            background: #e2e8f0 !important;
            border-radius: 4px !important;
            height: 4px !important;
            margin: 0.2rem 0 !important;
            overflow: hidden !important;
          }
          
          .pdf-progress-fill {
            background: linear-gradient(90deg, #1EAEDB 0%, #33C3F0 100%) !important;
            height: 100% !important;
            border-radius: 4px !important;
          }
          
          .pdf-score-badge {
            background: #1EAEDB !important;
            color: white !important;
            border: none !important;
            padding: 0.15rem 0.4rem !important;
            border-radius: 6px !important;
            font-size: 0.5rem !important;
            font-weight: 600 !important;
            margin-top: 0.2rem !important;
          }
          
          .pdf-score-badge.excellent {
            background: #22c55e !important;
          }
          
          .pdf-score-badge.good {
            background: #f59e0b !important;
          }
          
          .pdf-score-badge.needs-work {
            background: #ef4444 !important;
          }
          
          /* Career cards */
          .pdf-career-grid {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .pdf-career-card {
            background: white !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 8px !important;
            padding: 1rem !important;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
          }
          
          .pdf-career-title {
            font-size: 0.9rem !important;
            font-weight: 600 !important;
            color: #1e293b !important;
            margin: 0 0 0.5rem 0 !important;
          }
          
          .pdf-career-description {
            font-size: 0.7rem !important;
            color: #64748b !important;
            margin: 0 0 0.75rem 0 !important;
            line-height: 1.4 !important;
          }
          
          .pdf-career-footer {
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          
          .pdf-career-badge {
            background: #1EAEDB !important;
            color: white !important;
            border: none !important;
            padding: 0.1rem 0.4rem !important;
            border-radius: 4px !important;
            font-size: 0.5rem !important;
            font-weight: 600 !important;
          }
          
          .pdf-career-match {
            font-size: 0.6rem !important;
            color: #64748b !important;
            font-weight: 500 !important;
          }
          
          /* Skills section */
          .pdf-skills-content {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .pdf-skills-strengths,
          .pdf-skills-gaps {
            background: white !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 8px !important;
            padding: 1rem !important;
          }
          
          .pdf-skills-subtitle {
            display: flex !important;
            align-items: center !important;
            gap: 0.4rem !important;
            font-size: 0.8rem !important;
            font-weight: 600 !important;
            color: #1e293b !important;
            margin: 0 0 0.75rem 0 !important;
          }
          
          .pdf-skills-list {
            list-style: none !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          .pdf-skill-item {
            font-size: 0.7rem !important;
            color: #64748b !important;
            margin-bottom: 0.4rem !important;
            padding: 0.3rem 0.5rem !important;
            border-radius: 4px !important;
            background: #f8fafc !important;
          }
          
          .pdf-skill-item.strength {
            background: #f0fdf4 !important;
            color: #166534 !important;
          }
          
          .pdf-skill-item.gap {
            background: #fef2f2 !important;
            color: #991b1b !important;
          }
          
          /* Next steps */
          .pdf-next-steps-list {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
            margin-bottom: 1rem !important;
            page-break-inside: avoid !important;
          }
          
          .pdf-next-step-item {
            display: flex !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%) !important;
            border: 2px solid #e2e8f0 !important;
            border-radius: 8px !important;
            padding: 0.75rem !important;
            page-break-inside: avoid !important;
          }
          
          .pdf-step-number {
            background: linear-gradient(135deg, #3b82f6, #8b5cf6) !important;
            color: white !important;
            border-radius: 50% !important;
            width: 20px !important;
            height: 20px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            font-size: 0.6rem !important;
            font-weight: 800 !important;
            flex-shrink: 0 !important;
            box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3) !important;
          }
          
          .pdf-step-text {
            font-size: 0.8rem !important;
            color: #1e293b !important;
            line-height: 1.3 !important;
            font-weight: 500 !important;
          }
          
          /* Footer */
          .pdf-footer {
            background: #f8fafc !important;
            border-top: 2px solid #e2e8f0 !important;
            padding: 1.5rem !important;
            margin-top: 2rem !important;
          }
          
          .pdf-footer-content {
            text-align: center !important;
          }
          
          .pdf-footer-brand {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.5rem !important;
            font-size: 1rem !important;
            font-weight: 700 !important;
            color: #1e293b !important;
            margin-bottom: 0.75rem !important;
          }
          
          .pdf-footer-description {
            font-size: 0.7rem !important;
            color: #64748b !important;
            line-height: 1.6 !important;
            margin-bottom: 1.5rem !important;
          }
          
          .pdf-footer-contact {
            display: flex !important;
            justify-content: center !important;
            gap: 2rem !important;
            flex-wrap: wrap !important;
          }
          
          .pdf-footer-contact-item {
            display: flex !important;
            align-items: center !important;
            gap: 0.5rem !important;
            font-size: 0.8rem !important;
            color: #64748b !important;
            font-weight: 500 !important;
          }
          
          /* Hide interactive elements */
          button, .btn, .button, .interactive-element {
            display: none !important;
          }
          
          /* Mobile-specific adjustments */
          @media screen and (max-width: 768px) {
            body {
              font-size: 10pt !important;
            }
            
            .pdf-scores-grid {
              grid-template-columns: 1fr !important;
            }
            
            .pdf-career-grid {
              grid-template-columns: 1fr !important;
            }
            
            .pdf-skills-content {
              grid-template-columns: 1fr !important;
            }
            
            .pdf-next-steps-list {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `;

  printWindow.document.write(printContent);
  printWindow.document.close();

  // Wait for content to load then print
  printWindow.onload = () => {
    // Add a longer delay to ensure all styles and content are properly rendered
    setTimeout(() => {
      // Force a reflow to ensure content is visible
      printWindow.document.body.offsetHeight;
      printWindow.print();
      printWindow.close();
    }, 1000);
  };
 }

 /**
  * Fallback method for mobile devices when popup is blocked
  */
 static printElementMobileFallback(element: HTMLElement): void {
   // Create a temporary container for mobile printing
   const tempContainer = document.createElement('div');
   tempContainer.className = 'pdf-temp-container';
   tempContainer.style.cssText = `
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: white;
     z-index: 9999;
     overflow-y: auto;
     padding: 20px;
     box-sizing: border-box;
   `;

   // Clone the element and add mobile-specific styles
   const clonedElement = element.cloneNode(true) as HTMLElement;
   clonedElement.style.cssText = `
     width: 100% !important;
     max-width: none !important;
     margin: 0 !important;
     padding: 0 !important;
     background: white !important;
     color: #1e293b !important;
     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
     font-size: 14px !important;
     line-height: 1.5 !important;
   `;

   // Add mobile print styles
   const mobileStyles = document.createElement('style');
   mobileStyles.textContent = `
     @media print {
       .pdf-temp-container {
         position: static !important;
         width: 100% !important;
         height: auto !important;
         padding: 0 !important;
         margin: 0 !important;
         background: white !important;
       }
       
       .pdf-temp-container * {
         -webkit-print-color-adjust: exact !important;
         color-adjust: exact !important;
         print-color-adjust: exact !important;
       }
       
       /* Hide interactive elements */
       button, .btn, .button, .interactive-element {
         display: none !important;
       }
     }
     
     /* Mobile-specific styles */
     .pdf-temp-container {
       font-size: 14px !important;
       line-height: 1.5 !important;
     }
     
     .pdf-temp-container .pdf-layout-container {
       width: 100% !important;
       max-width: none !important;
       margin: 0 !important;
       padding: 0 !important;
     }
     
     .pdf-temp-container .pdf-scores-grid {
       grid-template-columns: 1fr !important;
       gap: 1rem !important;
     }
     
     .pdf-temp-container .pdf-career-grid {
       grid-template-columns: 1fr !important;
       gap: 1rem !important;
     }
     
     .pdf-temp-container .pdf-skills-content {
       grid-template-columns: 1fr !important;
       gap: 1rem !important;
     }
     
     .pdf-temp-container .pdf-next-steps-list {
       grid-template-columns: 1fr !important;
       gap: 0.5rem !important;
     }
   `;

   tempContainer.appendChild(mobileStyles);
   tempContainer.appendChild(clonedElement);

   // Add close button for mobile
   const closeButton = document.createElement('button');
   closeButton.innerHTML = '✕ Close';
   closeButton.style.cssText = `
     position: fixed;
     top: 10px;
     right: 10px;
     background: #ef4444;
     color: white;
     border: none;
     border-radius: 50%;
     width: 40px;
     height: 40px;
     font-size: 18px;
     cursor: pointer;
     z-index: 10000;
     display: flex;
     align-items: center;
     justify-content: center;
   `;

   closeButton.onclick = () => {
     document.body.removeChild(tempContainer);
   };

   // Add print button for mobile
   const printButton = document.createElement('button');
   printButton.innerHTML = '🖨️ Print';
   printButton.style.cssText = `
     position: fixed;
     top: 10px;
     left: 10px;
     background: #3b82f6;
     color: white;
     border: none;
     border-radius: 8px;
     padding: 10px 20px;
     font-size: 14px;
     font-weight: 600;
     cursor: pointer;
     z-index: 10000;
     display: flex;
     align-items: center;
     gap: 8px;
   `;

   printButton.onclick = () => {
     // Hide the buttons before printing
     closeButton.style.display = 'none';
     printButton.style.display = 'none';
     
     // Print the content
     window.print();
     
     // Show buttons again after printing
     setTimeout(() => {
       closeButton.style.display = 'flex';
       printButton.style.display = 'flex';
     }, 1000);
   };

   tempContainer.appendChild(closeButton);
   tempContainer.appendChild(printButton);

   // Add to document
   document.body.appendChild(tempContainer);

   // Scroll to top
   tempContainer.scrollTop = 0;
 }

 /**
  * Generate a shareable link for mobile devices
  */
 static generateMobileShareLink(element: HTMLElement): string {
   // Create a data URL with the PDF content
   const printContent = `
     <!DOCTYPE html>
     <html>
       <head>
         <title>Assessment Results - Share</title>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <style>
           body {
             background: white !important;
             color: #1e293b !important;
             font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
             font-size: 12pt;
             line-height: 1.5;
             margin: 0;
             padding: 20px;
           }
           
           .pdf-layout-container {
             width: 100% !important;
             max-width: none !important;
             margin: 0 !important;
             padding: 0 !important;
             background: white !important;
             color: #1e293b !important;
           }
           
           /* Mobile-friendly styles */
           .pdf-scores-grid {
             grid-template-columns: 1fr !important;
             gap: 1rem !important;
           }
           
           .pdf-career-grid {
             grid-template-columns: 1fr !important;
             gap: 1rem !important;
           }
           
           .pdf-skills-content {
             grid-template-columns: 1fr !important;
             gap: 1rem !important;
           }
           
           .pdf-next-steps-list {
             grid-template-columns: 1fr !important;
             gap: 0.5rem !important;
           }
         </style>
       </head>
       <body>
         ${element.outerHTML}
       </body>
     </html>
   `;
   
   const blob = new Blob([printContent], { type: 'text/html' });
   return URL.createObjectURL(blob);
 }

 /**
  * Clean up temporary elements
  */
 static cleanup(): void {
   const tempElements = document.querySelectorAll('.pdf-temp-container');
   tempElements.forEach(element => {
     if (element.parentNode) {
       element.parentNode.removeChild(element);
     }
   });
 }
}

/**
 * Hook for print functionality
 */
export const usePDFGenerator = () => {
 const printElement = (element: HTMLElement): void => {
   PDFGenerator.printElement(element);
 };

 return {
   printElement,
   cleanup: PDFGenerator.cleanup
 };
};
