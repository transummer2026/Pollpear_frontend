import Layout from "@/layout/Layout";

const SUPPORT_EMAIL = "info@pollpear.com";
const LAST_UPDATED = "August 19, 2026";

type Section = {
  title: string;
  paragraphs: string[];
};

const SECTIONS: Section[] = [
  {
    title: "Scope",
    paragraphs: [
      "This policy explains what personal data PollPear collects, why, and what rights you have over it. PollPear is based in Switzerland and processes personal data in accordance with the Swiss Federal Act on Data Protection (FADP), in force since September 1, 2023. Where the GDPR applies to you (for example if you are located in the EU/EEA), we apply the same standard of protection.",
    ],
  },
  {
    title: "Data controller",
    paragraphs: [
      `PollPear is the controller of the personal data described in this policy. You can reach us at ${SUPPORT_EMAIL} for any data protection question.`,
    ],
  },
  {
    title: "Data we collect",
    paragraphs: [
      "Account data: the email address, username, and password (stored hashed, never in plain text) you provide when you register, plus an optional avatar and profile information.",
      "Content data: the polls, votes, rooms, and friend connections you create or take part in.",
      "Technical data: a session cookie used to keep you signed in, and basic request logs (such as timestamps and error data) used to operate and secure the service.",
    ],
  },
  {
    title: "Why we process it",
    paragraphs: [
      "To create and operate your account, let you build and answer polls, and connect with friends and rooms.",
      "To keep the service secure, prevent abuse, and diagnose issues.",
      "We do not sell your personal data, and we do not use it for third-party advertising.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "PollPear uses a single essential session cookie to keep you signed in. It is required for the service to work and is not used for tracking or advertising.",
    ],
  },
  {
    title: "Sharing your data",
    paragraphs: [
      "We share personal data only with the hosting and infrastructure providers that run PollPear on our behalf, under the instructions and safeguards required by Swiss and, where applicable, EU data protection law. We do not otherwise disclose your personal data to third parties except where required by law.",
    ],
  },
  {
    title: "Data retention",
    paragraphs: [
      `We keep your account and content data for as long as your account is active, and we continue to keep it as-is after your account is deleted. If you would like your personal data anonymized, you can request this at any time by emailing us at ${SUPPORT_EMAIL}.`,
    ],
  },
  {
    title: "Your rights",
    paragraphs: [
      "Under the FADP (and the GDPR where it applies to you), you may request access to, correction of, or anonymization of your personal data, object to or restrict certain processing, and request a copy of your data in a portable format. To exercise any of these rights, contact us at " +
        SUPPORT_EMAIL +
        ".",
      "If you believe your data protection rights have not been respected, you may lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC) in Switzerland, or with your local supervisory authority if the GDPR applies to you.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We apply reasonable technical and organizational measures — such as password hashing and access controls — to protect your data. No system is completely secure, but we work to keep these measures up to date.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy as PollPear evolves. Material changes will be reflected by the date below.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `For any privacy question or request, contact us at ${SUPPORT_EMAIL}.`,
    ],
  },
];

export default function Privacy() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-2xl font-medium">Privacy policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-8 space-y-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="font-heading text-lg font-medium">
                {section.title}
              </h2>
              <div className="mt-2 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
}
