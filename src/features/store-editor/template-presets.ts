import type { ThemeDraft } from '@/shared/contracts/store-theme';

import type { DraftChange } from './draft-model';

type Sections = ThemeDraft['sections'];
type Template = ThemeDraft['template'];

interface TemplatePreset {
  readonly style: Pick<ThemeDraft['style'], 'fontPairing' | 'buttonShape' | 'cornerStyle'>;
  readonly header: Pick<Sections['header'], 'layout'>;
  readonly banner: Pick<Sections['banner'], 'layout' | 'height'>;
  readonly products: Partial<
    Pick<Sections['products'], 'layout' | 'desktopColumns' | 'imageRatio' | 'cardStyle'>
  >;
  readonly categories: Pick<Sections['categories'], 'style' | 'alignment'>;
  readonly about: Pick<Sections['about'], 'layout'>;
}

const PRESETS = new Map<Template, TemplatePreset>([
  [
    'showcase',
    {
      style: { fontPairing: 'modern', buttonShape: 'pill', cornerStyle: 'soft' },
      header: { layout: 'logoLeft' },
      banner: { layout: 'overlay', height: 'medium' },
      products: { layout: 'grid', desktopColumns: 3, imageRatio: 'square', cardStyle: 'card' },
      categories: { style: 'chips', alignment: 'left' },
      about: { layout: 'textImage' },
    },
  ],
  [
    'boutique',
    {
      style: { fontPairing: 'classic', buttonShape: 'square', cornerStyle: 'square' },
      header: { layout: 'logoCenter' },
      banner: { layout: 'split', height: 'large' },
      products: { layout: 'featured', imageRatio: 'portrait', cardStyle: 'plain' },
      categories: { style: 'tabs', alignment: 'center' },
      about: { layout: 'centered' },
    },
  ],
  [
    'catalog',
    {
      style: { fontPairing: 'minimal', buttonShape: 'rounded', cornerStyle: 'soft' },
      header: { layout: 'compact' },
      banner: { layout: 'textOnly', height: 'small' },
      products: { layout: 'list', imageRatio: 'square', cardStyle: 'card' },
      categories: { style: 'chips', alignment: 'left' },
      about: { layout: 'centered' },
    },
  ],
  [
    'vibrant',
    {
      style: { fontPairing: 'modern', buttonShape: 'pill', cornerStyle: 'round' },
      header: { layout: 'logoCenter' },
      banner: { layout: 'overlay', height: 'large' },
      products: { layout: 'carousel', imageRatio: 'portrait', cardStyle: 'overlay' },
      categories: { style: 'icons', alignment: 'center' },
      about: { layout: 'textImage' },
    },
  ],
]);

export function applyTemplate(template: Template): DraftChange {
  return (draft) => {
    const preset = PRESETS.get(template);
    if (preset === undefined) return draft;
    const { sections } = draft;
    return {
      ...draft,
      template,
      style: { ...draft.style, ...preset.style },
      sections: {
        ...sections,
        header: { ...sections.header, ...preset.header },
        banner: { ...sections.banner, ...preset.banner },
        products: { ...sections.products, ...preset.products },
        categories: { ...sections.categories, ...preset.categories },
        about: { ...sections.about, ...preset.about },
      },
    };
  };
}
