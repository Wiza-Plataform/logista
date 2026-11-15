import type { ReactNode } from 'react';

interface EditorIconProps {
  readonly className?: string;
  readonly strokeWidth?: number;
}

export type EditorIcon = (props: EditorIconProps) => ReactNode;

function Glyph({
  className,
  strokeWidth = 1.8,
  children,
}: EditorIconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const BackArrow: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M19 12H5" />
    <path d="m11 18-6-6 6-6" />
  </Glyph>
);

export const HomeOutline: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M4 10.5 12 4l8 6.5V20H4z" />
    <path d="M10 20v-5h4v5" />
  </Glyph>
);

export const Desktop: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </Glyph>
);

export const Phone: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="7" y="3" width="10" height="18" rx="2.5" />
    <path d="M11 17.5h2" />
  </Glyph>
);

export const Undo: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M9 14 4 9l5-5" />
    <path d="M4 9h11a5 5 0 0 1 0 10h-3" />
  </Glyph>
);

export const Redo: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="m15 14 5-5-5-5" />
    <path d="M20 9H9a5 5 0 0 0 0 10h3" />
  </Glyph>
);

export const Layers: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="m12 3 9 5-9 5-9-5z" />
    <path d="m3 13 9 5 9-5" />
  </Glyph>
);

export const Paint: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.8-.9 1.8-1.9 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-7.7-9-7.7z" />
    <circle cx="7.5" cy="11" r="1.2" />
    <circle cx="10" cy="7" r="1.2" />
    <circle cx="15" cy="7.5" r="1.2" />
  </Glyph>
);

export const LayoutGrid: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <path d="M3 9h18M9 9v12" />
  </Glyph>
);

export const Shopfront: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M4 9.5 5.5 4h13L20 9.5" />
    <path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0" />
    <path d="M5.5 12v8h13v-8" />
    <path d="M10 20v-4.5h4V20" />
  </Glyph>
);

export const Megaphone: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </Glyph>
);

export const HeaderBar: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 9h18" />
  </Glyph>
);

export const BannerPicture: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </Glyph>
);

export const PriceTag: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M3 12V4h8l10 10-8 8z" />
    <circle cx="7.5" cy="8.5" r="1.5" />
  </Glyph>
);

export const Tiles: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
    <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
  </Glyph>
);

export const InfoCircle: EditorIcon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5" />
    <path d="M12 7.5v.5" />
  </Glyph>
);

export const QuestionCircle: EditorIcon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" />
    <path d="M12 17v.5" />
  </Glyph>
);

export const Instagram: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17.5 6.5v.01" />
  </Glyph>
);

export const FooterBar: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M3 15h18" />
  </Glyph>
);

export const WhatsApp: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.6a8.4 8.4 0 1 1 15.6-4.3z" />
  </Glyph>
);

export const EyeOpen: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Glyph>
);

export const EyeShut: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1C11 5 11.5 5 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.3" />
    <path d="M6.6 6.6C3.9 8.4 2 12 2 12s3.6 7 10 7c1.7 0 3.2-.4 4.5-1.1" />
  </Glyph>
);

export const AddPlus: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 5v14M5 12h14" />
  </Glyph>
);

export const Padlock: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </Glyph>
);

export const Tick: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Glyph>
);

export const SearchLens: EditorIcon = (props) => (
  <Glyph {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Glyph>
);

export const ShoppingBag: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M5 8h14l-1.2 12H6.2z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Glyph>
);

export const MenuLines: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Glyph>
);

export const ForwardArrow: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </Glyph>
);

export const MapPin: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Glyph>
);

export const Sliders: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
    <circle cx="16" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </Glyph>
);

export const ArrowUp: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 19V5" />
    <path d="m6 11 6-6 6 6" />
  </Glyph>
);

export const ArrowDown: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 5v14" />
    <path d="m6 13 6 6 6-6" />
  </Glyph>
);

export const TrashCan: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M4 7h16" />
    <path d="M9 7V4.5h6V7" />
    <path d="M6.5 7l1 13h9l1-13" />
  </Glyph>
);

export const UploadTray: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 15V4" />
    <path d="m7 9 5-5 5 5" />
    <path d="M5 15v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
  </Glyph>
);

export const ImageFrame: EditorIcon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </Glyph>
);

export const Spinner: EditorIcon = (props) => (
  <Glyph {...props}>
    <path d="M12 3a9 9 0 1 1-9 9" />
  </Glyph>
);

export function GripDots({ className }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="9" cy="6" r="1.5" />
      <circle cx="15" cy="6" r="1.5" />
      <circle cx="9" cy="12" r="1.5" />
      <circle cx="15" cy="12" r="1.5" />
      <circle cx="9" cy="18" r="1.5" />
      <circle cx="15" cy="18" r="1.5" />
    </svg>
  );
}
