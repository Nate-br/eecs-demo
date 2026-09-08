import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { CourseView } from "./CourseView";

export default async function CourseServerPage({ params }: { params: { lang: string; id: string } }) {
  const moduleId = parseInt(params.id);
  
  if (isNaN(moduleId)) {
    return notFound();
  }

  const moduleData = await db.module.findUnique({
    where: { id: moduleId }
  });

  if (!moduleData) {
    return notFound();
  }

  return <CourseView lang={params.lang} moduleData={moduleData} />;
}
