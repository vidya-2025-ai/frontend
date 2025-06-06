
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-6">Effective Date: May 23, 2025</p>
          
          <p className="text-gray-800 mb-6">
            Welcome to Vidya-Samveda – Your Gateway to Career Discovery, Internships, Mentorship, and Skill Development.
          </p>
          
          <p className="text-gray-800 mb-6">
            By accessing or using our platform, website, or services (collectively, "Services"), you agree to be bound by these 
            Terms of Service ("Terms") and to our Privacy Policy. If you do not agree, do not use the platform.
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-800">
              Vidya-Samveda is an integrated digital ecosystem designed to bridge the gap between students, industry mentors, 
              academic institutions, and recruiters. The platform facilitates opportunities for learning, mentorship, job readiness, and hiring.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. User Eligibility</h2>
            <p className="text-gray-800 mb-3">To use Vidya-Samveda, you must:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Be at least 13 years old.</li>
              <li>Register with accurate personal and institutional information.</li>
              <li>Comply with local laws and platform rules.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Roles and Obligations</h2>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">a. Students</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Must maintain honesty in applications and profiles.</li>
              <li>Use services like Resume Builder, ATS Calculator, and Career Hub responsibly.</li>
              <li>Respect community guidelines during interactions with mentors and recruiters.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">b. Mentors</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Provide professional and respectful mentorship.</li>
              <li>Must not engage in harassment, discrimination, or financial solicitation.</li>
              <li>Are expected to maintain transparency regarding expertise and availability.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">c. Recruiters</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>May post job and internship opportunities through verified accounts.</li>
              <li>Must ensure accuracy in job descriptions, selection processes, and communication.</li>
              <li>Must adhere to fair hiring practices and avoid discriminatory conduct.</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-900 mb-2">d. Colleges / Institutions</h3>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Have access to dashboards for monitoring student performance and placement analytics.</li>
              <li>Must ensure that their stakeholders use the platform responsibly.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. User Conduct</h2>
            <p className="text-gray-800 mb-3">Users agree NOT to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Misrepresent themselves or create fake profiles.</li>
              <li>Upload malicious software or attempt to disrupt platform operations.</li>
              <li>Use the platform for unauthorized commercial activity.</li>
              <li>Engage in bullying, abuse, or inappropriate interactions.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Account Security</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Users are responsible for maintaining the confidentiality of their account.</li>
              <li>Vidya-Samveda is not liable for any losses due to unauthorized access.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Content Ownership & Intellectual Property</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>All content created by users remains their intellectual property.</li>
              <li>By posting content, users grant Vidya-Samveda a license to use it for platform functionality.</li>
              <li>All platform branding, tools, and content (except user-generated) belong to Vidya-Samveda.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Service Availability</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>We aim to maintain an uninterrupted service but do not guarantee availability.</li>
              <li>Maintenance, upgrades, or outages may temporarily limit access.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Termination</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Vidya-Samveda reserves the right to suspend or terminate accounts that violate these Terms.</li>
              <li>Users may request account deletion at any time.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>We are not responsible for any indirect losses, missed opportunities, or damages due to platform use.</li>
              <li>The platform is provided "as is" without warranties of accuracy, reliability, or availability.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Third-Party Services</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>Some services or resources may link to third-party websites.</li>
              <li>We do not control or endorse third-party content and are not liable for their practices.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to the Terms</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>These Terms may be updated periodically.</li>
              <li>Users will be notified of significant changes, and continued use indicates acceptance.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-800">
              <li>These Terms are governed by the laws of India.</li>
              <li>Disputes shall be resolved in the courts of Bengaluru, India.</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
            <p className="text-gray-800 mb-3">For any questions or concerns about these Terms, reach out to:</p>
            <p className="text-gray-800">📧 legal@vidyasamveda.com</p>
            <p className="text-gray-800">📞 +91 80-XXXX-XXXX</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
