/* Brand palette, kept local to the landing page so it never fights the theme tokens.
   Greens carry the public side, the warm pair marks everything private. */
export const BRAND = {
  primaryButton:
    "bg-[#325024] text-[#D4E7CB] hover:bg-[#3A4336] focus-visible:ring-[#6F8459]",
  sectionBorder: "border-t border-[#D4E7CB] dark:border-[#3A4336]",
  softBorder: "border-[#D4E7CB] dark:border-[#3A4336]",
  greenText: "text-[#325024] dark:text-[#D4E7CB]",
  sageText: "text-[#6F8459]",
  wineText: "text-[#885053] dark:text-[#F67373]",
  openBadge: "bg-[#325024] text-[#D4E7CB] border-transparent",
  closedBadge: "bg-[#885053] text-[#FFE0E0] border-transparent",
  greenBadge: "bg-[#D4E7CB] text-[#325024] border-transparent",
  warmBadge: "bg-[#FFE0E0] text-[#885053] border-transparent",
  hashtagBadge: "border-[#6F8459]/60 text-[#6F8459]",
} as const;
