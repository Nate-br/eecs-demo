import { ReactNode } from "react";

// This layout removes the sidebar and normal enterprise wrapper 
// so the phishing page can look like a totally standalone site (e.g. Microsoft)
export default function PhishingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 w-full flex items-center justify-center">
      {children}
    </div>
  );
}
