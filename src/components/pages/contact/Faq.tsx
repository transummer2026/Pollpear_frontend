import { Link } from "react-router";

import Layout from "@/layout/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FaqEntry = {
  question: string;
  answer: React.ReactNode;
};

const FAQS: FaqEntry[] = [
  {
    question: "What is PollPear?",
    answer:
      "PollPear is a place to create polls, share them in rooms with friends, and see the results come in live.",
  },
  {
    question: "Is PollPear free to use?",
    answer: "Yes, creating an account and using PollPear is free.",
  },
  {
    question: "What kinds of polls can I create?",
    answer: "You can create single-choice polls and scale (rating) polls.",
  },
  {
    question: "What are rooms?",
    answer:
      "Rooms are shared spaces where you and the people you invite can post and answer polls together.",
  },
  {
    question: "How do I add friends?",
    answer:
      "Search for their username from your profile and send a friend request. Once accepted, you can invite each other to rooms and see each other's activity.",
  },
  {
    question: "Is my data safe?",
    answer: (
      <>
        We only collect what's needed to run the service and never sell your
        data. See our <Link to="/privacy">Privacy policy</Link> for the full
        details.
      </>
    ),
  },
  {
    question: "How do I delete my account?",
    answer: (
      <>
        You can delete your account from your account settings. Your data is
        kept as-is after deletion; if you'd like it anonymized instead, email us
        at info@pollpear.com. If you run into an issue, reach out through our{" "}
        <Link to="/contact">Contact page</Link>.
      </>
    ),
  },
  {
    question: "I found a bug or have feedback — what do I do?",
    answer: (
      <>
        We'd love to hear about it. Get in touch through our{" "}
        <Link to="/contact">Contact page</Link>.
      </>
    ),
  },
];

export default function Faq() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-heading text-2xl font-medium">
          Frequently asked questions
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Can't find what you're looking for?{" "}
          <Link to="/contact" className="underline underline-offset-4">
            Contact us
          </Link>
          .
        </p>

        <Accordion type="single" collapsible className="mt-8">
          {FAQS.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
