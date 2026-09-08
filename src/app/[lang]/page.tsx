import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { ThemeToggle } from "@/components/theme-toggle";
import { LoginForm } from "@/components/login-form";

export default async function IndexPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as "en" | "am";
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 relative">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <div className="max-w-sm w-full">
        <div className="mb-8 flex justify-center">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">E</span>
          </div>
        </div>
        <h1 className="text-xl font-medium text-foreground mb-1 text-center font-sans tracking-tight">
          Welcome to EECS
        </h1>
        <p className="text-muted-foreground text-sm mb-8 text-center">Sign in to your account</p>
        
        <LoginForm lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
