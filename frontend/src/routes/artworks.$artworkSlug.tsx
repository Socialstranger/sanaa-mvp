import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Heart, Share2, ShieldCheck, Truck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArtworkCard } from "@/components/artwork-card";
import {
  artistBySlug,
  artworkBySlug,
  artworks,
  formatKsh,
} from "@/lib/sanaa-data";

export const Route = createFileRoute("/artworks/$artworkSlug")({
  loader: ({ params }) => {
    const artwork = artworkBySlug(params.artworkSlug);
    if (!artwork) throw notFound();
    return { artwork };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artwork unavailable — Sanaa" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { artwork } = loaderData;
    const artist = artistBySlug(artwork.artistSlug);
    const title = `${artwork.title} by ${artist?.name ?? "Sanaa artist"} — Sanaa`;
    const description = `${artwork.medium}, ${artwork.size}. ${formatKsh(artwork.price)}. ${artwork.description}`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArtworkDetail,
});

function ArtworkDetail() {
  const { artwork } = Route.useLoaderData();
  const artist = artistBySlug(artwork.artistSlug);
  const more = artworks.filter((a) => a.slug !== artwork.slug).slice(0, 4);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/artworks" className="link-quiet">
            Artworks
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{artwork.title}</span>
        </nav>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="bg-canvas">
            <img
              src={artwork.image}
              alt={`${artwork.title} by ${artist?.name ?? "unknown artist"}`}
              width={artwork.width}
              height={artwork.height}
              className="h-auto w-full object-contain"
            />
          </div>

          <div>
            {artist && (
              <Link
                to="/artists/$artistSlug"
                params={{ artistSlug: artist.slug }}
                className="link-quiet text-lg font-semibold underline"
              >
                {artist.name}
              </Link>
            )}
            <h1 className="mt-1 text-2xl italic text-muted-foreground md:text-3xl">
              {artwork.title}, {artwork.year}
            </h1>

            <dl className="mt-6 space-y-1.5 text-sm">
              <div className="flex gap-2">
                <dt className="w-28 text-muted-foreground">Medium</dt>
                <dd>{artwork.medium}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-muted-foreground">Size</dt>
                <dd>{artwork.size}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-muted-foreground">Edition</dt>
                <dd>{artwork.edition}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-muted-foreground">Mood</dt>
                <dd>{artwork.mood}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 text-muted-foreground">Location</dt>
                <dd>{artist?.location}</dd>
              </div>
            </dl>

            <p className="mt-6 border-t border-border pt-6 text-3xl font-semibold">
              {formatKsh(artwork.price)}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {artwork.status} · Pay with M-Pesa or card
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
                {artwork.status === "Auction" ? "Place a bid" : "Buy now with M-Pesa"}
              </button>
              <button className="rounded-md border border-input px-5 py-3 text-sm font-semibold hover:bg-muted">
                {artwork.status === "Make an offer" ? "Make an offer" : "Contact the artist"}
              </button>
              <div className="flex gap-3">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm hover:bg-muted">
                  <Heart className="size-4" aria-hidden="true" /> Save
                </button>
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-input px-4 py-2.5 text-sm hover:bg-muted">
                  <Share2 className="size-4" aria-hidden="true" /> Share
                </button>
              </div>
            </div>

            <ul className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Payment is held until the work reaches you. Full refund if it
                arrives damaged.
              </li>
              <li className="flex items-start gap-3">
                <Truck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                Courier pickup from the artist's studio, 2–5 days within Kenya.
              </li>
            </ul>

            <section className="mt-8 border-t border-border pt-6">
              <h2 className="eyebrow">About this work</h2>
              <p className="mt-3 text-sm leading-relaxed">{artwork.description}</p>
            </section>

            <section className="mt-8 border-t border-border pt-6">
              <h2 className="eyebrow">Price guidance</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Comparable works by {artist?.name} have sold between{" "}
                {formatKsh(Math.round(artwork.price * 0.8))} and{" "}
                {formatKsh(Math.round(artwork.price * 1.25))} over the past year.
              </p>
            </section>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            More works on Sanaa
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {more.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
