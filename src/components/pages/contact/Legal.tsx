import Layout from "@/layout/Layout";

const SUPPORT_EMAIL = "info@pollpear.com";
const LAST_UPDATED = "August 19, 2026";

type Section = {
  title: string;
  paragraphs: string[];
};

const SECTIONS: Section[] = [
  {
    title: "About PollPear",
    paragraphs: [
      "PollPear (pollpear.com) is developed and operated from Switzerland. This notice explains the terms under which the site and app may be used, and who to contact about them.",
    ],
  },
  {
    title: "Acceptance of these terms",
    paragraphs: [
      "By creating an account or otherwise using PollPear, you agree to this legal notice and to our Privacy Policy. If you do not agree, please do not use the service.",
    ],
  },
  {
    title: "Using the service",
    paragraphs: [
      "You are responsible for the accuracy of the information you provide and for keeping your account credentials confidential. You must not use PollPear to harass others, post unlawful content, or attempt to disrupt or gain unauthorized access to the service.",
      "PollPear may suspend or remove content or accounts that violate these terms.",
    ],
  },
  {
    title: "Content you submit",
    paragraphs: [
      "Polls, votes, messages, and other content you submit remain yours. By posting content, you grant PollPear the license needed to store, display, and operate on it as part of providing the service to you and, where relevant, the people you share it with.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      "The PollPear name, logo, and the site's underlying design and code are the property of PollPear or its licensors and may not be reused without permission.",
    ],
  },
  {
    title: "Availability and liability",
    paragraphs: [
      'PollPear is provided on an "as is" and "as available" basis, without warranty of any kind. Features may change, and the service may occasionally be unavailable, including during maintenance. To the extent permitted by law, PollPear is not liable for indirect or consequential damages arising from use of the service.',
    ],
  },
  {
    title: "Governing law and jurisdiction",
    paragraphs: [
      "This notice and your use of PollPear are governed by the laws of Switzerland. Any dispute shall be submitted to the competent courts at PollPear's registered seat in Switzerland, subject to any mandatory consumer-protection rules that apply in your place of residence.",
    ],
  },
  {
    title: "Changes to this notice",
    paragraphs: [
      "We may update this notice from time to time. Significant changes will be reflected by the date below.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [
      `For any question about this notice, contact us at ${SUPPORT_EMAIL}.`,
    ],
  },
];

export default function Legal() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-heading text-2xl font-medium">Legal notice</h1>
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
