import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdSenseComponent from '@/components/AdSenseComponent';

const DataProtection = () => {
  const currentYear = new Date().getFullYear();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AdSenseComponent />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-heading mb-4">
              Data Protection Policy for factorbeam.com
            </h1>
            <p className="text-lg text-foreground-soft">
              Effective Date: August 31, 2025 | Last Updated: August 31, 2025
            </p>
          </div>

          {/* Data Protection Policy Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Preamble */}
            <section className="mb-12 bg-blue-50 p-8 rounded-lg border-l-4 border-blue-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">Preamble: Our Commitment to Your Privacy & Educational Mission</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Introduction</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Welcome to factorbeam.com (hereinafter "Factorbeam," "the Company," "we," "us," or "our"). Our platform is designed to provide users with a suite of assessments and tools for the purpose of gaining clarity about themselves and their potential career paths. We are dedicated to empowering your journey of self-discovery.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">Our Core Commitment</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The foundation of our service is the trust you place in us when you share your information. We are fundamentally committed to protecting your privacy and handling your personal data with the utmost care, transparency, and respect. This Data Protection Policy ("Policy") outlines our practices for collecting, processing, using, storing, and disclosing your personal data. Our approach is designed to comply with the highest international standards, recognizing that the right to data protection is a fundamental right for all individuals, regardless of their nationality or residence.
              </p>

              <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 mt-6">
                <h4 className="text-lg font-semibold text-heading mb-4">CRITICAL DISCLAIMER: For Educational and Informational Purposes Only</h4>
                <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                  <li>All assessments, tests, reports, career suggestions, and any other content or advice provided on or through the factorbeam.com website and its services are intended for educational and informational purposes only.</li>
                  <li>The services provided by Factorbeam do not, under any circumstances, constitute professional, psychological, medical, therapeutic, financial, or legal advice. The results of our assessments are generated through automated systems and are designed to be a starting point for personal and career exploration. They are not a substitute for professional guidance from a qualified psychologist, career counselor, financial advisor, or other relevant expert.</li>
                  <li>You should not rely on the information provided by our services to make significant life, career, financial, or health decisions without first consulting with a qualified professional. Factorbeam expressly disclaims any and all liability for any actions you take or decisions you make based on your use of our services. Your use of this website and its services is at your own risk.</li>
                </ul>
              </div>
            </section>

            {/* Section 1: Guiding Principles */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 1: The Guiding Principles of Our Data Protection Policy</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Introduction to Principles</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Our data handling practices are governed by a set of core principles derived from leading global data protection frameworks, including the European Union's General Data Protection Regulation (GDPR), which sets a global benchmark for privacy. These principles are the bedrock of our commitment to you and ensure that your data is always processed ethically and lawfully.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.1 Lawfulness, Fairness, and Transparency</h4>
                  <p className="text-foreground-soft text-justify">
                    We will only process your personal data when we have a legitimate and lawful reason to do so. The primary legal basis for processing data related to your assessments will be your explicit and informed consent. Our processing will always be fair, meaning we will not handle your data in ways you would not reasonably expect or that could have unjustified adverse effects on you. We are committed to being fully transparent about our data practices, which is the purpose of this comprehensive Policy.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.2 Purpose Limitation</h4>
                  <p className="text-foreground-soft text-justify">
                    We will only collect your personal data for specified, explicit, and legitimate purposes that are clearly communicated to you at the time of collection. We will not process your data for any new purpose that is incompatible with the original purpose unless we obtain your fresh, specific consent for that new use.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.3 Data Minimization</h4>
                  <p className="text-foreground-soft text-justify">
                    We are committed to collecting and processing only the minimum amount of personal data that is absolutely necessary to achieve the stated purpose. We will only ask for data that is adequate, relevant, and limited to what is required to provide you with our assessment services and manage your account.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.4 Accuracy</h4>
                  <p className="text-foreground-soft text-justify">
                    We will take every reasonable step to ensure that the personal data we hold is accurate and, where necessary, kept up to date. We recognize that the value of our assessments depends on the accuracy of the input data. We provide you with the means to review and correct your personal information, and we will rectify or erase inaccurate data without undue delay upon your request.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.5 Storage Limitation</h4>
                  <p className="text-foreground-soft text-justify">
                    We will not retain your personal data in a form that permits your identification for longer than is necessary for the purposes for which it was collected. We have established clear data retention periods, after which your personal data will be securely deleted or anonymized.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.6 Integrity and Confidentiality</h4>
                  <p className="text-foreground-soft text-justify">
                    We take the security of your personal data very seriously. We will process your data in a manner that ensures its appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage. We achieve this by using appropriate and robust technical and organizational security measures.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">1.7 Accountability</h4>
                  <p className="text-foreground-soft text-justify">
                    As the entity responsible for your data (referred to as the "Data Controller" or "Data Fiduciary"), Factorbeam accepts full responsibility for complying with these principles. We are not only committed to adhering to them but also to being able to demonstrate our compliance to you and to regulatory authorities.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Personal Data We Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 2: The Personal Data We Process</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Introduction</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                To provide our services, we must collect and process certain types of information. This section provides a comprehensive and transparent overview of the categories of personal data we handle. We have categorized this data based on how it is obtained: directly from you, generated by our systems, or collected automatically.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">2.1 Information You Directly and Voluntarily Provide</h4>
                  <p className="text-foreground-soft mb-2 text-justify">This is information you knowingly share with us when you use our services.</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>Account and Profile Data:</strong> When you register for an account, we collect basic information necessary for account creation and management. This includes your name, email address, and a securely hashed password.</li>
                    <li><strong>Assessment Response Data:</strong> This is the core data you provide when you interact with our assessments. It consists of your answers, selections, and responses to the questions and prompts within our various self-clarity, personality, and career assessments.</li>
                    <li><strong>Communications Data:</strong> If you contact us for customer support, provide feedback, or otherwise communicate with us, we will collect the information contained in those communications.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">2.2 Information We Generate or Infer (Derived Data)</h4>
                  <p className="text-foreground-soft mb-2 text-justify">This is new information that our systems create based on the data you provide.</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>Assessment Results and Profiles:</strong> Based on your Assessment Response Data, our proprietary algorithms generate personalized results. This derived data includes personality type classifications, career compatibility scores, analyses of your strengths and weaknesses, and other detailed character or work-style profiles.</li>
                    <li><strong>Inferred Sensitive Personal Information:</strong> This is a critical category of data that requires special attention. While we do not directly ask you for information concerning your racial or ethnic origin, political opinions, religious or philosophical beliefs, health, or sexual orientation, the nature of in-depth personality and psychological assessments means that your Assessment Response Data and the resulting Assessment Results and Profiles could be used to infer such information.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">2.3 Information We Collect Automatically (Technical Data)</h4>
                  <p className="text-foreground-soft mb-2 text-justify">This is technical information collected automatically when you access our website.</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>Usage and Log Data:</strong> To ensure the security, stability, and performance of our platform, our servers automatically log certain information. This includes your Internet Protocol (IP) address, browser type and settings, operating system, referral URLs, the pages you visit on our site, and the dates and times of your activity.</li>
                    <li><strong>Cookie and Tracking Data:</strong> We use cookies and similar technologies to operate and personalize our website. For example, cookies help us remember that you are logged in.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3: Lawful Basis and Purpose */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 3: Lawful Basis and Purpose of Processing</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Introduction</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                In this section, we explain why we process the different categories of your personal data. In accordance with global data protection laws, every processing activity must be justified by a valid "lawful basis". For Factorbeam, the primary bases are the necessity of processing for the performance of our contract with you (our Terms of Service), your explicit consent, and our legitimate interests in operating and improving our service.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-heading mb-4">Table: Summary of Data Processing Activities</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Data Category</th>
                        <th className="border border-gray-300 p-3 text-left">Purpose of Processing</th>
                        <th className="border border-gray-300 p-3 text-left">Lawful Basis</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Account and Profile Data</td>
                        <td className="border border-gray-300 p-3">To create and manage your user account, authenticate your identity for secure access, and send essential service-related communications.</td>
                        <td className="border border-gray-300 p-3">Performance of a Contract (our Terms of Service with you).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Assessment Response Data</td>
                        <td className="border border-gray-300 p-3">To receive and analyze your inputs as the raw material for generating your personalized assessment reports.</td>
                        <td className="border border-gray-300 p-3">Explicit Consent. You actively provide this data for this specific purpose.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Assessment Results and Profiles</td>
                        <td className="border border-gray-300 p-3">To provide you with the core service of the platform: delivering personalized insights, detailed reports, and career suggestions.</td>
                        <td className="border border-gray-300 p-3">Explicit Consent. The generation and provision of these results is the central service for which you grant consent.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Communications Data</td>
                        <td className="border border-gray-300 p-3">To respond to your inquiries, provide you with customer support, and resolve any issues you may encounter.</td>
                        <td className="border border-gray-300 p-3">Legitimate Interest (Our interest in providing high-quality, responsive customer service).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Usage and Log Data</td>
                        <td className="border border-gray-300 p-3">To monitor the security and technical performance of our platform, prevent fraud and abuse, diagnose technical problems, and analyze usage trends.</td>
                        <td className="border border-gray-300 p-3">Legitimate Interest (Our interest in maintaining a secure, reliable, and continuously improving service).</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Aggregated & Anonymized Data</td>
                        <td className="border border-gray-300 p-3">To conduct statistical research on personality traits and career trends, to improve the accuracy and efficacy of our assessment models.</td>
                        <td className="border border-gray-300 p-3">Legitimate Interest (Our interest in scientific and business development).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Section 4: Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 4: Your Global Data Protection Rights</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Introduction</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We believe in empowering you with control over your personal data. This section outlines the rights you have regarding your information and explains how you can exercise them. We are committed to providing a high standard of data protection to all our users, regardless of their location.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">4.1 How to Exercise Your Rights</h4>
                  <p className="text-foreground-soft mb-2 text-justify">To exercise any of the rights described in this section, please submit a verifiable request to us via email at privacy@factorbeam.com.</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li>For your protection, we must verify your identity before we can act on your request.</li>
                    <li>We will respond to your request without undue delay, and in any case, within one month of receipt.</li>
                    <li>This period may be extended by two further months where necessary, taking into account the complexity and number of requests.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">4.2 Rights for Individuals in the European Economic Area (EEA), UK, and Switzerland (under GDPR)</h4>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>The Right to be Informed:</strong> You have the right to be provided with clear, transparent, and easily understandable information about how we use your personal data.</li>
                    <li><strong>The Right of Access:</strong> You have the right to obtain a copy of the personal data we hold about you and other supplementary information.</li>
                    <li><strong>The Right to Rectification:</strong> You are entitled to have your personal data corrected if it is inaccurate or incomplete.</li>
                    <li><strong>The Right to Erasure ('Right to be Forgotten'):</strong> This enables you to request the deletion or removal of your personal data where there is no compelling reason for us to keep using it.</li>
                    <li><strong>The Right to Restrict Processing:</strong> You have the right to 'block' or suppress further use of your personal data in certain circumstances.</li>
                    <li><strong>The Right to Data Portability:</strong> You have the right to obtain and reuse your personal data for your own purposes across different services.</li>
                    <li><strong>The Right to Object:</strong> You have the right to object to certain types of processing, including processing based on our legitimate interests and processing for direct marketing.</li>
                    <li><strong>Rights in Relation to Automated Decision Making and Profiling:</strong> You have the right not to be subject to a decision based solely on automated processing which produces legal effects concerning you or similarly significantly affects you.</li>
                    <li><strong>The Right to Lodge a Complaint:</strong> You have the right to lodge a complaint about the way we handle or process your personal data with your national data protection authority.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">4.3 Rights for Residents of California (under CCPA/CPRA)</h4>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>The Right to Know/Access:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell or share.</li>
                    <li><strong>The Right to Delete:</strong> You have the right to request the deletion of your personal information that we have collected, subject to certain exceptions.</li>
                    <li><strong>The Right to Correct:</strong> You have the right to request the correction of any inaccurate personal information that we maintain about you.</li>
                    <li><strong>The Right to Opt-Out of Sale/Sharing:</strong> Factorbeam does not "sell" your personal information for monetary consideration, nor do we "share" it for cross-context behavioral advertising.</li>
                    <li><strong>The Right to Limit Use and Disclosure of Sensitive Personal Information (SPI):</strong> You have the right to limit our use and disclosure of your SPI to that which is necessary to perform the services reasonably expected by an average consumer.</li>
                    <li><strong>The Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">4.4 Rights for Residents of India (under DPDP Act, 2023)</h4>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>The Right to Access Information:</strong> You have the right to obtain from us a summary of the personal data that is being processed, the processing activities undertaken with respect to your data, and the identities of all Data Fiduciaries and Data Processors with whom your personal data has been shared.</li>
                    <li><strong>The Right to Correction and Erasure:</strong> You have the right to request the correction of inaccurate or misleading personal data, the completion of incomplete data, the updating of your data, and the erasure of your personal data that is no longer necessary for the purpose for which it was processed.</li>
                    <li><strong>The Right of Grievance Redressal:</strong> You have the right to an easily accessible means of registering a grievance with us. We have appointed a Grievance Officer to address your concerns.</li>
                    <li><strong>The Right to Nominate:</strong> You have the right to nominate any other individual who can exercise your rights on your behalf in the event of your death or incapacity.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 5: Security, Retention, and Transfers */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 5: Data Security, Retention, and International Transfers</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-heading mb-4">5.1 Our Commitment to Data Security</h3>
                  <p className="text-foreground-soft mb-4 text-justify">
                    We have implemented and will maintain a comprehensive information security program with appropriate technical and organizational measures (TOMs) designed to protect the personal data in our custody from unauthorized access, use, alteration, or destruction.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>Encryption:</strong> We use industry-standard Transport Layer Security (TLS/SSL) to encrypt all data in transit between your browser and our servers. Personal data stored in our databases is also encrypted at rest.</li>
                    <li><strong>Access Controls:</strong> Access to personal data within our organization is strictly limited on a "need-to-know" basis. We employ role-based access controls (RBAC) and other mechanisms to ensure that only authorized personnel with a legitimate business purpose can access your information.</li>
                    <li><strong>Regular Security Audits and Assessments:</strong> We conduct regular vulnerability scanning and periodic penetration testing of our systems to identify and remediate potential security weaknesses.</li>
                    <li><strong>Secure Development Practices:</strong> Our software development lifecycle incorporates security and privacy by design principles, including code reviews and security testing before new features are deployed.</li>
                    <li><strong>Breach Notification:</strong> In the event of a personal data breach that compromises the confidentiality, integrity, or availability of your data, we will take immediate steps to contain and investigate the incident.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-heading mb-4">5.2 Our Data Retention Policy</h3>
                  <p className="text-foreground-soft mb-4 text-justify">
                    In line with the principle of storage limitation, we retain your personal data only for as long as it is necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>Account Data:</strong> We retain your account and profile data for as long as your account remains active. If you choose to delete your account, we will permanently delete this data within a commercially reasonable timeframe (e.g., 90 days), subject to any legal obligations to retain it for longer.</li>
                    <li><strong>Assessment Data:</strong> Your assessment responses and results are linked to your active account. We provide you with the functionality to delete specific assessment results from your dashboard at any time without needing to delete your entire account.</li>
                    <li><strong>Anonymized Data:</strong> We may retain and use data that has been aggregated and fully anonymized (i.e., stripped of all personal identifiers) for research, statistical, and product improvement purposes indefinitely.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-heading mb-4">5.3 International Data Transfers</h3>
                  <p className="text-foreground-soft mb-4 text-justify">
                    Factorbeam's operations are global, and our primary data processing facilities are located in the United States. This means that if you are accessing our services from outside the United States, your personal data will be transferred to, stored, and processed in the United States.
                  </p>
                  <p className="text-foreground-soft mb-4 text-justify">
                    We ensure the lawfulness of these transfers through the following mechanisms:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li><strong>For Data from the EEA, UK, and Switzerland:</strong> We rely on Standard Contractual Clauses (SCCs) as approved by the European Commission and the relevant UK and Swiss authorities.</li>
                    <li><strong>For Data from India:</strong> The DPDP Act permits transfers to countries not specifically restricted by the Central Government. We will comply with this "whitelist" approach and ensure that any transfers are conducted in accordance with the provisions of the Act.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6: Children's Data */}
            <section className="mb-12 bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 6: Information Concerning Children</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Our Policy on Children's Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                <li>The Factorbeam platform and its services are not intended for or directed at individuals under the age of 18.</li>
                <li>The legal requirements for processing the personal data of children are extremely stringent and complex across major global jurisdictions.</li>
                <li>To ensure the highest level of protection and to avoid the complexities and risks associated with processing children's data, we have established a strict policy of not knowingly collecting personal data from anyone under the age of 18.</li>
                <li>If you are a parent or guardian and you become aware that your child has provided us with personal data without your consent, please contact us immediately at privacy@factorbeam.com.</li>
                <li>If we become aware that we have inadvertently collected personal data from an individual under the age of 18, we will take immediate and decisive steps to delete that information from our servers.</li>
              </ul>
            </section>

            {/* Section 7: Third Party Disclosures */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 7: Disclosures to Third Parties</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Our Philosophy on Data Sharing</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Your trust is paramount. We do not sell, rent, or trade your personal data to third parties for their marketing purposes. This section clarifies the limited and necessary circumstances under which we may disclose your information to other entities.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">7.1 Service Providers and Processors</h4>
                  <p className="text-foreground-soft mb-2 text-justify">We engage a limited number of third-party companies and individuals to perform essential services on our behalf. These "Data Processors" are contractually bound to act only on our instructions and to protect your data. Examples include:</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li>Cloud Hosting Providers: To store our data and host our application.</li>
                    <li>Email Service Providers: To send you essential service-related communications.</li>
                    <li>Analytics Providers: To help us understand website usage and improve our services.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">7.2 Legal Requirements</h4>
                  <p className="text-foreground-soft mb-2 text-justify">We may disclose your personal data if we are required to do so by law or in the good faith belief that such action is necessary to:</p>
                  <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                    <li>Comply with a legal obligation, subpoena, court order, or other lawful request by public authorities.</li>
                    <li>Protect and defend the rights or property of Factorbeam.</li>
                    <li>Prevent or investigate possible wrongdoing in connection with the service.</li>
                    <li>Protect the personal safety of users of the service or the public.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-heading mb-2">7.3 Business Transfers</h4>
                  <p className="text-foreground-soft text-justify">
                    In the event that Factorbeam is involved in a merger, acquisition, divestiture, restructuring, or sale of all or a portion of its assets, your personal data may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership or uses of your personal data, as well as any choices you may have regarding your personal data.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8: Cookies Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 8: Cookies and Tracking Technologies Policy</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">What are Cookies?</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. They contain data related to your visit and are used by websites for a variety of purposes, from enabling essential functionality to remembering your preferences and helping to personalize your experience.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">How We Use Cookies</h3>
              <p className="text-foreground-soft mb-4 text-justify">We use cookies to provide, secure, and improve our services. We categorize our cookies as follows:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for the website to function properly. They enable core functionality such as user login, account management, and session security. These cookies do not store any personally identifiable information and do not require your consent.</li>
                <li><strong>Performance and Analytics Cookies:</strong> These cookies collect information about how you use our website, such as which pages you visit and how much time you spend on them. This data is aggregated and anonymized and helps us understand user behavior, diagnose technical issues, and improve the overall performance of our service.</li>
                <li><strong>Functional Cookies:</strong> These cookies allow the website to remember choices you make (such as your username or language preference) to provide a more enhanced and personal experience.</li>
              </ul>

              <h3 className="text-xl font-semibold text-heading mb-4">Your Choices and How to Manage Cookies</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                When you first visit our website, you will be presented with a cookie consent banner. This tool allows you to accept all cookies or to customize your preferences and consent only to specific categories of non-essential cookies. You can change your cookie settings at any time through this tool.
              </p>
              <p className="text-foreground-soft text-justify">
                Additionally, most web browsers allow you to control cookies through their settings. You can set your browser to block cookies or to alert you when cookies are being sent. Please note that if you disable or refuse cookies, some parts of our service may become inaccessible or not function properly.
              </p>
            </section>

            {/* Section 9: Policy Updates and Contact */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 9: Policy Updates and Contact Information</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">Changes to This Policy</h3>
              <p className="text-foreground-soft mb-6 text-justify">
                The digital world and its legal landscape are constantly evolving. We reserve the right to update or modify this Data Protection Policy at any time. If we make material changes to this Policy, we will notify you by updating the "Last Updated" date at the top of this page and by providing a more prominent notice, such as through an email to the address associated with your account or a notification on our website. We encourage you to review this Policy periodically to stay informed about how we are protecting your information.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">How to Contact Us</h3>
              <p className="text-foreground-soft mb-4 text-justify">If you have any questions, comments, or concerns about this Data Protection Policy, our data practices, or if you wish to exercise your rights, please do not hesitate to contact us.</p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-foreground-soft mb-2"><strong>For general privacy inquiries:</strong></p>
                <p className="text-foreground-soft mb-4">Email: info@factorbeam.com</p>
                <p className="text-foreground-soft mb-2"><strong>For grievances under the Indian DPDP Act, 2023:</strong></p>
                <p className="text-foreground-soft">Grievance Officer Email: grievance.officer@factorbeam.com</p>
              </div>
            </section>

            {/* Section 10: Glossary */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">Section 10: Glossary of Key Terms</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                To ensure this Policy is as transparent and understandable as possible, here are definitions of some key terms used throughout this document.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                <li><strong>Consent:</strong> A freely given, specific, informed, and unambiguous indication of your wishes, by which you, through a statement or a clear affirmative action, signify agreement to the processing of your personal data.</li>
                <li><strong>Data Controller / Data Fiduciary:</strong> The entity that determines the purposes and means of the processing of personal data. For the purposes of this Policy, Factorbeam is the Data Controller/Data Fiduciary.</li>
                <li><strong>Data Processor:</strong> A third-party entity that processes personal data on behalf of the Data Controller/Fiduciary.</li>
                <li><strong>Data Subject / Data Principal:</strong> The identified or identifiable natural person to whom personal data relates. In this context, you, the user, are the Data Subject/Data Principal.</li>
                <li><strong>Personal Data (or Personal Information):</strong> Any information relating to an identified or identifiable natural person. This includes obvious identifiers like your name and email address, as well as less direct identifiers like your IP address or assessment results when linked to your account.</li>
                <li><strong>Processing:</strong> Any operation or set of operations which is performed on personal data, whether or not by automated means, such as collection, recording, organization, structuring, storage, use, disclosure, or erasure.</li>
                <li><strong>Special Category Data (GDPR) / Sensitive Personal Information (SPI) (CPRA):</strong> A specific category of personal data that is considered more sensitive and is subject to stricter processing conditions. This includes data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health data, or data concerning a person's sex life or sexual orientation.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataProtection;
