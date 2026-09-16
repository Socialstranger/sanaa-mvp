import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-canvas">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
        <div>
          <p className="text-2xl font-extrabold tracking-tight text-ink">Sanaa</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A marketplace for Kenyan art. Buy directly from artists in Nairobi,
            Mombasa and Kisumu, and pay with M-Pesa.
          </p>
        </div>
        <div>
          <h2 className="eyebrow">Browse</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link to="/artworks" className="link-quiet">Artworks</Link></li>
            <li><Link to="/artists" className="link-quiet">Artists</Link></li>
            <li><Link to="/shows" className="link-quiet">Shows & fairs</Link></li>
            <li><Link to="/editorial" className="link-quiet">Editorial</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">For artists</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Open a studio profile</li>
            <li>Pricing guidance</li>
            <li>Payouts and commission</li>
            <li>Courier pickup</li>
          </ul>
        </div>
        <div>
          <h2 className="eyebrow">Weekend art drops</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            New works released every Friday at 6pm EAT.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              placeholder="you@email.com"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border px-4 py-6 text-xs text-muted-foreground md:px-8">
        <p className="mx-auto max-w-[1600px]">
          © 2026 Sanaa. Nairobi, Kenya. All artwork images shown are illustrative.
        </p>
      </div>
    </footer>
  );
}
