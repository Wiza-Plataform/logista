import type { ReactNode } from 'react';

interface IconProps {
  readonly className?: string;
  readonly strokeWidth?: number;
}

export type Icon = (props: IconProps) => ReactNode;

function Glyph({ className, strokeWidth, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const Rocket: Icon = (props) => (
  <Glyph {...props}>
    <path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2a2.1 2.1 0 0 0-3-3z" />
    <path d="M12 15l-3-3a16 16 0 0 1 7-9c2.6 0 5 .4 5 .4s.4 2.4.4 5a16 16 0 0 1-9 7z" />
    <path d="M9 12H4s.5-2.8 2-4 4 0 4 0" />
    <path d="M12 15v5s2.8-.5 4-2 0-4 0-4" />
  </Glyph>
);

export const Store: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 9l1.5-5h15L21 9M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M3 9h18" />
  </Glyph>
);

export const Bag: Icon = (props) => (
  <Glyph {...props}>
    <path d="M6 2 3 6v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6l-3-4z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </Glyph>
);

export const Shield: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6z" />
  </Glyph>
);

export const Grid: Icon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </Glyph>
);

export const Box: Icon = (props) => (
  <Glyph {...props}>
    <path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </Glyph>
);

export const People: Icon = (props) => (
  <Glyph {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
  </Glyph>
);

export const Tag: Icon = (props) => (
  <Glyph {...props}>
    <path d="M9 11 3 5V3h2l6 6" />
    <path d="M21 12a9 9 0 1 1-6.2-8.5" />
    <path d="m15 9 6-6" />
    <path d="M17 3h4v4" />
  </Glyph>
);

export const Chart: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 3v18h18" />
    <rect x="7" y="11" width="3" height="6" rx="1" />
    <rect x="13" y="7" width="3" height="10" rx="1" />
  </Glyph>
);

export const Card: Icon = (props) => (
  <Glyph {...props}>
    <rect x="2" y="5" width="20" height="14" rx="2.5" />
    <path d="M2 10h20" />
  </Glyph>
);

export const Gear: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.6 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 13.4a2 2 0 0 1 0-4 1.6 1.6 0 0 0 1.5-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 4.6V3a2 2 0 0 1 4 0 1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7H21a2 2 0 0 1 0 4z" />
  </Glyph>
);

export const Palette: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 2a10 10 0 0 0 0 20c1 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1a1.5 1.5 0 0 1 1-2.6H16a4 4 0 0 0 4-4 8 8 0 0 0-8-8z" />
    <circle cx="7.5" cy="11" r="1" />
    <circle cx="12" cy="7.5" r="1" />
    <circle cx="16" cy="11" r="1" />
  </Glyph>
);

export const Money: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v10M9.5 9.2h3.6a1.6 1.6 0 0 1 0 3.2h-2.2a1.6 1.6 0 0 0 0 3.2H14" />
  </Glyph>
);

export const Alert: Icon = (props) => (
  <Glyph {...props}>
    <path d="M10.3 3.2 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.2a2 2 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </Glyph>
);

export const Trophy: Icon = (props) => (
  <Glyph {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17a2 2 0 0 1-2 2M14 14.7V17a2 2 0 0 0 2 2M18 2H6v7a6 6 0 0 0 12 0z" />
  </Glyph>
);

export const Arrow: Icon = (props) => (
  <Glyph {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Glyph>
);

export const ArrowLeft: Icon = (props) => (
  <Glyph {...props}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Glyph>
);

export const Moon: Icon = (props) => (
  <Glyph {...props}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </Glyph>
);

export const Sun: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </Glyph>
);

export const Check: Icon = (props) => (
  <Glyph {...props}>
    <path d="M20 6 9 17l-5-5" />
  </Glyph>
);

export const Eye: Icon = (props) => (
  <Glyph {...props}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle cx="12" cy="12" r="3" />
  </Glyph>
);

export const EyeOff: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.5 5.2A10.4 10.4 0 0 1 12 5c7 0 11 7 11 7a13.6 13.6 0 0 1-3.2 3.9M6.6 6.6C3.9 8.4 2 12 2 12s4 7 11 7a10.2 10.2 0 0 0 4-.8" />
  </Glyph>
);

