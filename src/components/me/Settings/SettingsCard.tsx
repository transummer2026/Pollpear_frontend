import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { User, LifeBuoy, KeyRound } from "lucide-react";
import {
  BlockedIcon,
  LockedIcon,
  OpenTrashIcon,
  TrashIcon,
  UnlockedIcon,
} from "@/components/icons";
import { HoverIcon } from "@/components/icons/HoverIcon";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LanguageSection from "@/components/me/Settings/Section/LanguageSection";

import PasswordSection from "@/components/me/Settings/Section/PasswordSection";
import InformationSection from "@/components/me/Settings/Section/InformationSection";
import DarkModeSection from "@/components/me/Settings/Section/DarkModeSection";
import DeleteAccountSection from "@/components/me/Settings/Section/DeleteAccountSection";
import BlocksSection from "@/components/me/Settings/Section/BlocksSection";

/**
 * The nav icons carry a size- class so Button leaves them at their own size.
 * The drawn icons sit smaller inside their viewBox than lucide's, so they need
 * a bigger box to look the same weight.
 */
const ICON_SIZE = "size-5";
const CUSTOM_ICON_SIZE = "size-6";

const sections = [
  {
    id: "information",
    label: "Informations",
    icon: User,
  },
  {
    id: "password",
    label: "Password",
    icon: LockedIcon,
    hoverIcon: UnlockedIcon,
    custom: true,
  },
  {
    id: "blocks",
    label: "Blocked users",
    icon: BlockedIcon,
    custom: true,
  },
  {
    id: "danger",
    label: "Delete account",
    icon: TrashIcon,
    hoverIcon: OpenTrashIcon,
    custom: true,
  },
];

export default function SettingsCard() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const activeSection = sections.some((s) => s.id === section)
    ? (section as string)
    : "information";
  const [language, setLanguage] = useState("en");

  return (
    <Card className="max-w-5xl mx-auto mt-4 ring-0">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="border-r p-4 space-y-2">
            {sections.map((s) => {
              const Icon = s.icon;
              const iconSize = s.custom ? CUSTOM_ICON_SIZE : ICON_SIZE;

              return (
                <Button
                  key={s.id}
                  variant={activeSection === s.id ? "secondary" : "ghost"}
                  className="group w-full justify-start gap-2"
                  onClick={() => navigate(`/settings/${s.id}`)}
                >
                  {s.hoverIcon ? (
                    <HoverIcon
                      idle={Icon}
                      hover={s.hoverIcon}
                      className={iconSize}
                    />
                  ) : (
                    <Icon className={iconSize} />
                  )}
                  {s.label}
                </Button>
              );
            })}

            <Separator className="my-4" />
            <DarkModeSection />
            <Separator className="my-4" />
            <LanguageSection value={language} onChange={setLanguage} />
            <Separator className="my-4" />
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <a href="/contact">
                <LifeBuoy className={ICON_SIZE} />
                Support
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link to="/settings/api">
                <KeyRound className={ICON_SIZE} />
                API
              </Link>
            </Button>
          </div>

          <div className="p-6">
            {activeSection === "information" && <InformationSection />}

            {activeSection === "password" && <PasswordSection />}

            {activeSection === "blocks" && <BlocksSection />}

            {activeSection === "danger" && <DeleteAccountSection />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
