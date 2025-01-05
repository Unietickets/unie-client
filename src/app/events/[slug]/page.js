export default async function Event({
  params,
}) {
  const slug = (await params).slug;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      event {slug}
    </div>
  );
}
