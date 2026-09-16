import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArtworkCard } from "@/components/artwork-card";
import {
  artists,
  artworks,
  collections,
  editorial,
  formatKsh,
  galleryImage,
  shows,
} from "@/lib/sanaa-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sanaa — Buy Kenyan Art Directly From Artists" },
      {
        name: "description",
        content:
          "Discover and buy paintings, sculpture and textiles from Kenyan artists. Browse studios in Nairobi, Mombasa and Kisumu, and pay with M-Pesa.",
      },
      { property: "og:title", content: "Sanaa — Buy Kenyan Art Directly From Artists" },
      {
        property: "og:description",
        content:
          "A marketplace for contemporary Kenyan art. Follow artists, save works and check out with M-Pesa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function SectionHeader({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow?: string;
  title: string;
  href: "/artworks" | "/artists" | "/shows" | "/editorial";
  linkLabel: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      </div>
      <Link to={href} className="link-quiet shrink-0 text-sm font-medium underline">
        {linkLabel}
      </Link>
    </div>
  );
}

function Home() {
  const hero = artworks[0]!;
  const featured = artworks.slice(1, 5);
  const auction = artworks.find((a) => a.status === "Auction") ?? artworks[3]!;

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main id="main">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-4 py-10 md:grid-cols-2 md:gap-14 md:px-8 md:py-16">
            <div>
              <p className="eyebrow">Featured artist · Nairobi</p>
              <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
                Kenyan art, straight from the studio.
              </h1>
              <p className="mt-5 max-w-md text-base text-muted-foreground md:text-lg">
                Sanaa brings together painters, sculptors and textile artists across
                Kenya. Browse verified works, ask the artist a question, and pay
                with M-Pesa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/artworks"
                  className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Browse artworks
                </Link>
                <Link
                  to="/artists"
                  className="rounded-md border border-input px-5 py-2.5 text-sm font-semibold hover:bg-muted"
                >
                  Meet the artists
                </Link>
              </div>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
                <div>
                  <dt className="eyebrow">Artists</dt>
                  <dd className="mt-1 text-xl font-semibold">50+</dd>
                </div>
                <div>
                  <dt className="eyebrow">Cities</dt>
                  <dd className="mt-1 text-xl font-semibold">6</dd>
                </div>
                <div>
                  <dt className="eyebrow">Checkout</dt>
                  <dd className="mt-1 text-xl font-semibold">M-Pesa</dd>
                </div>
              </dl>
            </div>
            <Link
              to="/artworks/$artworkSlug"
              params={{ artworkSlug: hero.slug }}
              className="group block"
            >
              <img
                src={hero.image}
                alt={`${hero.title} by Wanjiru Kamau`}
                width={hero.width}
                height={hero.height}
                className="h-auto w-full bg-canvas object-cover"
              />
              <p className="mt-3 text-sm">
                <span className="font-semibold">Wanjiru Kamau</span>
                <span className="italic text-muted-foreground">
                  {" "}
                  · {hero.title}, {hero.year}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">{formatKsh(hero.price)}</p>
            </Link>
          </div>
        </section>

        {/* New this week */}
        <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
          <SectionHeader
            eyebrow="Just added"
            title="New this week"
            href="/artworks"
            linkLabel="View all artworks"
          />
          <div className="rail">
            {artworks.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} className="w-64 md:w-72" />
            ))}
          </div>
        </section>

        {/* Browse by category */}
        <section className="border-y border-border bg-canvas">
          <div className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
            <SectionHeader
              eyebrow="Ways to browse"
              title="Medium, mood and price"
              href="/artworks"
              linkLabel="All categories"
            />
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
              {collections.map((c) => (
                <li key={c.label}>
                  <Link
                    to={c.href as "/artworks" | "/artists"}
                    className="flex h-full flex-col justify-between rounded-md border border-border bg-background p-4 transition-colors hover:border-terracotta"
                  >
                    <span className="text-sm font-semibold">{c.label}</span>
                    <span className="mt-6 text-xs text-muted-foreground">{c.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Featured works */}
        <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
          <SectionHeader
            eyebrow="Curated"
            title="Featured works"
            href="/artworks"
            linkLabel="See more"
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {featured.map((a) => (
              <ArtworkCard key={a.slug} artwork={a} />
            ))}
          </div>
        </section>

        {/* Artists */}
        <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
          <SectionHeader
            eyebrow="Follow their work"
            title="Artists on Sanaa"
            href="/artists"
            linkLabel="All artists"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {artists.map((artist) => (
              <Link
                key={artist.slug}
                to="/artists/$artistSlug"
                params={{ artistSlug: artist.slug }}
                className="group flex items-center gap-4"
              >
                <img
                  src={artist.image}
                  alt={artist.name}
                  width={816}
                  height={816}
                  loading="lazy"
                  className="size-20 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold group-hover:underline">{artist.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {artist.discipline} · {artist.location}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {artist.followers.toLocaleString("en-KE")} followers
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Auction */}
        <section className="border-y border-border bg-canvas">
          <div className="mx-auto grid max-w-[1600px] items-center gap-8 px-4 py-14 md:grid-cols-2 md:px-8">
            <img
              src={auction.image}
              alt={auction.title}
              width={auction.width}
              height={auction.height}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
            <div>
              <p className="eyebrow">Live auction · closes Sunday 20:00 EAT</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                {auction.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{auction.description}</p>
              <p className="mt-6 text-sm text-muted-foreground">Current bid</p>
              <p className="text-2xl font-semibold">{formatKsh(auction.price)}</p>
              <Link
                to="/artworks/$artworkSlug"
                params={{ artworkSlug: auction.slug }}
                className="mt-6 inline-flex rounded-md bg-terracotta px-5 py-2.5 text-sm font-semibold text-terracotta-foreground hover:opacity-90"
              >
                Place a bid
              </Link>
            </div>
          </div>
        </section>

        {/* Shows */}
        <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
          <SectionHeader
            eyebrow="On now"
            title="Shows, fairs and drops"
            href="/shows"
            linkLabel="All events"
          />
          <img
            src={galleryImage}
            alt="Visitors in a contemporary gallery in Nairobi"
            width={1600}
            height={912}
            loading="lazy"
            className="h-auto w-full object-cover"
          />
          <ul className="mt-8 divide-y divide-border border-t border-border">
            {shows.map((s) => (
              <li key={s.title} className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4">
                <span className="w-full font-semibold md:w-64">{s.title}</span>
                <span className="text-sm text-muted-foreground">{s.venue}</span>
                <span className="text-sm text-muted-foreground">{s.dates}</span>
                <span className="ml-auto text-sm text-muted-foreground">{s.note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Editorial */}
        <section className="mx-auto max-w-[1600px] px-4 py-14 md:px-8">
          <SectionHeader
            eyebrow="Read"
            title="Sanaa editorial"
            href="/editorial"
            linkLabel="All articles"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {editorial.map((e) => (
              <Link key={e.title} to="/editorial" className="group border-t border-border pt-4">
                <p className="eyebrow">{e.kicker}</p>
                <h3 className="mt-2 text-xl font-semibold group-hover:underline">{e.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{e.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
