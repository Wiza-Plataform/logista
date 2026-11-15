import * as z from 'zod';

export const THEME_PALETTES = ['lime', 'coral', 'forest', 'ocean', 'plum', 'sand'] as const;

export const themePaletteSchema = z.enum(THEME_PALETTES);

export type ThemePalette = z.infer<typeof themePaletteSchema>;

const TEXT_BOUND = 400;
const text = z.string().max(TEXT_BOUND);

const colorSchemeSchema = z.enum(['base', 'soft', 'accent', 'dark']);

export type ColorScheme = z.infer<typeof colorSchemeSchema>;

const visible = { hidden: z.boolean() };
const colored = { ...visible, colorScheme: colorSchemeSchema };

const coloredSectionSchema = z.object(colored);

export type ColoredSection = z.infer<typeof coloredSectionSchema>;

const themeStyleSchema = z.object({
  palette: themePaletteSchema,
  colorMode: z.enum(['light', 'dark']),
  fontPairing: z.enum(['modern', 'classic', 'minimal']),
  buttonShape: z.enum(['pill', 'rounded', 'square']),
  buttonFill: z.enum(['solid', 'outline']),
  cornerStyle: z.enum(['square', 'soft', 'round']),
});

export type ThemeStyle = z.infer<typeof themeStyleSchema>;

const themeAddressSchema = z.object({
  street: text,
  neighborhood: text,
  municipality: text,
  provinceUlid: text,
  referencePoint: text,
});

export type ThemeAddress = z.infer<typeof themeAddressSchema>;

const themeIdentitySchema = z.object({
  storeName: text,
  tagline: text.nullable(),
  whatsapp: text.nullable(),
  instagram: text.nullable(),
  address: themeAddressSchema.nullable(),
});

export type ThemeIdentity = z.infer<typeof themeIdentitySchema>;

const themeSectionsSchema = z.object({
  announcement: z.object({ ...colored, message: text }),
  header: z.object({
    ...colored,
    layout: z.enum(['logoLeft', 'logoCenter', 'compact']),
    showSearch: z.boolean(),
    sticky: z.boolean(),
  }),
  banner: z.object({
    ...colored,
    layout: z.enum(['overlay', 'split', 'textOnly']),
    height: z.enum(['small', 'medium', 'large']),
    title: text,
    buttonLabel: text,
  }),
  categories: z.object({
    ...colored,
    style: z.enum(['chips', 'tabs', 'icons']),
    alignment: z.enum(['left', 'center']),
  }),
  products: z.object({
    ...colored,
    title: text,
    layout: z.enum(['grid', 'list', 'carousel', 'featured']),
    desktopColumns: z.union([z.literal(2), z.literal(3), z.literal(4)]),
    imageRatio: z.enum(['square', 'portrait', 'tall']),
    cardStyle: z.enum(['plain', 'card', 'overlay']),
    showPrice: z.boolean(),
    showOrderButton: z.boolean(),
    showNewBadge: z.boolean(),
  }),
  about: z.object({ ...colored, layout: z.enum(['textImage', 'centered']) }),
  faq: coloredSectionSchema.nullable(),
  instagram: coloredSectionSchema.nullable(),
  footer: z.object({ ...colored, showContacts: z.boolean() }),
  whatsappButton: z.object({
    ...visible,
    style: z.enum(['icon', 'iconText']),
    label: text,
    side: z.enum(['right', 'left']),
  }),
});

export type ThemeSections = z.infer<typeof themeSectionsSchema>;

const pageSectionSchema = z.enum(['banner', 'categories', 'products', 'about', 'faq', 'instagram']);

export type PageSection = z.infer<typeof pageSectionSchema>;

export const themeDraftSchema = z.object({
  template: z.enum(['showcase', 'boutique', 'catalog', 'vibrant']),
  style: themeStyleSchema,
  identity: themeIdentitySchema,
  sections: themeSectionsSchema,
  pageOrder: z.array(pageSectionSchema).max(6),
});

export type ThemeDraft = z.infer<typeof themeDraftSchema>;

const themePublicationSchema = z.object({
  revision: z.number().int(),
  publishedAt: z.string(),
});

export type ThemePublication = z.infer<typeof themePublicationSchema>;

const themeMediaSchema = z.object({
  logoUrl: z.url().nullable(),
  bannerImage: z.object({ url: z.url(), mobileUrl: z.url() }).nullable(),
});

export type ThemeMedia = z.infer<typeof themeMediaSchema>;

export const storeThemeSchema = themeDraftSchema.extend({
  revision: z.number().int(),
  publication: themePublicationSchema.nullable(),
  media: themeMediaSchema,
});

export type StoreTheme = z.infer<typeof storeThemeSchema>;
