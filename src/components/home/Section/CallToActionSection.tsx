import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/components/home/Section/brand";

export default function CallToActionSection() {
  return (
    <section className={`px-6 py-16 ${BRAND.sectionBorder}`}>
      <div className="mx-auto max-w-3xl text-center space-y-4">
        <h2
          className={`font-heading text-2xl md:text-3xl font-bold ${BRAND.greenText}`}
        >
          What are you going to ask first?
        </h2>
        <p className="text-muted-foreground">
          Create an account, open your first room, and stop deciding by group
          chat.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className={BRAND.primaryButton}>
            <Link to="/auth/register">
              Get started
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
