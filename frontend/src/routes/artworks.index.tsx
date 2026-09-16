import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArtworkCard } from "@/components/artwork-card";
import { artistBySlug, artworks } from "@/lib/sanaa-data";

export const Route = createFileRoute("/artworks/")({
  head: () => ({
    meta: [
      { title: "Browse Artworks for Sale — Sanaa" },
      {
        name: "description",
        content:
          "Search and filter Kenyan paintings, sculpture, textiles and mixed media by medium, mood and price. Buy directly from the artist.",
      },
      { property: "og:title", content: "Browse Artworks for Sale — Sanaa" },
      {
        property: "og:description",
        content: "Filter Kenyan artworks by medium, mood and price on Sanaa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArtworksIndex,
});

const categories = ["All", "Painting", "Sculpture", "Textile", "Mixed media"] as const;
const sorts = ["Newest", "Price: low to high", "Price: high to low"] as const;

function ArtworksIndex() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Newest");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = artworks.filter((a) => {
      const artist = artistBySlug(a.artistSlug);
      const matchesQuery =
        !q ||
        [a.title, a.medium, a.mood, artist?.name ?? "", artist?.location ?? ""]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory = category === "All" || a.category === category;
      return matchesQuery && matchesCategory;
    });

    const sorted = [...filtered];
    if (sort === "Price: low to high") sorted.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") sorted.sort((a, b) => b.price - a.price);
    if (sort === "Newest") sorted.sort((a, b) => b.year - a.year);
    return sorted;
  }, [query, category, sort]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
        <p className="eyebrow">Marketplace</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Artworks
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every work is listed by the artist who made it. Prices include Sanaa's
          buyer protection and courier pickup from the studio.
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-4 border-y border-border py-4">
          <div className="min-w-56 flex-1">
            <label htmlFor="filter-search" className="eyebrow">
              Search
            </label>
            <input
              id="filter-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Artist, title, medium or mood"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="filter-category" className="eyebrow">
              Medium
            </label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}
              className="mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-sort" className="eyebrow">
              Sort
            </label>
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as (typeof sorts)[number])}
              className="mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {sorts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <p aria-live="polite" className="ml-auto text-sm text-muted-foreground">
            {results.length} {results.length === 1 ? "work" : "works"}
          </p>
        </div>

        {results.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">
            No works match that search yet. Try a different medium or artist name.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
            {results.map((a, i) => (
              <ArtworkCard key={a.slug} artwork={a} eager={i < 4} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
