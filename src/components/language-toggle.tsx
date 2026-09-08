"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";

export function LanguageToggle({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "am" : "en";
    // Replace the language segment in the URL
    // e.g., /en/employee/dashboard -> /am/employee/dashboard
    const newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPathname);
  };

  return (
    <Button variant="outline" size="sm" onClick={toggleLanguage} className="font-sans">
      {currentLang === "en" ? "አማርኛ" : "English"}
    </Button>
  );
}
