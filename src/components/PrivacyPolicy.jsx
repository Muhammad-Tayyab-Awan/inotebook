import { useEffect } from "react";

function PrivacyPolicy(props) {
  useEffect(() => {
    props.setProgress(100);
    document.title = "iNotebook - Privacy Policy";
  }, []);
  return (
    <div className="min-h-[calc(100vh-9.5rem)] dark:bg-[#776e6e] bg-yellow-500 pt-16 pb-10">
      <div className="mx-auto w-[75%] text-[#111827] dark:text-white py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">
          Privacy Policy for iNotebook
        </h1>
        <p className="text-gray-600 dark:text-white mb-4">
          Effective Date: 30<sup>th</sup> September, 2024
        </p>
        <p className="mb-4">
          At iNotebook, your privacy is of utmost importance to us. This Privacy
          Policy outlines how we collect, use, and protect your information when
          you use our services.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          We collect personal information when you create an account, including
          your name, email address, and any notes you choose to store.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">We use the information we collect to:</p>
        <ul className="list-disc ml-8 mb-4">
          <li>Provide and maintain our services</li>
          <li>Notify you about changes to our services</li>
          <li>Allow you to participate in interactive features</li>
          <li>Provide customer support</li>
          <li>
            Gather analysis or valuable information so that we can improve our
            services
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-4 mb-2">3. Data Security</h2>
        <p className="mb-4">
          We implement a variety of security measures to maintain the safety of
          your personal information. Your data is stored securely, and we take
          precautions to protect it from unauthorized access.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">4. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal
          information at any time. You can also request that we restrict the
          processing of your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">
          5. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mt-4 mb-2">6. Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <p className="text-blue-200">
          Email:
          <a href="mailto:tayyabpasha1918@gmail.com">
            tayyabpasha1918@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
