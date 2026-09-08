import { getDictionary } from "@/lib/dictionaries";
import { EmployeeDashboardView } from "./EmployeeDashboardView";
import { db } from "@/lib/db";

export default async function EmployeeDashboardPage(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const lang = params.lang as "en" | "am";
  const dictionary = await getDictionary(lang);

  const allModules = await db.module.findMany();
  
  // Simulated progress from DB
  const completedModules = [1]; // Assuming module 1 is completed

  return <EmployeeDashboardView dictionary={dictionary} lang={lang} allModules={allModules} completedModules={completedModules} />;
}
