
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Effective Date: May 23, 2025</p>

          <p className="text-gray-800 mb-6">
            Welcome to Vidya-Samveda. We are committed to protecting your personal information and your right to privacy. 
            This Privacy Policy describes how Vidya-Samveda ("we," "our," or "us") collects, uses, stores, shares, and 
            protects your information when you use our platform, website, and services.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">a. Personal Information You Provide</h3>
            <p className="text-gray-800 mb-3">When you sign up, apply for internships, or interact with our services, we collect:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Full name</li>
              <li>Email address and phone number</li>
              <li>Date of birth</li>
              <li>Gender (optional)</li>
              <li>Educational background (college name, degree, CGPA, etc.)</li>
              <li>Resume and career-related documents</li>
              <li>LinkedIn/GitHub/Portfolio links</li>
              <li>Preferences and career interests</li>
              <li>Any content you submit (grievances, feedback, forum posts)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">b. Automatically Collected Information</h3>
            <p className="text-gray-800 mb-3">When you use Vidya-Samveda, we collect:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Pages visited and features used</li>
              <li>Log data, timestamps, referral sources</li>
              <li>Cookies and tracking pixels (see our Cookie Policy)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">c. Third-Party Sources</h3>
            <p className="text-gray-800 mb-3">We may receive data from:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Integrated platforms (e.g., Google login, LinkedIn)</li>
              <li>Employer or educational institution portals</li>
              <li>Event and mentorship platform integrations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-800 mb-3">We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>To create and manage your Vidya-Samveda account</li>
              <li>To match students with job and internship opportunities</li>
              <li>To facilitate mentorships, challenges, and skill-based programs</li>
              <li>To enable recruiters to assess and connect with candidates</li>
              <li>To help colleges track student progress and manage placements</li>
              <li>To improve our services via analytics and feedback</li>
              <li>To provide customer support and respond to inquiries</li>
              <li>To notify users about updates, events, and opportunities</li>
              <li>To enforce our Terms of Use and comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Sharing and Disclosure of Information</h2>
            <p className="text-gray-800 mb-3">We only share your information under the following conditions:</p>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">a. With Employers and Recruiters</h3>
            <p className="text-gray-800 mb-3">To facilitate job applications and candidate discovery.</p>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">b. With Colleges and Institutions</h3>
            <p className="text-gray-800 mb-3">To allow placement tracking, analytics, and reporting of student outcomes.</p>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">c. With Mentors</h3>
            <p className="text-gray-800 mb-3">To facilitate communication during mentorship programs.</p>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">d. With Service Providers</h3>
            <p className="text-gray-800 mb-3">Such as cloud storage, customer support, and analytics tools (e.g., AWS, Google Analytics).</p>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">e. For Legal and Security Purposes</h3>
            <p className="text-gray-800 mb-3">To comply with regulations, court orders, or detect fraud or misuse.</p>
            
            <p className="text-gray-800 mt-4">We do not sell or rent your personal data to any third parties for advertising purposes.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Your Rights and Controls</h2>
            <p className="text-gray-800 mb-3">As a user, you have the right to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li><strong>Access:</strong> Request access to the data we hold about you</li>
              <li><strong>Update:</strong> Correct inaccuracies in your information</li>
              <li><strong>Delete:</strong> Request deletion of your account and associated data</li>
              <li><strong>Restrict:</strong> Limit how we use your personal data</li>
              <li><strong>Port:</strong> Receive your data in a portable format</li>
              <li><strong>Withdraw Consent:</strong> Opt out of promotional communications at any time</li>
            </ul>
            <p className="text-gray-800">You may exercise these rights by contacting us at privacy@vidyasamveda.com.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Retention</h2>
            <p className="text-gray-800 mb-3">We retain your data:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>As long as your account remains active</li>
              <li>For legal, regulatory, and operational purposes</li>
              <li>For the improvement of platform services (de-identified data only)</li>
            </ul>
            <p className="text-gray-800">Upon request, we will permanently delete your account and data within 30 days, unless required otherwise by law.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Security of Your Information</h2>
            <p className="text-gray-800 mb-3">We employ multiple safeguards to protect your data:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>HTTPS encryption</li>
              <li>Role-based access controls</li>
              <li>Regular security audits</li>
              <li>Secure hosting and backups</li>
              <li>Password hashing and two-factor authentication (2FA)</li>
            </ul>
            <p className="text-gray-800">Despite our efforts, no system is 100% secure. Please use strong passwords and keep your credentials confidential.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-800">Vidya-Samveda is intended for use by students aged 13 and above. We do not knowingly collect data from children under 13. If we become aware of such data, we will delete it immediately.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
            <p className="text-gray-800 mb-3">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Maintain login sessions</li>
              <li>Personalize content</li>
              <li>Analyze usage patterns</li>
              <li>Improve site performance</li>
            </ul>
            <p className="text-gray-800">You may control cookie settings in your browser. For more details, see our Cookie Policy.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. International Users</h2>
            <p className="text-gray-800">Our services may be accessed globally. By using Vidya-Samveda, you agree to the transfer, storage, and processing of your data in accordance with this policy, including in jurisdictions outside your own.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-800">We may update this policy to reflect changes in technology, regulations, or services. Updates will be posted on this page and communicated via email or platform notification.</p>
            <p className="text-gray-600 mt-3">Last updated: May 23, 2025</p>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-800 mb-3">For any privacy-related questions or concerns, please contact:</p>
            <p className="text-gray-800">📧 privacy@vidyasamveda.com</p>
            <p className="text-gray-800">📍 Vidya-Samveda Headquarters, Bengaluru, India</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
