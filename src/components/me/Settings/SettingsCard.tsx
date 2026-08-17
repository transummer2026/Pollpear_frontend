import { useState } from "react";
import { Link } from "react-router";
import { Bell, User, Lock, RefreshCw, LifeBuoy, KeyRound } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LanguageSection from "@/components/me/Settings/Section/LanguageSection";

import PasswordSection from "@/components/me/Settings/Section/PasswordSection";
import SyncSection from "@/components/me/Settings/Section/SyncSection";
import InformationSection from "@/components/me/Settings/Section/InformationSection";
import NotificationSection from "@/components/me/Settings/Section/NotificationsSection";
import DarkModeSection from "@/components/me/Settings/Section/DarkModeSection";

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
];

export default function SettingsCard() {
  const [activeSection, setActiveSection] = useState("notifications");
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
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <Button
                  key={section.id}
                  variant={activeSection === section.id ? "secondary" : "ghost"}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon size={18} />
                  {section.label}
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
