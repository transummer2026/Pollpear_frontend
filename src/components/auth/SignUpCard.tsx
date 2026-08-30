import { Button } from "@/components/ui/button";
import { Link } from "react-router";

/** the register half of AuthSlider: the full form lives on /auth/register */
export default function SignUpCard() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <h2 className="text-2xl font-semibold">New here ?</h2>
      <p className="text-sm text-muted-foreground">
        Join us, create polls and share with your pears
      </p>

      <Button
        asChild
        className="w-full bg-[#885053] text-[#FFE0E0] hover:bg-[#885053]/80"
      >
        <Link to="/auth/register">Sign Up</Link>
      </Button>
    </div>
  );
}
