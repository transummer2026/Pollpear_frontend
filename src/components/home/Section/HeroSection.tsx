import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/components/home/Section/brand";

export default function HeroSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl text-center space-y-6">
        <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
          Ask anything.{" "}
          <span className={BRAND.greenText}>Decide together.</span>
        </h1>

        <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
          PollPear turns a simple question into a decision. Post a poll to the
          public feed and watch the whole platform answer, or open a private
          room and invite your friends, your family or your team to settle it
          between you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className={BRAND.primaryButton}>
            <Link to="/auth/register">
              Create your account
              <ArrowRight size={16} />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link to="/auth/login">Sign in</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Free to use — a poll takes about thirty seconds to set up.
        </p>
      </div>
    </section>
  );
}
