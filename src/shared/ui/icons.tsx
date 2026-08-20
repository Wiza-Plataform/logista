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

export const Close: Icon = (props) => (
  <Glyph {...props}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Glyph>
);
