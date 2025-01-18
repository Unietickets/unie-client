import EventsList from "@/app/components/business/EventsList";
import { fetchEvents } from "@/app/lib/api";

export default async function Events() {
  const events = await fetchEvents();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <EventsList events={events}/>
    </div>
  );
}
