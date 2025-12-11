// app/programa/page.tsx  (Server Component)
import { getSchedule, getSpeakers } from "@/lib/content";
import ProgramClient from "./ProgramClient";

export default async function ProgramPage() {
  const [schedule, speakers] = await Promise.all([getSchedule(), getSpeakers()]);

  return <ProgramClient schedule={schedule} speakers={speakers} />;
}
