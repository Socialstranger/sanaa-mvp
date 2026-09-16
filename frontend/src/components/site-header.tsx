import { Link } from "@tanstack/react-router";
import { Search, Heart, Menu } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/artworks", label: "Artworks" },
  { to: "/artists", label: "Artists" },
  { to: "/shows", label: "Shows & Fairs" },
  { to: "/editorial", label: "Editorial" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:rounded focus:bg-primary focus:px-3 focus:py-1.5 focus:text-sm focus:text-primary-foreground"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-3 md:px-8">
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded p-1.5 text-foreground hover:bg-muted md:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>

        <Link to="/" className="shrink-0 text-2xl font-extrabold tracking-tight text-ink">
          Sanaa
        </Link>

        <form
          role="search"
          className="hidden flex-1 items-center gap-2 border-b border-border py-1.5 md:flex"
          onSubmit={(e) => e.preventDefault()}
        >
          <Search className="size-4 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search artists, artworks, galleries
          </label>
          <input
            id="site-search"
            type="search"
            placeholder="Search by artist, artwork, medium or gallery"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>

        <nav aria-label="Main" className="hidden items-center gap-6 text-sm lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="link-quiet text-foreground"
              activeProps={{ className: "font-semibold underline" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link
            to="/artworks"
            aria-label="Saved works"
            className="rounded p-1.5 hover:bg-muted"
          >
            <Heart className="size-5" aria-hidden="true" />
          </Link>
          <Link
            to="/artworks"
            className="hidden rounded-md border border-input px-3 py-1.5 text-sm font-medium hover:bg-muted sm:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/artists"
            className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Sign up
          </Link>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-border px-4 py-3 md:hidden"
        >
          <form role="search" className="mb-3 flex items-center gap-2 border-b border-border py-1.5" onSubmit={(e) => e.preventDefault()}>
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="mobile-search" className="sr-only">
              Search artists, artworks, galleries
            </label>
            <input
              id="mobile-search"
              type="search"
              placeholder="Search Sanaa"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>
          <ul className="space-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={() => setOpen(false)} className="block py-1">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
