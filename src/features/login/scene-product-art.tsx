export function DressArt() {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="size-9.5 fill-[var(--auth-scene-tile-dress-ink)]"
    >
      <path d="M15 5h10l-1.5 8 8 22h-23l8-22z" />
      <path
        d="M12 27h16M14 21h12"
        strokeWidth={1.6}
        strokeDasharray="2 2"
        className="fill-none stroke-[var(--auth-scene-tile-dress)]"
      />
    </svg>
  );
}

export function SandalsArt() {
  return (
    <svg
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="size-9.5 fill-[var(--auth-scene-tile-sandals-ink)]"
    >
      <rect x="9" y="8" width="9" height="25" rx="4.5" />
      <rect x="22" y="8" width="9" height="25" rx="4.5" />
      <path
        d="M8 15q5.5 4 11 0M21 15q5.5 4 11 0"
        strokeWidth={2}
        className="fill-none stroke-[var(--auth-scene-tile-sandals)]"
      />
    </svg>
  );
}

export function BasketArt() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-9.5 fill-none">
      <path
        d="M13 17a7 7 0 0 1 14 0"
        strokeWidth={2.2}
        className="stroke-[var(--auth-scene-tile-basket-ink)]"
      />
      <path d="M7 17h26l-3 16H10z" className="fill-[var(--auth-scene-tile-basket-ink)]" />
      <path
        d="M9 23h22M10 28h20"
        strokeWidth={1.4}
        className="stroke-[var(--auth-scene-tile-basket)]"
      />
    </svg>
  );
}

export function EarringsArt() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="size-9.5 fill-none">
      <path
        d="M13 6v9M27 6v9"
        strokeWidth={1.8}
        strokeLinecap="round"
        className="stroke-[var(--auth-scene-tile-earrings-ink)]"
      />
      <circle cx="13" cy="23" r="7" className="fill-[var(--auth-scene-tile-earrings-ink)]" />
      <circle cx="27" cy="23" r="7" className="fill-[var(--auth-scene-tile-earrings-ink)]" />
      <circle cx="13" cy="23" r="2.6" className="fill-[var(--auth-scene-tile-earrings)]" />
      <circle cx="27" cy="23" r="2.6" className="fill-[var(--auth-scene-tile-earrings)]" />
    </svg>
  );
}
