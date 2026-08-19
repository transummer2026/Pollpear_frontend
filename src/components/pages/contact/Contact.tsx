import { Mail, MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router";

import Layout from "@/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SUPPORT_EMAIL = "info@pollpear.com";

export default function Contact() {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="font-heading text-2xl font-medium">Contact us</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Questions, feedback, or an issue with your account? We're happy to
          help.
        </p>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail size={18} />
              Email us
            </CardTitle>
            <CardDescription>
              We aim to reply within 2 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm font-medium underline underline-offset-4"
            >
              {SUPPORT_EMAIL}
            </a>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircleQuestion size={18} />
              Common questions
            </CardTitle>
            <CardDescription>
              Check the FAQ first — your question might already be answered
              there.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to="/faq"
              className="text-sm font-medium underline underline-offset-4"
            >
              Visit the FAQ
            </Link>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
