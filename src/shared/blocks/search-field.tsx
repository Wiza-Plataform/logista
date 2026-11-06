'use client';

import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import { Search } from '@/shared/ui/icons';

const DEBOUNCE_MS = 300;

interface SearchFieldProps {
  readonly basePath: Route;
  readonly label: string;
  readonly placeholder: string;
  readonly param: string;
  readonly resetParams: readonly string[];
}

export function SearchField({
  basePath,
  label,
  placeholder,
  param,
  resetParams,
}: SearchFieldProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get(param) ?? '');
  const pending = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  function navigate(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    for (const reset of resetParams) params.delete(reset);
    if (term.trim() === '') params.delete(param);
    else params.set(param, term.trim());

    const query = params.toString();
    router.replace(query === '' ? basePath : (`${basePath}?${query}` as Route), { scroll: false });
  }

  function handleChange(term: string) {
    setValue(term);
    clearTimeout(pending.current);
    pending.current = setTimeout(() => {
      navigate(term);
    }, DEBOUNCE_MS);
  }

  return (
    <label className="bg-background border-border focus-within:border-ring flex min-w-[200px] flex-[0_1_250px] items-center gap-2 rounded-[10px] border px-3 py-2 transition-[border-color,box-shadow] duration-[140ms] focus-within:shadow-[0_0_0_3px_rgba(167,190,82,0.14)] max-[560px]:order-first max-[560px]:flex-[1_1_100%]">
      <Search className="text-muted-foreground size-[15px] shrink-0" strokeWidth={1.9} />
      <input
        type="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
        className="text-note text-foreground w-full bg-transparent outline-none placeholder:text-(--txt-faint)"
      />
    </label>
  );
}
