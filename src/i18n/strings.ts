/** The site's languages, in the order the flags appear. */
export const langs = ['pt', 'en'] as const;
export type Lang = (typeof langs)[number];

/** Every piece of interface text, in both languages. Trail and section text lives in data/trails.ts. */
export const ui = {
  en: {
    langName: 'English',
    langSwitch: 'Language',
    tagline: 'Walking trails in Porto',
    mapLabel: 'Map of trails',
    comingSoon: 'Coming soon.',
    photoComingSoon: 'Photo coming soon',
    start: 'Start',
    end: 'End',
    route: 'Route',
    circular: 'Circular',
    landmarks: 'Landmarks',
    openPhotos: (name: string) => `Open ${name} photos`,
    photosOf: (name: string) => `${name} photos`,
    photoAlt: (name: string, i: number, n: number) => `${name}, photo ${i} of ${n}`,
    previousPhoto: 'Previous photo',
    nextPhoto: 'Next photo',
    close: 'Close',
  },
  pt: {
    langName: 'Português',
    langSwitch: 'Idioma',
    tagline: 'Percursos a pé no Porto',
    mapLabel: 'Mapa dos percursos',
    comingSoon: 'Em breve.',
    photoComingSoon: 'Fotografia em breve',
    start: 'Início',
    end: 'Fim',
    route: 'Percurso',
    circular: 'Circular',
    landmarks: 'Pontos de interesse',
    openPhotos: (name: string) => `Abrir as fotografias de ${name}`,
    photosOf: (name: string) => `Fotografias de ${name}`,
    photoAlt: (name: string, i: number, n: number) => `${name}, fotografia ${i} de ${n}`,
    previousPhoto: 'Fotografia anterior',
    nextPhoto: 'Fotografia seguinte',
    close: 'Fechar',
  },
} satisfies Record<Lang, unknown>;

export type Strings = (typeof ui)['en'];
