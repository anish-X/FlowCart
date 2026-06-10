// Reusable initials avatar — matches design system Avatar visually.
// Used in: Hero, MakerSpotlight, MakerGrid, Testimonials, Footer.

const TONE_BG: Record<string, string> = {
  rust:   "#B05432",
  teal:   "#2F7E78",
  rose:   "#C06B83",
  indigo: "#485684",
  moss:   "#6E7B46",
};

interface AvatarProps {
  initials: string;
  tone: string;
  size?: number;
}

export default function Avatar({ initials, tone, size = 34 }: AvatarProps) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-body font-semibold text-white flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: TONE_BG[tone] ?? "#4A2E1A",
      }}
    >
      {initials}
    </span>
  );
}
