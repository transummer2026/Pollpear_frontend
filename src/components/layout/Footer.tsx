import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="border-t mt-10 py-6 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          PollPear © {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link to="/legal" className="hover:underline">
            Legal
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/faq" className="hover:underline">
            FAQ
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
