import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { galleryImage, shows } from "@/lib/sanaa-data";

export const Route = createFileRoute("/shows")({
  head: () => ({
    meta: [
      { title: "Shows, Fairs and Weekend Art Drops — Sanaa" },
      {
        name: "description",
        content:
          "Exhibitions, art fairs and Sanaa's Friday weekend art drops across Nairobi, Mombasa and Kisumu.",
      },
      { property: "og:title", content: "Shows, Fairs and Weekend Art Drops — Sanaa" },
      {
        property: "og:description",
        content: "What's on now in Kenyan galleries, plus Sanaa's weekly online drops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShowsPage,
});

function ShowsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
        <p className="eyebrow">What's on</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Shows, fairs and drops
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Gallery exhibitions and fairs across Kenya, plus Sanaa's own online
          releases every Friday at 6pm EAT.
        </p>

        <img
          src={galleryImage}
          alt="Visitors viewing large paintings in a Nairobi gallery"
          width={1600}
          height={912}
          className="mt-10 h-auto w-full object-cover"
        />

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {shows.map((s) => (
            <li key={s.title} className="py-6">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {s.venue} · {s.dates}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.note}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
