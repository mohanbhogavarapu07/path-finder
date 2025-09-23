import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Privacy = () => {
  const currentYear = new Date().getFullYear();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-heading mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-foreground-soft">
              Effective Date: August 31, 2025 | Last Updated: August 31, 2025
            </p>
          </div>

          {/* Executive Summary */}
          <div className="prose prose-lg max-w-none mb-12">
            <section className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-400 mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">I. Executive Summary</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                This report provides a comprehensive, legally robust, and globally compliant framework for data privacy at factorbeam.com. The core of this framework is a custom-drafted Privacy Policy, specifically designed to address the unique business model of an online assessment and career clarity platform. This document is more than a legal template; it is a strategic tool engineered to provide the maximum possible legal protection worldwide.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                It synthesizes the most stringent requirements from influential global data protection laws, including the General Data Protection Regulation (GDPR) of the European Union, the California Consumer Privacy Act and California Privacy Rights Act (CCPA/CPRA), India's Digital Personal Data Protection Act (DPDP), Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), and Brazil's General Data Protection Law (LGPD).
              </p>
              <p className="text-foreground-soft text-justify">
                The framework is built on a multi-layered approach to legal protection. First, the Privacy Policy provides explicit transparency regarding data collection, usage, and sharing, particularly concerning sensitive personal information inherent to the assessment process. Second, a separate legal disclaimer is provided to limit liability for the educational content itself, a critical component for a website offering assessments and advice. Finally, the report includes a detailed operational guide to manage user rights requests and data breaches, acknowledging that compliance is a continuous process that requires internal policies, technical safeguards, and a commitment to ongoing diligence.
              </p>
            </section>

            {/* The Privacy Policy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-heading mb-8">II. The Privacy Policy for factorbeam.com</h2>
              
              <h3 className="text-2xl font-semibold text-heading mb-6">1. Our Commitment to Your Privacy</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                At factorbeam.com, we are deeply committed to protecting your privacy and personal information. This Privacy Policy is designed to inform you about how we collect, use, and protect your data in a transparent and legally compliant manner. By using our website and services, you acknowledge that we may collect and process your personal data as described herein.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                We serve as the Data Controller (or Data Fiduciary), which means we are the entity responsible for determining the purposes and means of processing your personal data. This policy is applicable to all users of our site, regardless of their location, and is crafted to meet or exceed the requirements of major international data protection regulations.
              </p>
              
              <h4 className="text-xl font-semibold text-heading mb-4 mt-8">Key Definitions</h4>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                <li><strong>Personal Information/Personal Data:</strong> Any information that identifies, relates to, describes, or is capable of being associated with a specific person or household. This includes, but is not limited to, names, email addresses, unique identifiers, and IP addresses.</li>
                <li><strong>Sensitive Personal Information/Sensitive Personal Data:</strong> A sub-category of personal data that requires heightened protection due to its sensitive nature. For our purposes, this includes information about your health, biometric data, race or ethnic origin, religious beliefs, political opinions, and data related to your sexual life or sexual orientation.</li>
                <li><strong>Processing:</strong> Any operation performed on personal data, whether or not by automated means, such as collection, recording, organization, storage, use, disclosure, or deletion.</li>
                <li><strong>Usage Data:</strong> Information collected automatically from your device, such as your IP address, browser type, pages visited, and time spent on a page.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">2. Data We Collect</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The nature of our services as an assessment and career clarity platform requires us to collect various types of information to provide you with meaningful results. We collect data in two primary ways: information you provide directly to us and information collected automatically through your use of the site.
              </p>
              
              <h4 className="text-xl font-semibold text-heading mb-4">Personal Information You Provide Directly:</h4>
              <p className="text-foreground-soft mb-4 text-justify">When you register for an account, fill out an assessment, complete a form, or contact us, you may provide us with the following personal information:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li>Contact details, such as your first and last name and email address.</li>
                <li>Account credentials, including a login ID and password.</li>
                <li>Self-reported demographic details, such as age, gender, and location (City, State/Province, ZIP/Postal code).</li>
                <li>Responses to surveys and quizzes.</li>
                <li>Any information you voluntarily provide in public forums or through customer support inquiries.</li>
              </ul>

              <h4 className="text-xl font-semibold text-heading mb-4">Sensitive Personal Data Collected via Assessments:</h4>
              <p className="text-foreground-soft mb-4 text-justify">Our assessments are designed to provide insights into your career and personal attributes. In the course of completing these assessments, we collect sensitive personal information, which is necessary to deliver the service you requested. This includes, but is not limited to:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li>Psychological insights and personality attributes derived from your responses to assessment questions.</li>
                <li>Information related to your professional history, employment status, education history, and career preferences.</li>
                <li>Self-disclosed health-related information, such as health conditions or medications, if relevant to a specific assessment.</li>
                <li>Information regarding your race, ethnicity, or other demographic data to the extent you voluntarily provide it.</li>
              </ul>
              <p className="text-foreground-soft mb-4 text-justify">
                The collection of this sensitive data is a critical aspect of our service. Unlike a standard website, a platform like factorbeam.com inherently processes information that requires a higher level of legal and security protection. By explicitly defining and disclosing the collection of this sensitive data, we demonstrate a commitment to transparency and lay the groundwork for a legally defensible privacy framework that aligns with the requirements of laws like GDPR and CCPA/CPRA, which place additional obligations on the processing of such information.
              </p>

              <h4 className="text-xl font-semibold text-heading mb-4">Usage Data and Automatically Collected Information:</h4>
              <p className="text-foreground-soft mb-4 text-justify">When you visit our website, we automatically collect certain information from your device, including:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                <li>Your Internet Protocol (IP) address.</li>
                <li>Your browser type and version.</li>
                <li>The pages of our site that you visit, the time spent on those pages, and the date and time of your visit.</li>
                <li>Device identifiers and other statistics related to your use of the service.</li>
              </ul>
              <p className="text-foreground-soft mt-4 text-justify">
                This information, often collected through cookies and third-party analytics tools like Google Analytics, helps us understand how our site is used and improve its functionality and performance. We make efforts to anonymize or pseudonymize this data whenever possible to protect your privacy.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">3. How and Why We Use Your Data (Legal Basis for Processing)</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We collect and process your personal data for specific, explicit, and legitimate purposes as outlined in this policy. We do not use your data for any other purpose without your express consent. Our legal bases for processing your personal data include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>For the Performance of a Contract:</strong> We process your data to administer assessments, score results, and provide you with personalized reports and insights as part of the service we offer to you.</li>
                <li><strong>With Your Consent:</strong> We rely on your consent to process sensitive personal data you provide, such as health or psychological information, for the purpose of delivering the assessment results. Your consent must be freely given, specific, informed, and unambiguous. You have the right to withdraw your consent at any time.</li>
                <li><strong>For Legitimate Interests:</strong> We may process certain data for our legitimate interests, such as account management, communication, security, fraud prevention, and to improve our services, as long as these interests do not override your fundamental rights and freedoms.</li>
                <li><strong>For Compliance with Legal Obligations:</strong> We may process your data when it is necessary to comply with a legal or regulatory obligation.</li>
              </ul>
              <p className="text-foreground-soft mb-4 text-justify">
                To provide clarity and transparency regarding our data handling practices, the following table details the specific categories of data we collect, the purposes for which we use them, and the legal basis for that processing.
              </p>

              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="text-lg font-semibold text-heading mb-4">Table 1: Data Collection and Processing</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-3 text-left">Categories of Data Collected</th>
                        <th className="border border-gray-300 p-3 text-left">Specific Purpose of Processing</th>
                        <th className="border border-gray-300 p-3 text-left">Legal Basis for Processing</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 p-3">Name, Email Address, Phone Number</td>
                        <td className="border border-gray-300 p-3">Account registration and management, communication, customer support, and sending administrative notices.</td>
                        <td className="border border-gray-300 p-3">Legitimate Interests, Contractual Necessity.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Assessment responses (career preferences, personality traits, skills, employment history, self-reported clinical history)</td>
                        <td className="border border-gray-300 p-3">To provide you with personalized assessment results, reports, and career insights.</td>
                        <td className="border border-gray-300 p-3">Explicit Consent.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">IP address, browser type, device information, pages visited, time spent</td>
                        <td className="border border-gray-300 p-3">To ensure the security and performance of our site, detect and prevent fraud, and for internal analytics and research to improve our services.</td>
                        <td className="border border-gray-300 p-3">Legitimate Interests.</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 p-3">Functional Cookies, Performance Cookies</td>
                        <td className="border border-gray-300 p-3">To remember user preferences, measure website activity, and analyze site usage.</td>
                        <td className="border border-gray-300 p-3">Consent (where required), Legitimate Interests.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">4. Data Sharing and Third-Party Services</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We do not sell your personal data to third parties, as defined by applicable law, nor do we monetize your personal data. We may share your information with certain third parties only for the purposes outlined in this policy.
              </p>
              
              <h4 className="text-xl font-semibold text-heading mb-4">With Our Service Providers:</h4>
              <p className="text-foreground-soft mb-4 text-justify">
                We engage third-party companies and individuals to perform services on our behalf, such as cloud hosting, analytics, and customer support. These service providers are contractually obligated to protect your data with the same level of care as we do and are prohibited from using it for any other purpose.
              </p>

              <h4 className="text-xl font-semibold text-heading mb-4">With AI Vendors:</h4>
              <p className="text-foreground-soft mb-4 text-justify">
                In some cases, our platform may use algorithmic or AI-powered tools to process assessment data and provide insights. We take a proactive and privacy-centric approach to this. We explicitly state that we do not use individual user data to train AI models. Instead, we only share aggregated and anonymized insights with our technology partners for research and product improvement. This approach addresses a significant and growing legal and ethical concern related to automated decision-making and profiling. By not using your individual data for AI training, we reinforce our commitment to your privacy and mitigate the risks associated with data misuse and algorithmic bias.
              </p>

              <h4 className="text-xl font-semibold text-heading mb-4">For Legal Compliance and Security:</h4>
              <p className="text-foreground-soft mb-4 text-justify">
                We may disclose your personal data to law enforcement, government officials, or other third parties when required by law or in response to a subpoena or court order. Furthermore, a fundamental aspect of legal protection for our business model concerns the disclosure of raw assessment data. The test questions and your specific answers are considered highly confidential, proprietary information protected by copyright and trade secrets laws. We will not release this "raw data" to unauthorized third parties unless compelled by a court order that includes specific protective measures, such as a requirement to seal the documents and destroy them at the conclusion of the legal proceedings.
              </p>

              <h4 className="text-xl font-semibold text-heading mb-4">In the Event of a Business Transaction:</h4>
              <p className="text-foreground-soft mb-4 text-justify">
                Your personal information may be transferred as part of a merger, acquisition, or sale of assets involving factorbeam.com. In such cases, we will provide prior notice before your personal information is transferred and becomes subject to a different privacy policy.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">5. Your Rights and Choices</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                You have significant rights over the personal information we hold about you. We are committed to providing you with the means to exercise these rights in a clear and straightforward manner.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>The Right to Know / Access:</strong> You have the right to request a copy of the personal information we hold about you. This includes the categories of information collected, the sources from which it was collected, and the specific purposes for processing.</li>
                <li><strong>The Right to Rectify / Correct:</strong> You can request that we correct any inaccurate or incomplete personal information we have about you.</li>
                <li><strong>The Right to Erasure / "Be Forgotten":</strong> You have the right to request the deletion of your personal data from our records in certain circumstances, such as when the data is no longer necessary for the purpose for which it was collected or when you withdraw your consent.</li>
                <li><strong>The Right to Object:</strong> You have the right to object to the processing of your personal data for specific purposes, such as direct marketing.</li>
                <li><strong>The Right to Data Portability:</strong> You can request to receive your personal data in a "structured, commonly used and machine-readable format" and have it transmitted to another data controller.</li>
                <li><strong>The Right to Opt-Out of Sale or Sharing:</strong> Although we do not sell or share personal data as defined by the CCPA, you have the right to opt-out. To provide this right, we have implemented a "Do Not Sell or Share My Personal Information" link.</li>
                <li><strong>Rights Related to Automated Decision-Making:</strong> We do not engage in fully automated decision-making that has a legal or otherwise significant effect on you. However, you have the right to be informed about any automated processes and to request human intervention.</li>
              </ul>
              <h4 className="text-xl font-semibold text-heading mb-4">How to Exercise Your Rights:</h4>
              <p className="text-foreground-soft mb-4 text-justify">
                To exercise any of these rights, please contact us using the methods provided in the "How to Contact Us" section. We are required to verify your identity before responding to a request to prevent unauthorized access to your data. We will respond to your request within one month of receiving it, with a possible extension of up to two additional months for complex or numerous requests.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">6. Children's Privacy</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under this age. If we become aware that we have inadvertently collected data from a child under 18, we will take immediate steps to delete that information from our servers.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                In jurisdictions where the processing of a child's data is permitted with consent, we require verifiable parental consent before processing any data from a minor. Furthermore, we are prohibited from using a child's personal data for behavioural monitoring, tracking, or targeted advertising.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">7. Cookies and Tracking Technologies</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We use cookies and other tracking technologies to enhance your experience on our website. A cookie is a small text file stored on your device that helps a website recognize you and your preferences. We use different categories of cookies, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Strictly Necessary Cookies:</strong> Essential for the website to function properly.</li>
                <li><strong>Functional Cookies:</strong> Used to provide enhanced functionality and personalization.</li>
                <li><strong>Performance Cookies:</strong> Allow us to count visits and measure site activity to improve performance.</li>
                <li><strong>Targeting Cookies:</strong> Used by advertising partners to build a profile of your interests and show you relevant ads.</li>
              </ul>
              <p className="text-foreground-soft mb-4 text-justify">
                You can manage your cookie preferences through our cookie consent banner or by using our Privacy Preference Centre. While GDPR requires explicit opt-in consent for most cookies, CCPA provides users with the right to opt out of cookies that sell or share their personal information. Our policy is designed to give you granular control over your preferences in compliance with both frameworks.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">8. Data Security</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We employ robust technical and organizational security measures to protect your personal data from unauthorized access, unlawful processing, accidental loss, destruction, or damage. Our security measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Encryption:</strong> We use industry-standard ciphers like AES-256 for data at rest and Transport Layer Security (TLS) for data in transit to ensure the confidentiality of your information.</li>
                <li><strong>Access Controls:</strong> Access to personal data is limited on a need-to-know basis to a specific group of authorized employees or contractors. We operate on the principle of least privilege to minimize access risks.</li>
                <li><strong>Monitoring and Auditing:</strong> We continuously monitor security event logs to detect and respond to anomalous behavior and security incidents.</li>
                <li><strong>Data Backups:</strong> We maintain regular data backups to ensure the availability and resilience of your data in the event of an incident.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">9. International Data Transfers</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                As a global online service, your personal data may be transferred to and processed in countries outside of your home jurisdiction. This may include storing data on cloud servers located outside your country or remote access to data by our employees or vendors located in different jurisdictions.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                We ensure that all international data transfers are protected by appropriate safeguards, as required by law. These safeguards may include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li>Relying on an adequacy decision from a competent authority, which confirms that a country offers an adequate level of data protection.</li>
                <li>Implementing Standard Contractual Clauses (SCCs), which are pre-approved legal agreements for the transfer of data.</li>
                <li>Obtaining your explicit consent for the transfer.</li>
              </ul>
              <p className="text-foreground-soft mb-4 text-justify">
                We also acknowledge that remote access by employees or vendors in different countries constitutes a cross-border data transfer. We implement the same robust security measures, including strong access controls and audit logging, to protect your data during such transfers.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">10. Data Retention and Deletion</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We will retain your personal data only for as long as is necessary to fulfil the purposes for which it was collected. This period is determined by legal obligations, dispute resolution, and our need to enforce our agreements. Once your data is no longer needed, it will be securely deleted or anonymized to prevent its use for any other purpose.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">11. Changes to This Privacy Policy</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We reserve the right to modify or update this Privacy Policy at any time. Any changes will be effective upon posting the revised policy on our website. We will notify you of any material changes via email or a prominent notice on our site. We review and update this policy at least once every 12 months to reflect new data collection or usage purposes, a requirement under CCPA/CPRA.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">12. How to Contact Us</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-heading mb-4">Designated Privacy Officer/Contact Person:</h4>
                <p className="text-foreground-soft mb-2"><strong>Email:</strong> info@factorbeam.com</p>
               
              </div>
            </section>
          </div>

          {/* Legal and Operational Commentary */}
          <div className="prose prose-lg max-w-none mb-12">
            <section className="bg-green-50 p-8 rounded-lg border-l-4 border-green-400 mb-12">
              <h2 className="text-3xl font-bold text-heading mb-8">III. Legal and Operational Commentary</h2>
              
              <h3 className="text-2xl font-semibold text-heading mb-6">1. The Dual-Layered Legal Shield: Privacy Policy vs. Educational Disclaimer</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                A crucial component of comprehensive legal protection for a business like factorbeam.com involves understanding the distinction between a Privacy Policy and an Educational Disclaimer. The Privacy Policy governs the lawful collection, use, and protection of user data. Conversely, the Educational Disclaimer is a separate legal tool designed to limit liability for the content and advice provided on the website.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                The business model of providing self-assessments could be interpreted as offering professional advice, such as career counselling or psychological insights. This exposes the operator to potential legal claims for damages or perceived malpractice if a user makes decisions based on the assessment results and suffers an adverse outcome. The "educational purposes only" disclaimer is the primary legal mechanism to mitigate this risk.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                A well-crafted disclaimer must explicitly state that the information is for informational purposes only and is not a substitute for professional legal, medical, or psychological advice. It must disclaim all liability for actions taken or not taken based on the site's content. This is essential for preventing the establishment of a professional-client relationship and protecting the operator from claims beyond data privacy.
              </p>
            </section>

            {/* Educational Disclaimer */}
            <section className="mb-12 bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-400">
              <h3 className="text-2xl font-semibold text-heading mb-6">2. Educational Purposes Only Disclaimer</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The information provided on this website and in its assessments, reports, and related content is for educational and informational purposes only. It is not intended to be a substitute for professional advice from a licensed attorney, doctor, psychologist, or other qualified professional.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                The content of this website contains general information and may not reflect the most current developments or information. We make no warranty, expressed or implied, about the accuracy, completeness, or reliability of the information provided.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                You should not act or refrain from acting on the basis of any information included on this site without seeking independent professional advice on the specific facts and circumstances at issue. By using this site, you expressly agree that factorbeam.com disclaims all liability with respect to actions taken or not taken by you based on any or all of the information or other contents of this site. Your use of this website does not create an attorney-client, doctor-patient, or any other professional-client relationship between you and factorbeam.com.
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">3. Operationalizing Your Privacy Policy</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Publishing a privacy policy is only the first step; true compliance requires operational commitment.
              </p>
              
              <h4 className="text-xl font-semibold text-heading mb-4">Handling User Rights Requests (DSARs):</h4>
              <p className="text-foreground-soft mb-4 text-justify">Every business must have a clear procedure for handling requests from users to exercise their privacy rights.</p>
              <ol className="list-decimal pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Identity Verification:</strong> Before providing any information, verify the identity of the requester to ensure you are not disclosing personal data to an unauthorized third party, which would constitute a data breach.</li>
                <li><strong>Timelines:</strong> Respond to all requests without undue delay and within one calendar month. If a request is complex, the response period may be extended by up to two additional months, but you must inform the user of the delay and the reason for it within the initial one-month period.</li>
                <li><strong>Information Format:</strong> Provide the information in a concise, intelligible, and easily accessible format, preferably electronically.</li>
                <li><strong>Record-Keeping:</strong> Maintain a log of all requests, including the date of receipt, the nature of the request, the steps taken to fulfill it, and the final response, to demonstrate compliance to a supervisory authority if needed.</li>
              </ol>

              <h4 className="text-xl font-semibold text-heading mb-4">Data Breach Management:</h4>
              <p className="text-foreground-soft mb-4 text-justify">In the event of a personal data breach, prompt and transparent action is required.</p>
              <ol className="list-decimal pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Immediate Action:</strong> The moment you become aware of a breach, you must contain and assess the situation.</li>
                <li><strong>Notification to Authorities:</strong> Under GDPR, you must notify the relevant supervisory authority without undue delay and, where feasible, no later than 72 hours after becoming aware of the breach. The notification should include details about the breach, the number of affected individuals, the likely consequences, and the measures taken to address it.</li>
                <li><strong>Notification to Users:</strong> You must also notify affected individuals if the breach is likely to result in a high risk to their rights and freedoms. The notice should provide information on what happened, the potential risks, and steps they can take to mitigate them.</li>
              </ol>
            </section>

            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">4. Sustaining Global Compliance: An Ongoing Commitment</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                To ensure genuine protection from legal cases worldwide, compliance must be viewed as a continuous process, not a one-time task.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Annual Policy Review:</strong> The CCPA/CPRA requires that privacy policies be updated at least every 12 months to reflect any new data collection practices or changes in business operations. This practice should be adopted globally to ensure the policy remains accurate and relevant.</li>
                <li><strong>Documentation and Record-Keeping:</strong> Maintain thorough records of all data processing activities, lawful bases for processing, and all user consents. This documentation is essential for demonstrating compliance during an audit or investigation.</li>
                <li><strong>Internal Training:</strong> Ensure that all employees, contractors, or any personnel with access to user data are trained on the privacy policy and their responsibilities. This creates a culture of privacy and reduces the risk of human error leading to a data breach.</li>
                <li><strong>Regular Audits:</strong> Conduct regular internal audits to verify that security measures are effective and that data handling practices align with the published policy.</li>
              </ul>
            </section>

            {/* Global Compliance Table */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-heading mb-6">Table 2: Comparative Analysis of Global Data Privacy Laws</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-3 text-left">Feature</th>
                      <th className="border border-gray-300 p-3 text-left">GDPR (EU)</th>
                      <th className="border border-gray-300 p-3 text-left">CCPA/CPRA (California)</th>
                      <th className="border border-gray-300 p-3 text-left">DPDP (India)</th>
                      <th className="border border-gray-300 p-3 text-left">PIPEDA (Canada)</th>
                      <th className="border border-gray-300 p-3 text-left">LGPD (Brazil)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Territorial Scope</td>
                      <td className="border border-gray-300 p-3">Protects EU residents regardless of where data is processed.</td>
                      <td className="border border-gray-300 p-3">Protects California residents, including those temporarily out of state.</td>
                      <td className="border border-gray-300 p-3">Protects data principals in India.</td>
                      <td className="border border-gray-300 p-3">Applies to private sector organizations that collect, use, or disclose personal data in the course of commercial activities.</td>
                      <td className="border border-gray-300 p-3">Protects individuals residing in Brazil and data collected in Brazil.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Consent Model</td>
                      <td className="border border-gray-300 p-3">Opt-in for most processing. Consent must be freely given, specific, informed, and unambiguous.</td>
                      <td className="border border-gray-300 p-3">Opt-out for sale or sharing of data. Explicit opt-in required for minors under 16.</td>
                      <td className="border border-gray-300 p-3">Opt-in through clear affirmative action.</td>
                      <td className="border border-gray-300 p-3">Consent must be meaningful and informed. Requires explicit consent for sensitive data.</td>
                      <td className="border border-gray-300 p-3">Opt-in and must be freely given, informed, and unambiguous.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Data Subject Rights</td>
                      <td className="border border-gray-300 p-3">Right to be informed, access, rectification, erasure, restrict processing, data portability, and to object.</td>
                      <td className="border border-gray-300 p-3">Right to know, delete, correct, opt-out of sale/sharing, and non-discrimination.</td>
                      <td className="border border-gray-300 p-3">Right to access, correct, erase, and revoke consent. The right to file a complaint.</td>
                      <td className="border border-gray-300 p-3">Right to access and correct personal information.</td>
                      <td className="border border-gray-300 p-3">Right to confirm processing, access, correct, anonymize, erase, and data portability.</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Breach Notification</td>
                      <td className="border border-gray-300 p-3">Notify supervisory authority within 72 hours of becoming aware of the breach, unless unlikely to pose a risk. Must notify affected individuals if the risk is high.</td>
                      <td className="border border-gray-300 p-3">Notify affected consumers "in the most expedient time possible and without unreasonable delay".</td>
                      <td className="border border-gray-300 p-3">Notify the Data Protection Board and affected data principals.</td>
                      <td className="border border-gray-300 p-3">Must report a breach of security safeguards to the Privacy Commissioner of Canada and to affected individuals.</td>
                      <td className="border border-gray-300 p-3">Must notify the National Data Protection Authority (ANPD).</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-3 font-semibold">Penalties</td>
                      <td className="border border-gray-300 p-3">Up to €20 million or 4% of global annual revenue, whichever is higher.</td>
                      <td className="border border-gray-300 p-3">Up to $7,500 per intentional violation. Private right of action for data breaches with statutory damages.</td>
                      <td className="border border-gray-300 p-3">Up to INR 250 crores.</td>
                      <td className="border border-gray-300 p-3">Up to CAD $100,000 for each offense.</td>
                      <td className="border border-gray-300 p-3">Up to 2% of a company's annual revenue in Brazil.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
