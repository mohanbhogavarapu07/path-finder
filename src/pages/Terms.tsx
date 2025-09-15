import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AdSenseComponent from '@/components/AdSenseComponent';

const Terms = () => {
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
              Terms of Service for factorbeam.com
            </h1>
            <p className="text-lg text-foreground-soft">
              Last Updated: August 31, 2025
            </p>
          </div>

          {/* Terms of Service Content */}
          <div className="prose prose-lg max-w-none">
            
            {/* Preamble */}
            <section className="mb-12 bg-blue-50 p-8 rounded-lg border-l-4 border-blue-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">Preamble: Agreement to Terms</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                These Terms of Service ("Terms," "Terms of Service," or "Agreement") constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you" or "User"), and, doing business as factorbeam.com ("Company," "we," "us," or "our"), concerning your access to and use of the https://factorbeam.com website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Website" or the "Service").
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                The Service provides users with access to various assessments, tools, and informational content designed to facilitate self-discovery and career exploration for educational purposes. By creating an account, accessing the Website, or using any part of the Service, you acknowledge that you have read, understood, and agree to be bound by all of these Terms of Service. This Agreement forms the entire understanding between you and the Company regarding the use of the Service.
              </p>
              <p className="text-foreground-soft mb-4 font-semibold text-justify">
                IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF SERVICE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICE AND YOU MUST DISCONTINUE USE IMMEDIATELY. Your continued access to or use of the Service will be considered your acceptance of these Terms.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of these Terms of Service, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Terms of Service to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Terms of Service by your continued use of the Service after the date such revised Terms of Service are posted.
              </p>
              <p className="text-foreground-soft text-justify">
                The enforceability of this agreement is predicated on your explicit consent. For certain actions, such as account registration, you will be required to take a clear, affirmative action (for example, checking a box adjacent to a statement such as "I have read and agree to the Terms of Service") to signify your agreement. This action demonstrates your unambiguous consent to be legally bound by this Agreement. Silence, pre-ticked boxes, or inactivity does not constitute acceptance.
              </p>
            </section>

            {/* Definitions */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">1. Definitions</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft">
                <li><strong>Account:</strong> A unique account created for a User to access and use the Service or parts of the Service.</li>
                <li><strong>Assessments:</strong> The various questionnaires, tests, tools, and generated reports available through the Service, designed to provide Users with information and perspectives for personal educational and self-exploration purposes only. This definition is critical, as it frames the nature of the tools provided and pre-emptively establishes their non-diagnostic and non-prescriptive intent.</li>
                <li><strong>Company:</strong> (referred to as either "the Company," "we," "us," or "our" in this Agreement) refers to,.</li>
                <li><strong>Content:</strong> Refers to all text, graphics, images, software, algorithms, reports, and other information that can be accessed, viewed, or otherwise made available through the Service, regardless of its form.</li>
                <li><strong>Intellectual Property:</strong> All patents, copyrights, trademarks, trade secrets, and other proprietary rights in and to the Service, the Assessments, and all Content.</li>
                <li><strong>Service:</strong> Refers to the Website, https://factorbeam.com, including all its features, functionalities, Assessments, and Content provided by the Company.</li>
                <li><strong>Terms:</strong> These Terms of Service that form the entire agreement between the User and the Company regarding the use of the Service.</li>
                <li><strong>User:</strong> Any individual or entity who accesses or uses the Service.</li>
                <li><strong>User Content:</strong> Any content, such as text, images, feedback, or other information, that can be posted, uploaded, linked to, or otherwise made available by a User through the Service.</li>
                <li><strong>Website:</strong> Refers to factorbeam.com, accessible from https://factorbeam.com.</li>
              </ul>
            </section>

            {/* The Factorbeam Service */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">2. The Factorbeam Service</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">2.1. Scope of Service</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The Company provides a Software-as-a-Service (SaaS) platform offering a suite of Assessments and related Content intended to assist Users in personal and career exploration. The Service is designed to offer perspectives and information for educational purposes only and is not intended to be a substitute for professional guidance.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">2.2. License to Use the Service</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Subject to your compliance with these Terms, the Company grants you a limited, personal, non-exclusive, non-transferable, and revocable license to access and use the Service for your own personal, non-commercial purposes. This license is not a transfer of title and does not grant you any ownership rights in the Service or its Content. You may not use the Service for any purpose other than that for which it is intended as set forth in this Agreement. This license shall automatically terminate if you violate any of the restrictions contained in these Terms.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">2.3. Service Availability and Modifications</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee that the Service will always be available, uninterrupted, timely, secure, or error-free. The Service may be inaccessible or may not function properly with your specific web browser, mobile device, or operating system. We reserve the right to modify, suspend, or discontinue, temporarily or permanently, the Service or any part of it with or without notice at any time. You agree that the Company will not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service. The operational realities of a SaaS platform include potential for downtime, bugs, and compatibility issues; by using the Service, you acknowledge and accept the risk of such service interruptions.
              </p>
            </section>

            {/* User Accounts */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">3. User Accounts</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">3.1. Eligibility</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                To create an Account and use the Service, you must be at least 18 years of age, or the age of legal majority in your jurisdiction. If you are between the ages of 13 and 18 (or the applicable age of majority), you may use the Service only with the involvement and consent of a parent or legal guardian who agrees to be bound by these Terms. The Service is not intended for children under the age of 13, and we do not knowingly collect personal data from children under 13, in compliance with regulations such as the Children's Online Privacy Protection Act (COPPA) and the General Data Protection Regulation (GDPR).
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">3.2. Account Registration and Security</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                When you create an Account, you agree to provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your Account on our Service.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                You are solely and entirely responsible for maintaining the confidentiality of your account password and for restricting access to your device. You agree to accept responsibility for all activities or actions that occur under your Account and/or password. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your Account. A User's failure to secure their account credentials may lead to unauthorized access to their personal data, and under this Agreement, the liability for such a breach rests with the User. This responsibility is a critical component of our risk allocation strategy and directly supports the indemnification obligations outlined in Section 10 of this Agreement.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">3.3. Account Limitations</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you without appropriate authorization, or a name that is otherwise offensive, vulgar, or obscene. You are permitted to create and maintain only one Account. We reserve the right to refuse service, terminate accounts, remove or edit content in our sole discretion.
              </p>
            </section>

            {/* Acceptable Use and User Conduct */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">4. Acceptable Use and User Conduct</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                Your use of the Service is subject to all applicable local, state, national, and international laws and regulations. You agree to abide by these laws and are solely responsible for all acts or omissions that occur under your Account. As a condition of use, you agree not to use the Service for any purpose that is unlawful or prohibited by these Terms.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">4.1. Prohibited Activities</h3>
              <p className="text-foreground-soft mb-4 text-justify">You are expressly prohibited from engaging in the following activities:</p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Unlawful Use:</strong> Using the Service to violate any applicable law, regulation, or rule, or to promote illegal activities.</li>
                <li><strong>Commercial Use and Employment Screening:</strong> Using the Service or any of its Assessments or Content for any commercial purpose. This includes, but is not limited to, reselling Assessment results, using the Service as part of a fee-based offering, or, most critically, using the Assessments for employment-related decisions such as hiring, screening, promotion, or employee evaluation. This prohibition is a fundamental term of this Agreement. The Assessments provided by the Service are not validated for employment selection or psychological diagnosis, and their use in such contexts can be unethical and may violate applicable laws. Any User who utilizes the Service for such prohibited purposes does so in direct breach of this Agreement and assumes all associated liability.</li>
                <li><strong>Intellectual Property Infringement:</strong> Copying, distributing, modifying, reverse engineering, decompiling, disassembling, or creating derivative works from the Service, its Assessments, or any Content without our express written permission.</li>
                <li><strong>System Abuse:</strong> Uploading or transmitting viruses, worms, Trojan horses, or any other malicious code that is designed to interrupt, destroy, or limit the functionality of any computer software, hardware, or telecommunications equipment.</li>
                <li><strong>Automated Access:</strong> Using any robot, spider, scraper, or other automated means to access the Service for any purpose without our express written permission, including for data mining or data harvesting.</li>
                <li><strong>Interference:</strong> Taking any action that imposes, or may impose, in our sole discretion, an unreasonable or disproportionately large load on our infrastructure; interfering or attempting to interfere with the proper working of the Service or any activities conducted on the Service.</li>
                <li><strong>Harmful Conduct:</strong> Harassing, abusing, threatening, or harming another person, or sharing content that is defamatory, obscene, pornographic, or otherwise offensive.</li>
                <li><strong>Misrepresentation:</strong> Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity.</li>
              </ul>
              <p className="text-foreground-soft mb-4 text-justify">
                Violation of these rules of conduct may result in the immediate termination of your Account and may subject you to civil or criminal liability. The Company reserves the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates this provision.
              </p>
            </section>

            {/* Intellectual Property Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">5. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">5.1. Company's Intellectual Property</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The Service and its entire contents, features, and functionality—including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof, as well as the proprietary methodologies, algorithms, and structure of the Assessments—are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. These Terms do not grant you any right, title, or interest in the Service, its Content, or our trademarks, logos, and other brand features.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                A clear distinction must be made between a User's personal data and the Company's intellectual property. While the specific answers a User provides to Assessment questions constitute their personal information (the handling of which is governed by our Privacy Policy), the Assessment questions themselves, the scoring algorithms, the structure of the generated reports, and the explanatory text within those reports are the exclusive intellectual property of the Company. This distinction prevents a User from reproducing, distributing, or creating derivative works from their Assessment report beyond the scope of personal, non-commercial use, thereby protecting the core business assets of the Service.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">5.2. User-Generated Content</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                To the extent the Service permits you to post, upload, or otherwise submit User Content, you retain ownership of any intellectual property rights that you hold in that content. However, by submitting User Content to the Service, you grant the Company a worldwide, non-exclusive, royalty-free, perpetual, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the Service and the Company's business, including for promoting and redistributing part or all of the Service.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">5.3. Feedback</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We welcome your feedback, comments, and suggestions for improvements to the Service ("Feedback"). You can submit Feedback by emailing us at info@factorbeam.com. You acknowledge and agree that any Feedback you provide will be considered non-confidential and non-proprietary. You grant to us a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use and publish these ideas and materials for any purpose, without compensation to you.
              </p>
            </section>

            {/* Crucial Disclaimers and User Acknowledgements */}
            <section className="mb-12 bg-yellow-50 p-8 rounded-lg border-l-4 border-yellow-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">6. Crucial Disclaimers and User Acknowledgements</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                This section outlines the fundamental limitations of the Service. Your agreement to these disclaimers is a material condition of your access to and use of the Service.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">6.1. For Educational and Informational Purposes Only</h3>
              <p className="text-foreground-soft mb-4 font-semibold text-justify">
                YOU EXPRESSLY ACKNOWLEDGE AND AGREE THAT THE SERVICE, INCLUDING ALL ASSESSMENTS, CONTENT, REPORTS, AND ANY ADVICE OR INFORMATION PROVIDED, IS FOR GENERAL EDUCATIONAL, INFORMATIONAL, AND ENTERTAINMENT PURPOSES ONLY. The content is not intended to be a substitute for professional advice and should not be relied upon as such. The information is not comprehensive and is intended to serve as one resource among many for personal exploration.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">6.2. No Professional Advice Disclaimer</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The Company is not a licensed provider of medical, psychological, career counseling, legal, or financial services. THE SERVICE DOES NOT PROVIDE, AND SHALL NOT BE CONSTRUED AS PROVIDING, ANY FORM OF PROFESSIONAL ADVICE, INCLUDING BUT NOT LIMITED TO MEDICAL, MENTAL HEALTH, PSYCHOLOGICAL, CAREER COUNSELING, LEGAL, OR FINANCIAL ADVICE. No fiduciary, therapeutic, or professional-client relationship of any kind is created between you and the Company through your use of the Service. You should not act or refrain from acting on the basis of any information contained in the Service without seeking independent professional advice from a person who is licensed and/or qualified in the applicable area.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">6.3. Disclaimers Regarding Assessments and Results</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                The efficacy and accuracy of the Assessments and their results are subject to significant limitations. By using the Service, you acknowledge and agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li><strong>Not a Diagnostic Tool:</strong> The Assessments are not scientifically validated diagnostic instruments. They should not be used to treat, assess, or diagnose any psychological, mental health, or medical condition. Assessment of any such condition should only be made by a qualified professional.</li>
                <li><strong>Based on Self-Reported Data:</strong> The results generated by the Assessments are based entirely on the information you provide. The accuracy and usefulness of the results are therefore dependent on your own self-awareness and honesty. The results may provide a distorted or incomplete picture of your personality, skills, or potential.</li>
                <li><strong>General Tendencies, Not Definitive Truths:</strong> The results describe general indicators and tendencies; they are not definitive guidelines or absolute answers. Significant differences can exist even among individuals who share the same assessment results. The information is meant to inspire personal growth, not to be taken as an infallible depiction of your character or future.</li>
                <li><strong>Potential for Objectionable Interpretations:</strong> You are aware of the possibility of encountering interpretations of your Assessment performance with which you may not agree or may find objectionable.</li>
                <li><strong>Assumption of Risk and No Reliance:</strong> YOU AGREE THAT YOU ARE SOLELY RESPONSIBLE FOR ANY ACTIONS YOU TAKE, OR FAIL TO TAKE, IN RELIANCE ON ANY INFORMATION OBTAINED THROUGH THE SERVICE. YOU HEREBY AGREE THAT YOU WILL NOT MAKE ANY SIGNIFICANT LIFE, CAREER, EDUCATIONAL, FINANCIAL, OR PERSONAL DECISIONS BASED SOLELY ON THE ASSESSMENTS, REPORTS, OR ANY OTHER CONTENT PROVIDED BY THE SERVICE. This contractual assumption of risk is a cornerstone of this Agreement. It shifts the burden of interpretation and subsequent action entirely onto you, the User. This makes it substantially more difficult to claim reasonable reliance on the Service's "advice" in any future dispute, as you have contractually covenanted not to do so.</li>
              </ul>
            </section>

            {/* Privacy and Data Protection */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">7. Privacy and Data Protection</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                The Company is committed to protecting your privacy. Our collection, use, and disclosure of your personal information in connection with the Service is governed by our Privacy Policy. The Privacy Policy is a separate document that details our data handling practices in compliance with international data protection laws, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA).
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                The Privacy Policy is incorporated by reference into these Terms of Service. By accepting these Terms, you acknowledge that you have read, understood, and agree to the data practices described in our Privacy Policy. A current version of our Privacy Policy can be found at /privacy. This structure ensures that you enter into a single, unified legal agreement covering both the use of the service and the handling of your data, while allowing each document to address its specific legal requirements with the necessary detail and clarity.
              </p>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12 bg-red-50 p-8 rounded-lg border-l-4 border-red-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">8. Disclaimer of Warranties</h2>
              <p className="text-foreground-soft mb-4 font-semibold text-justify">
                THE SERVICE AND ALL CONTENT, ASSESSMENTS, AND MATERIALS INCLUDED THEREIN ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                TO THE FULLEST EXTENT PERMISSIBLE BY APPLICABLE LAW, THE COMPANY AND ITS AFFILIATES, LICENSORS, AND SUPPLIERS EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                THE COMPANY DOES NOT WARRANT THAT: (A) THE SERVICE WILL MEET YOUR REQUIREMENTS; (B) THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE; (C) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICE WILL BE ACCURATE OR RELIABLE; OR (D) THE QUALITY OF ANY PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL OBTAINED BY YOU THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS.
              </p>
              <p className="text-foreground-soft text-justify">
                THIS DISCLAIMER OF WARRANTIES IS A FUNDAMENTAL PART OF THIS AGREEMENT AND FORMS THE BASIS FOR THE LIMITATIONS OF LIABILITY SET FORTH IN SECTION 9. BY ELIMINATING POTENTIAL IMPLIED PROMISES ABOUT THE SERVICE'S PERFORMANCE, WE ESTABLISH THE LEGAL FOUNDATION FOR LIMITING OUR FINANCIAL LIABILITY IN THE EVENT THE SERVICE FAILS TO PERFORM AS A USER MIGHT EXPECT.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12 bg-red-50 p-8 rounded-lg border-l-4 border-red-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">9. Limitation of Liability</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS AFFILIATES, DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (A) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (B) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (C) ANY CONTENT OBTAINED FROM THE SERVICE; AND (D) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                IN NO EVENT SHALL THE COMPANY'S AGGREGATE LIABILITY FOR ALL CLAIMS RELATING TO THE SERVICE EXCEED THE GREATER OF:
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                (A) ONE HUNDRED U.S. DOLLARS ($100.00); OR<br/>
                (B) THE TOTAL AMOUNT OF FEES, IF ANY, PAID BY YOU TO THE COMPANY FOR THE SERVICE DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                This liability cap is designed to be proportional to the economic value of the relationship between the User and the Company. Tying the maximum liability for paying Users to the revenue they have generated is a standard, commercially reasonable practice that creates a defensible and fair allocation of risk. For Users who do not pay fees, liability is limited to a nominal sum.
              </p>
              <p className="text-foreground-soft text-justify">
                SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES OR THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE LIMITATIONS ABOVE MAY NOT APPLY TO YOU TO THE EXTENT PROHIBITED BY LAW.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">10. Indemnification</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                You agree to defend, indemnify, and hold harmless the Company and its affiliates, and their respective officers, directors, employees, contractors, agents, licensors, and suppliers from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from or related to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground-soft mb-6">
                <li>(a) your use of and access to the Service, including any data or content transmitted or received by you;</li>
                <li>(b) your violation of any term of this Agreement, including without limitation your breach of any of the representations and warranties above;</li>
                <li>(c) your violation of any third-party right, including without limitation any right of privacy, publicity rights, or Intellectual Property Rights;</li>
                <li>(d) your violation of any applicable law, rule, or regulation;</li>
                <li>(e) any claim or damages that arise as a result of any of your User Content; or</li>
                <li>(f) any other party's access and use of the Service with your unique username, password, or other appropriate security code.</li>
              </ul>
              <p className="text-foreground-soft text-justify">
                This indemnification obligation is a critical risk-shifting mechanism. While Section 9 (Limitation of Liability) protects the Company from claims brought by you, this Section 10 protects the Company from claims brought by third parties that are caused by your actions. For instance, if a business uses the Service for prohibited employment screening in violation of Section 4.1 and is subsequently sued by a job applicant, this indemnification clause would require that business (the User) to cover the Company's legal defense costs and any resulting damages from that third-party lawsuit.
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">11. Termination</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">11.1. Termination by the Company</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                We may terminate or suspend your Account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms. If we terminate or suspend your account for any reason, you are prohibited from registering and creating a new account under your name, a fake or borrowed name, or the name of any third party, even if you may be acting on behalf of the third party.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">11.2. Termination by You</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                You may terminate your Account at any time by ceasing all use of the Service and following any account deletion procedures available on the Website.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">11.3. Survival of Provisions</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Upon termination of this Agreement, your right to use the Service will immediately cease. However, any provision of these Terms that by its nature should survive termination shall survive termination, including, without limitation, ownership provisions (Section 5), all disclaimers and user acknowledgements (Section 6), disclaimer of warranties (Section 8), limitation of liability (Section 9), indemnification (Section 10), dispute resolution provisions (Section 12), and general provisions (Section 13). The survival of these clauses is essential to ensure that the core legal protections and risk allocations agreed to during your use of the Service remain in effect indefinitely, safeguarding the Company from post-termination legal challenges.
              </p>
            </section>

            {/* Dispute Resolution, Governing Law, and Venue */}
            <section className="mb-12 bg-green-50 p-8 rounded-lg border-l-4 border-green-400">
              <h2 className="text-2xl font-semibold text-heading mb-6">12. Dispute Resolution, Governing Law, and Venue</h2>
              <p className="text-foreground-soft mb-4 font-semibold text-justify">
                PLEASE READ THIS SECTION CAREFULLY AS IT AFFECTS YOUR RIGHTS.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">12.1. Governing Law</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                These Terms shall be governed and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. This choice of a business-friendly jurisdiction with a well-developed body of corporate law is intended to provide a predictable legal framework for the interpretation of this Agreement.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">12.2. Binding Arbitration (For U.S. Users)</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                If you are a User located in the United States, you and the Company agree that any dispute, claim, or controversy arising out of or relating to these Terms or the breach, termination, enforcement, interpretation, or validity thereof or the use of the Services (collectively, "Disputes") will be settled by binding arbitration, except that each party retains the right to bring an individual action in small claims court and the right to seek injunctive or other equitable relief in a court of competent jurisdiction to prevent the actual or threatened infringement, misappropriation, or violation of a party's copyrights, trademarks, trade secrets, patents, or other intellectual property rights.
              </p>
              <p className="text-foreground-soft mb-4 text-justify">
                The arbitration will be administered by the American Arbitration Association ("AAA") in accordance with the Commercial Arbitration Rules and the Supplementary Procedures for Consumer Related Disputes (the "AAA Rules") then in effect.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">12.3. Class Action Waiver</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                YOU AND THE COMPANY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. Further, unless both you and the Company agree otherwise, the arbitrator may not consolidate more than one person's claims, and may not otherwise preside over any form of a representative or class proceeding. This waiver is a critical component of our dispute resolution strategy, designed to prevent large-scale litigation by requiring that any claim be brought on an individual basis, thereby making systemic legal challenges economically unfeasible for claimants.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">12.4. Venue</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                For any disputes not subject to arbitration, you and the Company agree to submit to the personal and exclusive jurisdiction of and venue in the state and federal courts located within Delaware.
              </p>
            </section>

            {/* General Provisions */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">13. General Provisions</h2>
              
              <h3 className="text-xl font-semibold text-heading mb-4">13.1. Entire Agreement</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                These Terms and our Privacy Policy constitute the entire agreement between you and the Company regarding our Service, and supersede and replace any prior agreements we might have had between us regarding the Service.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">13.2. Severability</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                If any provision of these Terms is held to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions of these Terms will remain in effect. The invalid or unenforceable provision will be changed and interpreted so as to best accomplish the objectives of the original provision to the fullest extent allowed by law. This clause is a structural pillar of the Agreement, ensuring that if one clause is challenged and invalidated in a particular jurisdiction, the remainder of the contract—including its core liability protections—remains intact and enforceable.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">13.3. Waiver</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                No waiver by the Company of any term or condition set forth in these Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms shall not constitute a waiver of such right or provision.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">13.4. Assignment</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                You may not assign or transfer these Terms, by operation of law or otherwise, without the Company's prior written consent. Any attempt by you to assign or transfer these Terms, without such consent, will be null and of no effect. The Company may assign or transfer these Terms, at its sole discretion, without restriction.
              </p>

              <h3 className="text-xl font-semibold text-heading mb-4">13.5. Notices</h3>
              <p className="text-foreground-soft mb-4 text-justify">
                Any notices or other communications provided by the Company under these Terms, including those regarding modifications to these Terms, will be given: (i) via email; or (ii) by posting to the Service. For notices made by e-mail, the date of receipt will be deemed the date on which such notice is transmitted.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-heading mb-6">14. Contact Information</h2>
              <p className="text-foreground-soft mb-4 text-justify">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-foreground-soft"><strong>Email:</strong> info@factorbeam.com</p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
