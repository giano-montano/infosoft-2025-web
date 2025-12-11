// app/programa/page.tsx  (Server Component)
import { getSchedule } from "@/lib/content";
import ProgramClient from "./ProgramClient";

export default async function ProgramPage() {
  const schedule = await getSchedule();

  return <ProgramClient schedule={schedule} />;
}
