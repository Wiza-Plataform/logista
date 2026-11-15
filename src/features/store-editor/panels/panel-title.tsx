export function PanelTitle({ children }: { readonly children: string }) {
  return <h2 className="m-0 text-[19px] font-extrabold tracking-[-0.02em]">{children}</h2>;
}

export function PanelSubtitle({ children }: { readonly children: string }) {
  return <p className="text-sm m-0 leading-[1.5] text-(--txt-dim)">{children}</p>;
}
