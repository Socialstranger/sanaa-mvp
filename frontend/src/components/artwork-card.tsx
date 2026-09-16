import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { artistBySlug, formatKsh, type Artwork } from "@/lib/sanaa-data";

export function ArtworkCard({
  artwork,
  className = "",
  eager = false,
}: {
  artwork: Artwork;
  className?: string;
  eager?: boolean;
}) {
  const artist = artistBySlug(artwork.artistSlug);

  return (
    <article className={`group ${className}`}>
      <Link
        to="/artworks/$artworkSlug"
        params={{ artworkSlug: artwork.slug }}
        className="block"
      >
        <div className="relative overflow-hidden bg-canvas">
          <img
            src={artwork.image}
            alt={`${artwork.title} by ${artist?.name ?? "unknown artist"}`}
            width={artwork.width}
            height={artwork.height}
            loading={eager ? "eager" : "lazy"}
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium">
            {artwork.status}
          </span>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{artist?.name}</p>
            <p className="truncate text-sm italic text-muted-foreground">
              {artwork.title}, {artwork.year}
            </p>
            <p className="truncate text-xs text-muted-foreground">{artwork.medium}</p>
            <p className="mt-1 text-sm font-medium">{formatKsh(artwork.price)}</p>
          </div>
          <span
            aria-hidden="true"
            className="mt-0.5 shrink-0 rounded-full p-1.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
