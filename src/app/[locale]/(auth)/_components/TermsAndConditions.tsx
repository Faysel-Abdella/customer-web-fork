import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TermsAndConditionsProps {
  className?: string;
  children: React.ReactNode;
}
const TermsAndConditions = ({
  children,
  className,
}: TermsAndConditionsProps) => {
  return (
    <Dialog>
      <DialogTrigger className={className}>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>
            Your use of this service is subject to the following Terms and
            Conditions
          </DialogDescription>
        </DialogHeader>

        <div className="font-sans">
          {/* Scrollable Content Area */}
          <div className="max-h-96 overflow-y-auto rounded-md border p-4 text-sm">
            <h4 className="mt-5 mb-2 text-lg font-semibold">
              1. Acceptance of Terms
            </h4>
            <p className="mb-3 leading-relaxed">
              By creating an account and using the services provided by [Time
              delivery] (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;), you
              acknowledge that you have read, understood, and agree to be bound
              by these Terms and Conditions, as well as our Privacy Policy.
              These terms apply to all visitors, users, and others who wish to
              access or use the service.
            </p>

            <h4 className="mt-5 mb-2 text-lg font-semibold">
              2. User Accounts and Responsibilities
            </h4>
            <p className="mb-3 leading-relaxed">
              <strong>Account Creation:</strong> You must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our service.
            </p>
            <p className="mb-3 leading-relaxed">
              <strong>Account Security:</strong> You are responsible for
              safeguarding the password that you use to access the service and
              for any activities or actions under your password. You agree not
              to disclose your password to any third party. You must notify us
              immediately upon becoming aware of any breach of security or
              unauthorized use of your account.
            </p>
            <p className="mb-3 leading-relaxed">
              <strong>Age Requirement:</strong> You must be at least 18 years
              old to use this service.
            </p>

            <h4 className="mt-5 mb-2 text-lg font-semibold">
              3. Prohibited Activities
            </h4>
            <p className="mb-3 leading-relaxed">
              You agree not to use the service for any purpose that is illegal
              or prohibited by these terms. Prohibited activities include, but
              are not limited to:
            </p>
            <ul className="mb-3 list-inside list-disc space-y-1">
              <li>
                Engaging in any fraudulent activity, including scams or
                phishing.
              </li>
              <li>
                Uploading or transmitting viruses, malware, or any other
                malicious code.
              </li>
              <li>Infringing on the intellectual property rights of others.</li>
              <li>Harassing, abusing, or harming another person.</li>
            </ul>

            <h4 className="mt-5 mb-2 text-lg font-semibold">4. Termination</h4>
            <p className="mb-3 leading-relaxed">
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms. Upon termination, your
              right to use the service will immediately cease.
            </p>

            <h4 className="mt-5 mb-2 text-lg font-semibold">
              5. Disclaimers and Limitation of Liability
            </h4>
            <p className="mb-3 leading-relaxed">
              The service is provided on an &quot;AS IS&quot; and &quot;AS
              AVAILABLE&quot; basis. We do not warrant that the service will be
              uninterrupted, secure, or error-free. In no event shall [Your
              Company Name], nor its directors, employees, or partners, be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising out of your use of the service.
            </p>

            <h4 className="mt-5 mb-2 text-lg font-semibold">
              6. Governing Law
            </h4>
            <p className="mb-3 leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of <strong>Ethiopia</strong>, without regard to its conflict
              of law provisions. Any disputes arising from these terms will be
              resolved in the competent courts of Adama, Oromia, or as otherwise
              mandated by law.
            </p>

            <h4 className="mt-5 mb-2 text-lg font-semibold">
              7. Changes to Terms
            </h4>
            <p className="mb-3 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide at least 30 days&apos;
              notice before any new terms take effect. By continuing to access
              or use our service after those revisions become effective, you
              agree to be bound by the revised terms.
            </p>

            <p className="mt-8 text-xs italic">Last Updated: June 18, 2025</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
