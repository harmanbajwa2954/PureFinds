import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | PureFinds",
  description:
    "Learn how PureFinds collects, uses, and protects your personal information.",
};

const sections = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use", title: "How We Use Your Information" },
  { id: "affiliate-disclosure", title: "Affiliate Disclosure" },
  { id: "cookies", title: "Cookies & Tracking" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "data-security", title: "Data Security" },
  { id: "your-rights", title: "Your Rights" },
  { id: "children", title: "Children's Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="relative bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800 pt-10 pb-8 sm:pt-14 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors">
        {/* Background gradient — same style as home page */}
        <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/40" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Last updated: June 6, 2025
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex gap-10 lg:gap-16">
          {/* Sidebar — desktop only */}
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="sticky top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                On this page
              </p>
              <ul className="space-y-1.5 text-sm border-l-2 border-gray-200 dark:border-gray-700">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="block pl-4 py-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-l-blue-600 transition-colors -ml-[2px] border-l-2 border-transparent hover:border-blue-600"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main prose */}
          <article className="min-w-0 max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 p-6 sm:p-10 transition-colors">
              {/* Intro */}
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                At <strong>PureFinds</strong>, your privacy matters. This
                Privacy Policy explains how we collect, use, and safeguard your
                information when you visit our website. By using PureFinds, you
                agree to the practices described below.
              </p>

              {/* Sections */}
              <section id="information-we-collect" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  1. Information We Collect
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 ml-2">
                  <li>
                    <strong>Personal Information:</strong> Name and email
                    address when you submit our contact or inquiry form.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Pages visited, time spent on
                    the site, referral source, browser type, and device
                    information — collected automatically via analytics tools.
                  </li>
                  <li>
                    <strong>Cookies:</strong> Small text files stored on your
                    device to enhance your browsing experience.
                  </li>
                </ul>
              </section>

              <section id="how-we-use" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  2. How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 ml-2">
                  <li>To respond to your inquiries and contact submissions.</li>
                  <li>
                    To improve our website content, layout, and product
                    recommendations.
                  </li>
                  <li>
                    To analyse usage patterns and optimise site performance.
                  </li>
                  <li>
                    To send occasional updates or communications, only if you
                    have opted in.
                  </li>
                </ul>
              </section>

              <section id="affiliate-disclosure" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  3. Affiliate Disclosure
                </h2>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-xl p-4 text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                  PureFinds is a participant in affiliate programmes, including
                  the <strong>Amazon Associates Programme</strong>. This means
                  we may earn a small commission when you click on product links
                  and make a purchase — at no extra cost to you. These
                  commissions help us keep the site running and continue
                  curating products for you.
                </div>
              </section>

              <section id="cookies" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  4. Cookies &amp; Tracking
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  We use cookies to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 ml-2">
                  <li>
                    Remember your preferences (e.g., dark mode, theme
                    selection).
                  </li>
                  <li>Understand how visitors interact with our site.</li>
                  <li>
                    Support affiliate link tracking through third-party
                    programmes.
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                  You can disable cookies in your browser settings at any time,
                  although this may affect certain site features.
                </p>
              </section>

              <section id="third-party" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  5. Third-Party Services
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  We may use third-party services for analytics, hosting, and
                  affiliate tracking. These services have their own privacy
                  policies and may collect information as described in their
                  respective terms. Key third-party services include:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 ml-2">
                  <li>Amazon Associates (affiliate programme)</li>
                  <li>Vercel (hosting)</li>
                  <li>MongoDB Atlas (database)</li>
                </ul>
              </section>

              <section id="data-security" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  6. Data Security
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We implement reasonable security measures to protect your
                  personal information from unauthorised access, alteration,
                  disclosure, or destruction. However, no method of
                  transmission over the Internet or electronic storage is
                  100&nbsp;% secure. We cannot guarantee absolute security.
                </p>
              </section>

              <section id="your-rights" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  7. Your Rights
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                  Depending on your jurisdiction, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-1.5 text-gray-600 dark:text-gray-300 ml-2">
                  <li>
                    Access, correct, or delete your personal information.
                  </li>
                  <li>
                    Opt out of marketing communications at any time.
                  </li>
                  <li>
                    Request a copy of the data we hold about you.
                  </li>
                  <li>
                    Withdraw consent where processing is based on consent.
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-3">
                  To exercise any of these rights, please contact us using the
                  details below.
                </p>
              </section>

              <section id="children" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  8. Children&apos;s Privacy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  PureFinds is not directed at children under the age of 13. We
                  do not knowingly collect personal information from children.
                  If you believe a child has provided us with personal data,
                  please contact us so we can promptly remove it.
                </p>
              </section>

              <section id="changes" className="mb-10 scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  9. Changes to This Policy
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any
                  changes will be posted on this page with an updated
                  &ldquo;Last updated&rdquo; date. We encourage you to review
                  this policy periodically.
                </p>
              </section>

              <section id="contact" className="scroll-mt-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  10. Contact Us
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  If you have any questions or concerns about this Privacy
                  Policy, please reach out to us through the contact form on
                  our website or email us at{" "}
                  <a
                    href="mailto:contact@purefinds.com"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    contact@purefinds.com
                  </a>
                  .
                </p>
              </section>
            </div>

            {/* Back link at bottom */}
            <div className="mt-8 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Back to Home
              </Link>
            </div>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} PureFinds. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
