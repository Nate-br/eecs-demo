import { getDictionary } from "@/lib/dictionaries";
import { AdminDashboardView } from "./AdminDashboardView";
import { db } from "@/lib/db";

export default async function AdminDashboardPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as "en" | "am";
  const dictionary = await getDictionary(lang);
  
  const allModules = await db.module.findMany();
  const phishingEvents = await db.phishingEvent.findMany();

  return <AdminDashboardView dictionary={dictionary} lang={lang} allModules={allModules} phishingEvents={phishingEvents} />;
}