export const Mail: Icon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Glyph>
);

export const Lock: Icon = (props) => (
  <Glyph {...props}>
    <rect x="4" y="10.5" width="16" height="10.5" rx="2.5" />
    <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
  </Glyph>
);

export const WhatsApp: Icon = (props) => (
  <Glyph {...props}>
    <path d="M20.5 11.6a8.4 8.4 0 0 1-12.2 7.5L3.5 20.5l1.4-4.6a8.4 8.4 0 1 1 15.6-4.3z" />
  </Glyph>
);

export const OrderBag: Icon = (props) => (
  <Glyph {...props}>
    <path d="M5 8h14l-1.2 12H6.2z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Glyph>
);

export const Parcel: Icon = (props) => (
  <Glyph {...props}>
    <path d="M20.5 7.5 12 3 3.5 7.5v9L12 21l8.5-4.5z" />
    <path d="m3.5 7.5 8.5 4.5 8.5-4.5" />
    <path d="M12 12v9" />
  </Glyph>
);

export const AlertCircle: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v5M12 16h.01" />
  </Glyph>
);

export const Plus: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 5v14M5 12h14" />
  </Glyph>
);

export const Picture: Icon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2.5" />
    <circle cx="8.5" cy="9" r="1.8" />
    <path d="m21 16-5-5L5 21" />
  </Glyph>
);

export const Close: Icon = (props) => (
  <Glyph {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Glyph>
);

export const SidebarToggle: Icon = (props) => (
  <Glyph {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <path d="M9 4v16" />
    <path d="M15.5 9.5 13 12l2.5 2.5" />
  </Glyph>
);

export const ChevronDown: Icon = (props) => (
  <Glyph {...props}>
    <path d="m6 9 6 6 6-6" />
  </Glyph>
);

export const Burger: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 6h18M3 12h18M3 18h18" />
  </Glyph>
);

export const ChevronLeft: Icon = (props) => (
  <Glyph {...props}>
    <path d="m15 18-6-6 6-6" />
  </Glyph>
);

export const ChevronRight: Icon = (props) => (
  <Glyph {...props}>
    <path d="m9 18 6-6-6-6" />
  </Glyph>
);

export const Search: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </Glyph>
);

export const Warning: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
  </Glyph>
);

export const Currency: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Glyph>
);

export const Pencil: Icon = (props) => (
  <Glyph {...props}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </Glyph>
);

export const Trash: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
  </Glyph>
);

export const Grip: Icon = (props) => (
  <Glyph {...props}>
    <circle cx="9" cy="6" r="1" />
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="18" r="1" />
    <circle cx="15" cy="6" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="18" r="1" />
  </Glyph>
);

export const SubArrow: Icon = (props) => (
  <Glyph {...props}>
    <path d="M9 10v4a2 2 0 0 0 2 2h7" />
    <path d="m15 13 3 3-3 3" />
  </Glyph>
);

export const Bulb: Icon = (props) => (
  <Glyph {...props}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
  </Glyph>
);

export const Folder: Icon = (props) => (
  <Glyph {...props}>
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </Glyph>
);

export const EyeCrossed: Icon = (props) => (
  <Glyph {...props}>
    <path d="M9.9 5A9.6 9.6 0 0 1 12 4.8c6.5 0 10 7.2 10 7.2a13 13 0 0 1-2.2 3M6.6 6.6A13 13 0 0 0 2 12s3.5 7 10 7a9.3 9.3 0 0 0 5.4-1.6" />
    <path d="m3 3 18 18" />
  </Glyph>
);

export const SignOut: Icon = (props) => (
  <Glyph {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5" />
    <path d="M21 12H9" />
  </Glyph>
);
