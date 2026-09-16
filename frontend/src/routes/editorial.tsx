import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { editorial } from "@/lib/sanaa-data";

export const Route = createFileRoute("/editorial")({
  head: () => ({
    meta: [
      { title: "Editorial — Kenyan Art Market Writing on Sanaa" },
      {
        name: "description",
        content:
          "Studio visits, price guides and market data for collectors buying Kenyan art on Sanaa.",
      },
      { property: "og:title", content: "Editorial — Kenyan Art Market Writing on Sanaa" },
      {
        property: "og:description",
        content: "Studio visits, collecting guides and market data from Sanaa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EditorialPage,
});

function EditorialPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
        <p className="eyebrow">Read</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Editorial
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Studio visits, collecting guides and the data behind Sanaa's price
          suggestions.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {editorial.map((e) => (
            <article key={e.title} className="border-t border-border pt-5">
              <p className="eyebrow">{e.kicker}</p>
              <h2 className="mt-2 text-2xl font-semibold leading-snug">{e.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {e.excerpt}
              </p>
              <p className="mt-4 text-sm font-medium underline">Read article</p>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
