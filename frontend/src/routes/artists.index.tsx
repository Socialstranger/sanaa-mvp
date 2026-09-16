import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { artists, artworksByArtist } from "@/lib/sanaa-data";

export const Route = createFileRoute("/artists/")({
  head: () => ({
    meta: [
      { title: "Kenyan Artists on Sanaa — Painters, Sculptors, Weavers" },
      {
        name: "description",
        content:
          "Meet the painters, sculptors and textile artists selling on Sanaa. Follow a studio to hear first when new work is released.",
      },
      { property: "og:title", content: "Kenyan Artists on Sanaa" },
      {
        property: "og:description",
        content: "Follow Kenyan painters, sculptors and weavers and shop their studios.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArtistsIndex,
});

function ArtistsIndex() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-10 md:px-8">
        <p className="eyebrow">Studios</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Artists
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Sanaa onboards artists in person, photographs their work, and pays out
          after every sale. Follow a studio to get an alert when new work lands.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-3">
          {artists.map((artist) => {
            const works = artworksByArtist(artist.slug);
            return (
              <article key={artist.slug}>
                <Link
                  to="/artists/$artistSlug"
                  params={{ artistSlug: artist.slug }}
                  className="group block"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    width={816}
                    height={816}
                    loading="lazy"
                    className="h-auto w-full bg-canvas object-cover"
                  />
                  <h2 className="mt-4 text-xl font-semibold group-hover:underline">
                    {artist.name}
                  </h2>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {artist.discipline} · {artist.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {artist.bio}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {works.length} works available ·{" "}
                  {artist.followers.toLocaleString("en-KE")} followers
                </p>
                <button className="mt-4 rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-muted">
                  Follow
                </button>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
