import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

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

        <div className='font-sans'>
          {/* Scrollable Content Area */}
          <div className='text-sm max-h-96 overflow-y-auto border rounded-md p-4 '>
            <h4 className='text-lg font-semibold mt-5 mb-2'>
              1. Acceptance of Terms
            </h4>
            <p className='leading-relaxed mb-3'>
              By creating an account and using the services provided by [Your
              Company Name] ("we," "us," "our"), you acknowledge that you have
              read, understood, and agree to be bound by these Terms and
              Conditions, as well as our Privacy Policy. These terms apply to
              all visitors, users, and others who wish to access or use the
              service.
            </p>

            <h4 className='text-lg font-semibold mt-5 mb-2'>
              2. User Accounts and Responsibilities
            </h4>
            <p className='leading-relaxed mb-3'>
              <strong>Account Creation:</strong> You must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our service.
            </p>
            <p className='leading-relaxed mb-3'>
              <strong>Account Security:</strong> You are responsible for
              safeguarding the password that you use to access the service and
              for any activities or actions under your password. You agree not
              to disclose your password to any third party. You must notify us
              immediately upon becoming aware of any breach of security or
              unauthorized use of your account.
            </p>
            <p className='leading-relaxed mb-3'>
              <strong>Age Requirement:</strong> You must be at least 18 years
              old to use this service.
            </p>

            <h4 className='text-lg font-semibold mt-5 mb-2'>
              3. Prohibited Activities
            </h4>
            <p className='leading-relaxed mb-3'>
              You agree not to use the service for any purpose that is illegal
              or prohibited by these terms. Prohibited activities include, but
              are not limited to:
            </p>
            <ul className='list-disc list-inside space-y-1 mb-3'>
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

            <h4 className='text-lg font-semibold mt-5 mb-2'>4. Termination</h4>
            <p className='leading-relaxed mb-3'>
              We may terminate or suspend your account immediately, without
              prior notice or liability, for any reason whatsoever, including
              without limitation if you breach the Terms. Upon termination, your
              right to use the service will immediately cease.
            </p>

            <h4 className='text-lg font-semibold mt-5 mb-2'>
              5. Disclaimers and Limitation of Liability
            </h4>
            <p className='leading-relaxed mb-3'>
              The service is provided on an "AS IS" and "AS AVAILABLE" basis. We
              do not warrant that the service will be uninterrupted, secure, or
              error-free. In no event shall [Your Company Name], nor its
              directors, employees, or partners, be liable for any indirect,
              incidental, special, consequential, or punitive damages arising
              out of your use of the service.
            </p>

            <h4 className='text-lg font-semibold mt-5 mb-2'>
              6. Governing Law
            </h4>
            <p className='leading-relaxed mb-3'>
              These Terms shall be governed and construed in accordance with the
              laws of <strong>Ethiopia</strong>, without regard to its conflict
              of law provisions. Any disputes arising from these terms will be
              resolved in the competent courts of Adama, Oromia, or as otherwise
              mandated by law.
            </p>

            <h4 className='text-lg font-semibold mt-5 mb-2'>
              7. Changes to Terms
            </h4>
            <p className='leading-relaxed mb-3'>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. We will provide at least 30 days' notice
              before any new terms take effect. By continuing to access or use
              our service after those revisions become effective, you agree to
              be bound by the revised terms.
            </p>

            <p className='italic text-xs mt-8'>Last Updated: June 18, 2025</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;
