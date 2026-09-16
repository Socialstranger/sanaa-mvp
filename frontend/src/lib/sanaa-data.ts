import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art3 from "@/assets/art-3.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";

export const galleryImage = gallery1;

export type Artist = {
  slug: string;
  name: string;
  discipline: string;
  location: string;
  image: string;
  bio: string;
  followers: number;
};

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  artistSlug: string;
  medium: string;
  category: "Painting" | "Sculpture" | "Textile" | "Mixed media";
  mood: string;
  size: string;
  edition: string;
  price: number;
  image: string;
  width: number;
  height: number;
  status: "For sale" | "Make an offer" | "Auction";
  description: string;
};

export const artists: Artist[] = [
  {
    slug: "wanjiru-kamau",
    name: "Wanjiru Kamau",
    discipline: "Painter",
    location: "Nairobi, Kenya",
    image: artist1,
    bio: "Wanjiru Kamau paints large-format portraits that place Kenyan women at the centre of the frame. Working in heavy acrylic and palette knife, she builds skin from layers of ochre, indigo and raw canvas.",
    followers: 2840,
  },
  {
    slug: "otieno-mwangi",
    name: "Otieno Mwangi",
    discipline: "Sculptor",
    location: "Kisumu, Kenya",
    image: artist2,
    bio: "Otieno Mwangi carves elongated figures from reclaimed ebony and olive wood, drawing on Luo storytelling traditions and the quiet geometry of the human spine.",
    followers: 1560,
  },
  {
    slug: "amina-hassan",
    name: "Amina Hassan",
    discipline: "Textile artist",
    location: "Mombasa, Kenya",
    image: artist3,
    bio: "Amina Hassan weaves wall pieces on a hand loom in Old Town Mombasa, translating kikoy stripes and Swahili doorway motifs into contemporary compositions.",
    followers: 1985,
  },
];

export const artworks: Artwork[] = [
  {
    slug: "the-elder-daughter",
    title: "The Elder Daughter",
    year: 2025,
    artistSlug: "wanjiru-kamau",
    medium: "Acrylic on canvas",
    category: "Painting",
    mood: "Bold",
    size: "150 × 120 cm",
    edition: "Unique",
    price: 385000,
    image: art1,
    width: 1024,
    height: 1280,
    status: "For sale",
    description:
      "A monumental portrait built from thick ochre and cobalt strokes. Beadwork is rendered almost sculpturally, sitting proud of the canvas surface.",
  },
  {
    slug: "profile-in-red-earth",
    title: "Profile in Red Earth",
    year: 2024,
    artistSlug: "wanjiru-kamau",
    medium: "Acrylic and gold leaf on canvas",
    category: "Painting",
    mood: "Meditative",
    size: "100 × 100 cm",
    edition: "Unique",
    price: 240000,
    image: art2,
    width: 1024,
    height: 1024,
    status: "Make an offer",
    description:
      "Blocks of laterite red and charcoal are stitched together with fine gold lines, abstracting a profile into architecture.",
  },
  {
    slug: "kikoy-study-no-4",
    title: "Kikoy Study No. 4",
    year: 2025,
    artistSlug: "amina-hassan",
    medium: "Hand-woven cotton and wool",
    category: "Textile",
    mood: "Warm",
    size: "180 × 130 cm",
    edition: "Edition of 3",
    price: 145000,
    image: art3,
    width: 1024,
    height: 1280,
    status: "For sale",
    description:
      "Woven over six weeks on a hand loom, this hanging reworks coastal kikoy stripes into a strict, symmetrical field with a hand-knotted fringe.",
  },
  {
    slug: "river-road-at-dusk",
    title: "River Road at Dusk",
    year: 2024,
    artistSlug: "wanjiru-kamau",
    medium: "Oil on canvas",
    category: "Painting",
    mood: "City",
    size: "120 × 150 cm",
    edition: "Unique",
    price: 410000,
    image: art4,
    width: 1280,
    height: 1024,
    status: "Auction",
    description:
      "Matatus, hawkers and wet tarmac dissolve into a single warm mass of light. Painted from sketches made on the roof of a downtown building.",
  },
  {
    slug: "standing-figure-vii",
    title: "Standing Figure VII",
    year: 2025,
    artistSlug: "otieno-mwangi",
    medium: "Carved ebony",
    category: "Sculpture",
    mood: "Quiet",
    size: "94 × 22 × 18 cm",
    edition: "Unique",
    price: 320000,
    image: art5,
    width: 1024,
    height: 1280,
    status: "For sale",
    description:
      "A single length of reclaimed ebony worked down to a spine and two folded arms, then hand-polished over three days.",
  },
  {
    slug: "paper-son",
    title: "Paper Son",
    year: 2025,
    artistSlug: "otieno-mwangi",
    medium: "Recycled paper and fabric on board",
    category: "Mixed media",
    mood: "Tender",
    size: "90 × 90 cm",
    edition: "Unique",
    price: 178000,
    image: art6,
    width: 1024,
    height: 1024,
    status: "For sale",
    description:
      "Torn ledger paper, cement sacking and offcut fabric assembled into a portrait of the artist's nephew, set against a field of dusty green.",
  },
];

export const collections = [
  { label: "Under KSh 100,000", href: "/artworks", note: "Entry-level works" },
  { label: "Painting", href: "/artworks", note: "Canvas and board" },
  { label: "Sculpture", href: "/artworks", note: "Wood and stone" },
  { label: "Textile", href: "/artworks", note: "Woven and stitched" },
  { label: "Bold colour", href: "/artworks", note: "By mood" },
  { label: "Nairobi studios", href: "/artists", note: "By city" },
];

export const shows = [
  {
    title: "Weekend Art Drop: Coast Edition",
    venue: "Sanaa Online",
    dates: "Fri 18 – Sun 20 Sep",
    note: "12 works released at 6pm",
  },
  {
    title: "Soil & Thread",
    venue: "Kuona Trust, Nairobi",
    dates: "Until 4 Oct",
    note: "Group show, 9 artists",
  },
  {
    title: "Carvers of Kisumu",
    venue: "Lakeside Studio",
    dates: "26 Sep – 30 Nov",
    note: "Sculpture survey",
  },
];

export const editorial = [
  {
    kicker: "Market",
    title: "What Kenyan collectors actually paid in 2026",
    excerpt:
      "Median prices for mid-career painters rose 18% year on year. We break down the data behind Sanaa's valuation suggestions.",
  },
  {
    kicker: "Studio visit",
    title: "Inside Wanjiru Kamau's Ngara studio",
    excerpt:
      "Three unfinished canvases, one broken palette knife, and a very specific opinion about ochre.",
  },
  {
    kicker: "Guide",
    title: "Buying your first piece with M-Pesa",
    excerpt:
      "How escrow, courier pickup and artist payouts work when you check out from your phone.",
  },
];

export const artistBySlug = (slug: string) => artists.find((a) => a.slug === slug);
export const artworkBySlug = (slug: string) => artworks.find((a) => a.slug === slug);
export const artworksByArtist = (slug: string) =>
  artworks.filter((a) => a.artistSlug === slug);

export const formatKsh = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;
