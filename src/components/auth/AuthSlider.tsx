import { useState } from "react";
import LoginCard from "@/components/auth/LoginCard";
import SignUpCard from "@/components/auth/SignUpCard";
import { cn } from "@/lib/utils";

type AuthView = "login" | "register";

/* Flat colour blocks, no gradient: the sliding panel swaps hue with the view. */
const BLOCK_BG = {
  login: "bg-[#325024]",
  register: "bg-[#885053]",
} as const;

/* Both keyed to md: below it there is no block, the hero is a plain footer row. */
const BLOCK_TEXT = {
  login: "md:text-[#D4E7CB]",
  register: "md:text-[#FFE0E0]",
} as const;

/** ghost button on the block: hover fills with the text colour, inverted */
const BLOCK_BUTTON = {
  login: "md:border-[#D4E7CB] md:hover:bg-[#D4E7CB] md:hover:text-[#325024]",
  register: "md:border-[#FFE0E0] md:hover:bg-[#FFE0E0] md:hover:text-[#885053]",
} as const;

/**
 * Off the block the toggle carries the colour of the action it leads to, so it
 * matches the button waiting on the other side: sign up wine, login green.
 */
const HERO_ACTION = {
  login: "bg-[#885053] text-[#FFE0E0] hover:bg-[#885053]/80",
  register: "bg-[#325024] text-[#D4E7CB] hover:bg-[#325024]/80",
} as const;

const SLIDE = "md:transition-[translate] md:duration-[650ms] md:ease-in-out";

export default function AuthSlider() {
  const [activeView, setActiveView] = useState<AuthView>("login");

  const toggleView = () =>
    setActiveView(activeView === "login" ? "register" : "login");

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[720px] flex-col gap-4",
        // the slider only exists from md up, below it the two halves stack
        "md:relative md:block md:h-[560px] md:overflow-hidden md:rounded-3xl md:border-8 md:border-card md:bg-card md:shadow-2xl",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "hidden md:block md:absolute md:inset-y-0 md:left-0 md:z-20 md:w-1/2 md:rounded-2xl",
          "md:transition-[translate,background-color] md:duration-[650ms] md:ease-in-out",
          BLOCK_BG[activeView],
          activeView === "login" ? "md:translate-x-full" : "md:translate-x-0",
        )}
      />

      <HeroPanel
        view="register"
        activeView={activeView}
        title="Welcome back"
        text="Already have an account? Pick up where you left off."
        buttonText="LOGIN"
        onToggle={toggleView}
      />

      <Panel view="register" activeView={activeView}>
        <SignUpCard />
      </Panel>

      <HeroPanel
        view="login"
        activeView={activeView}
        title="New here ?"
        text="No account yet? Create one and start polling your pears."
        buttonText="SIGN UP"
        onToggle={toggleView}
      />

      <Panel view="login" activeView={activeView}>
        <LoginCard />
      </Panel>
    </div>
  );
}

type HeroPanelProps = {
  view: AuthView;
  activeView: AuthView;
  title: string;
  text: string;
  buttonText: string;
  onToggle: () => void;
};

/**
 * Sits on top of the colour block and rides with it. The block is always under
 * the active hero, so `register` starts on the left and `login` on the right.
 */
function HeroPanel({
  view,
  activeView,
  title,
  text,
  buttonText,
  onToggle,
}: HeroPanelProps) {
  const isActive = view === activeView;

  return (
    <div
      className={cn(
        // below md there is no colour block: the hero shrinks to a single prompt
        // row above the form, the toggle carrying the colour on its own
        "flex flex-row items-center justify-center gap-3 py-2 text-center text-muted-foreground",
        "md:flex-col md:gap-4 md:px-6 md:py-0",
        BLOCK_TEXT[view],
        "md:absolute md:inset-y-0 md:z-30 md:w-1/2",
        SLIDE,
        view === "login" ? "md:left-1/2" : "md:left-0",
        isActive && "md:translate-x-0",
        !isActive && "hidden md:flex",
        !isActive &&
          (view === "login" ? "md:translate-x-full" : "md:-translate-x-full"),
      )}
    >
      <h2 className="text-sm font-medium md:text-2xl md:font-semibold">
        {title}
      </h2>
      {/* the pitch only earns its space once the hero owns a full half */}
      <p className="hidden text-sm opacity-85 md:block">{text}</p>

      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "cursor-pointer rounded-4xl border border-transparent px-5 py-1.5 text-sm tracking-widest transition-colors",
          HERO_ACTION[view],
          // back on the block from md up, where the fill would fight the surface
          "md:bg-transparent md:px-10 md:py-3 md:text-inherit",
          BLOCK_BUTTON[view],
        )}
      >
        {buttonText}
      </button>
    </div>
  );
}

/**
 * The form half. Unlike the heroes, the two panels cross over the same side
 * rather than leaving the card, so the inactive one is hidden by paint order:
 * an opaque background plus the lower z-index. It stays mounted and covered,
 * hence `inert` to keep it out of the tab order.
 */
function Panel({
  view,
  activeView,
  children,
}: {
  view: AuthView;
  activeView: AuthView;
  children: React.ReactNode;
}) {
  const isActive = view === activeView;

  return (
    <div
      inert={!isActive}
      className={cn(
        "md:absolute md:inset-y-0 md:w-1/2 md:overflow-y-auto md:bg-card",
        SLIDE,
        view === "login" ? "md:left-0" : "md:left-1/2",
        // both stay under the colour block, which sits at z-20
        isActive ? "md:z-10 md:translate-x-0" : "md:z-0",
        !isActive && "hidden md:block",
        !isActive &&
          (view === "login" ? "md:translate-x-full" : "md:-translate-x-full"),
      )}
    >
      {children}
    </div>
  );
}
