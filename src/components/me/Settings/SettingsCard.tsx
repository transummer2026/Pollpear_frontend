import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  Bell,
  User,
  Lock,
  RefreshCw,
  LifeBuoy,
  KeyRound,
  Trash2,
  Ban,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LanguageSection from "@/components/me/Settings/Section/LanguageSection";

import PasswordSection from "@/components/me/Settings/Section/PasswordSection";
import SyncSection from "@/components/me/Settings/Section/SyncSection";
import InformationSection from "@/components/me/Settings/Section/InformationSection";
import NotificationSection from "@/components/me/Settings/Section/NotificationsSection";
import DarkModeSection from "@/components/me/Settings/Section/DarkModeSection";
import DeleteAccountSection from "@/components/me/Settings/Section/DeleteAccountSection";
import BlocksSection from "@/components/me/Settings/Section/BlocksSection";

const sections = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "information",
    label: "Informations",
    icon: User,
  },
  {
    id: "password",
    label: "Password",
    icon: Lock,
  },
  {
    id: "sync",
    label: "Sync Profile",
    icon: RefreshCw,
  },
  {
    id: "blocks",
    label: "Blocked users",
    icon: Ban,
  },
  {
    id: "danger",
    label: "Delete account",
    icon: Trash2,
  },
];

export default function SettingsCard() {
  const { section } = useParams<{ section?: string }>();
  const navigate = useNavigate();
  const activeSection = sections.some((s) => s.id === section)
    ? (section as string)
    : "notifications";
  const [language, setLanguage] = useState("en");

  return (
    <Card className="max-w-5xl mx-auto mt-4">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <div className="grid md:grid-cols-[240px_1fr]">
          <div className="border-r p-4 space-y-2">
            {sections.map((s) => {
              const Icon = s.icon;

              return (
                <Button
                  key={s.id}
                  variant={activeSection === s.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => navigate(`/settings/${s.id}`)}
                >
                  <Icon size={18} />
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
                <LifeBuoy size={18} />
                Support
              </a>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link to="/settings/api">
                <KeyRound size={18} />
                API
              </Link>
            </Button>
          </div>

          <div className="p-6">
            {activeSection === "notifications" && <NotificationSection />}

            {activeSection === "information" && <InformationSection />}

            {activeSection === "password" && <PasswordSection />}

            {activeSection === "sync" && <SyncSection />}

            {activeSection === "blocks" && <BlocksSection />}

            {activeSection === "danger" && <DeleteAccountSection />}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
