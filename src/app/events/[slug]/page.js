import { fetchEventTickets, fetchUserData } from "@core/lib/api";

const SellerInfo = async ({ id }) => {
  const data = await fetchUserData({ id });

  return (
    <span>
      name: {data.name}
      email: {data.email}
    </span>
  )
}
export default async function Event({
  params,
}) {
  const slug = (await params).slug;
  const tickets = await fetchEventTickets({ eventId: Number(slug) });

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      event {slug}&nbsp;
      <div>
        tickets
      </div>
      <ul>
        {tickets?.map(t => (
          <div key={t.id}>
            <span>{t.id}</span>&nbsp;
            <span>{t.user_id}</span>&nbsp;
            <SellerInfo id={t.user_id} />
          </div>
        ))}
      </ul>
    </div>
  );
}
