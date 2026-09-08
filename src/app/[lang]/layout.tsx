import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import "../globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { getSession } from "@/lib/auth";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansEthiopic = Noto_Sans_Ethiopic({ 
  subsets: ["ethiopic"],
  variable: "--font-noto-ethiopic"
});

export const metadata: Metadata = {
  title: "EECS - Ethiopian Enterprise Cyber Secure",
  description: "Cybersecurity training platform for Ethiopian enterprises.",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "am" }];
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const session = await getSession();

  return (
    <html lang={params.lang} className={`${inter.variable} ${notoSansEthiopic.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={session}>
            {props.children}
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
