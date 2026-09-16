import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArtworkCard } from "@/components/artwork-card";
import { artistBySlug, artworksByArtist } from "@/lib/sanaa-data";

export const Route = createFileRoute("/artists/$artistSlug")({
  loader: ({ params }) => {
    const artist = artistBySlug(params.artistSlug);
    if (!artist) throw notFound();
    return { artist };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artist unavailable — Sanaa" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { artist } = loaderData;
    const title = `${artist.name} — ${artist.discipline} on Sanaa`;
    const description = `${artist.name}, ${artist.discipline.toLowerCase()} based in ${artist.location}. ${artist.bio}`;
    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 158) },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 158) },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArtistDetail,
});

function ArtistDetail() {
  const { artist } = Route.useLoaderData();
  const works = artworksByArtist(artist.slug);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main id="main" className="mx-auto max-w-[1600px] px-4 py-8 md:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link to="/artists" className="link-quiet">
            Artists
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-foreground">{artist.name}</span>
        </nav>

        <header className="mt-8 flex flex-wrap items-start gap-8 border-b border-border pb-10">
          <img
            src={artist.image}
            alt={artist.name}
            width={816}
            height={816}
            className="size-32 rounded-full object-cover md:size-40"
          />
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              {artist.name}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {artist.discipline} · {artist.location}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">{artist.bio}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Follow
              </button>
              <button className="rounded-md border border-input px-5 py-2.5 text-sm font-semibold hover:bg-muted">
                Contact studio
              </button>
              <span className="text-sm text-muted-foreground">
                {artist.followers.toLocaleString("en-KE")} followers
              </span>
            </div>
          </div>
        </header>

        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">
            Available works ({works.length})
          </h2>
          {works.length === 0 ? (
            <p className="text-muted-foreground">
              No works listed right now. Follow this studio for an alert when new
              work is added.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
              {works.map((a) => (
                <ArtworkCard key={a.slug} artwork={a} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
