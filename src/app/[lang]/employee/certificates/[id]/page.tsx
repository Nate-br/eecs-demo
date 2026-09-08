import { getSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Shield, Award, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function CertificatePage(props: { params: Promise<{ id: string, lang: string }> }) {
  const params = await props.params;
  const session = await getSession();
  
  if (!session) {
    return <div>Not authenticated</div>;
  }

  const user = await db.user.findUnique({ where: { email: session.userId } }); // session.userId is actually email right now due to early mock
  // Or we just fetch all and find by ID. Actually in auth.ts createSession uses user.id!
  
  // Let's just find the user by ID
  const allUsers = await db.user.findMany();
  const actualUser = allUsers.find((u: any) => u.id === (session.userId as string));

  const allModules = await db.module.findMany();
  const module = allModules.find((m: any) => m.id.toString() === params.id);

  if (!module || !actualUser) {
    return <div>Invalid Certificate</div>;
  }

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8 w-full max-w-4xl flex justify-between items-center">
        <Link href={`/${params.lang}/employee/dashboard`}>
          <Button variant="outline">← Back to Dashboard</Button>
        </Link>
        <Button onClick={() => console.log("Print triggered in browser")}>
          Print Certificate
        </Button>
      </div>

      {/* Certificate Card */}
      <div className="w-full max-w-4xl bg-white border-[12px] border-slate-900 p-2 shadow-2xl relative">
        <div className="border-[4px] border-slate-200 p-12 text-center flex flex-col items-center relative overflow-hidden">
          
          {/* Watermark */}
          <Shield className="absolute inset-0 w-full h-full text-slate-50 opacity-5 -z-0" />

          <div className="z-10 w-full flex flex-col items-center">
            <Shield className="w-16 h-16 text-slate-900 mb-6" />
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-2 uppercase">
              Certificate of Completion
            </h1>
            <p className="text-slate-500 uppercase tracking-widest text-sm font-semibold mb-12">
              Ethiopian Enterprise Cyber Secure
            </p>

            <p className="text-lg text-slate-600 italic mb-4">This is to certify that</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 border-b-2 border-slate-200 pb-2 mb-8 inline-block px-12">
              {actualUser.name}
            </h2>

            <p className="text-lg text-slate-600 italic mb-4">has successfully completed the module</p>
            <h3 className="text-2xl font-bold text-blue-600 mb-12">
              {params.lang === "am" ? module.titleAm : module.titleEn}
            </h3>

            <div className="flex w-full justify-between items-end mt-12 px-8">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-700 font-medium">{today}</span>
                </div>
                <div className="h-px w-48 bg-slate-300 mb-2"></div>
                <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Date of Issue</span>
              </div>

              <div className="flex flex-col items-center">
                <Award className="w-16 h-16 text-amber-500 mb-4" />
                <div className="h-px w-48 bg-slate-300 mb-2"></div>
                <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">EECS Platform Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 text-sm">Certificate ID: {(session.userId as string).split('-')[0]}-{params.id}-{Date.now().toString().slice(-6)}</p>
    </div>
  );
}
