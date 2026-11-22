import { operatorOf, stopName } from './transport';
import type { Lang } from '../i18n/strings';

/** Map pin colour for outer trails (other trails keep Leaflet's blue pin); the "Outer trail" badge uses it too. */
export const OUTER_PIN = '#3a9a4a';

/** Location subsections, in the order they appear. Empty ones are skipped. */
export const areas = [
  'Porto',
  'Matosinhos',
  'Maia',
  'Gondomar',
  'Gaia',
  'Valongo',
  'Trofa',
  'Paredes',
  'Santa Maria da Feira',
  'Ovar',
] as const;

export type Area = (typeof areas)[number];

export type Trail = {
  id: string;
  name: string;
  /** Portuguese name; leave out to use the English one. Start and end are translated through placesPt below. */
  namePt?: string;
  /** Leave out until known; the card shows "—". */
  start?: string;
  /** Where the trail ends; leave out for a circular trail. */
  end?: string;
  circular?: boolean;
  landmarks: string[];
  /** Pin position on the map: [latitude, longitude] of the start. Leave out for no pin. */
  position?: [number, number];
  /** Which location subsection it goes under. */
  area?: Area;
  /** true keeps the trail (and its photos) in the data but leaves it off the page and map. */
  hidden?: boolean;
  /** true for trails further out (beyond Porto's neighbouring municipalities, or harder to reach by public transport); the card and map popup show an "Outer trail" badge and the pin is green. */
  outer?: boolean;
  /** true for places that need a booking or a ticket, or aren't always open; the card and map popup show a "Limited access" badge. */
  limited?: boolean;
};

// Start-point coordinates, from OpenStreetMap.
const CAMPANHA: [number, number] = [41.15073, -8.58564];
const CAROLINA_MICHAELIS: [number, number] = [41.15856, -8.6219];
const HEROISMO: [number, number] = [41.14652, -8.59304];
const ESPOSADE: [number, number] = [41.21603, -8.65456];
const SAO_BENTO: [number, number] = [41.14469, -8.61079]; // São Bento metro station, Porto
const PALMILHEIRA: [number, number] = [41.20226, -8.5569];
const PARQUE_MAIA: [number, number] = [41.22913, -8.62658];
const ISMAI: [number, number] = [41.26886, -8.61543];
const PRACA_DO_IMPERIO: [number, number] = [41.1556, -8.67127];
const MANUEL_LEAO: [number, number] = [41.11064, -8.60003];
const GONDOMAR_SOUTO: [number, number] = [41.1366, -8.53077];
const FANZERES: [number, number] = [41.17127, -8.54278];
// Best matches found on OpenStreetMap; check these.
const MUSAS: [number, number] = [41.15522, -8.60659]; // Empreendimento das Musas, Fontinha
const QUINTA_SALGUEIROS: [number, number] = [41.16551, -8.58442]; // Antiga Quinta de Salgueiros, Campanhã
const VILLAR_D_ALLEN: [number, number] = [41.1438, -8.5714]; // Quinta de Villar d'Allen, Campanhã
const PARQUE_BIOLOGICO: [number, number] = [41.09944, -8.56067]; // Parque Biológico de Gaia, Avintes
const QUINTA_CONCEICAO: [number, number] = [41.19489, -8.68649]; // Quinta da Conceição entrance, Leça da Palmeira
const SERRA_DE_CANELAS: [number, number] = [41.0771, -8.59365]; // Serra de Canelas, Vila Nova de Gaia
const MOINHOS_DE_JANCIDO: [number, number] = [41.09506, -8.48354]; // Trilho dos Moinhos de Jancido, Gondomar
const ALVURA_PARK: [number, number] = [41.21138, -8.59197]; // Parque Fluvial de Alvura, Milheirós, Maia
const MONTE_XISTO: [number, number] = [41.2015, -8.6698]; // Monte Xisto bus stop, Guifões, Matosinhos
const SANATORIO_VALONGO: [number, number] = [41.17941, -8.50901]; // Sanatório de Valongo ruins, Monte Montalto
const TROFA_RIVERSIDE: [number, number] = [41.33617, -8.55894]; // Parque de Nossa Senhora das Dores, by the River Ave, Trofa
const VALONGO_STATION: [number, number] = [41.18825, -8.48727]; // Valongo train station, by the Serras de Valongo
const CETE_STATION: [number, number] = [41.17151, -8.35543]; // Cete train station, Paredes
const RIO_UIMA: [number, number] = [40.9764, -8.50552]; // Parque das Ribeiras do Uíma, Lobão, Santa Maria da Feira
const FERVENCA: [number, number] = [41.35347, -8.58198]; // Fervença, Ribeirão (Famalicão), just north of Trofa
const MIDOES: [number, number] = [41.11397, -8.4742]; // Midões hamlet, Foz do Sousa e Covelo, Gondomar
const BOAVISTA: [number, number] = [41.15897, -8.62927]; // Rotunda da Boavista (Casa da Música metro), Porto
const ESMORIZ_STATION: [number, number] = [40.95785, -8.62714]; // Esmoriz train station, Ovar, near the Barrinha de Esmoriz boardwalks

const allTrails: Trail[] = [
  {
    id: 'hills-of-porto',
    name: 'The Hills of Porto',
    namePt: 'As Colinas do Porto',
    area: 'Porto',
    start: 'Carolina Michaëlis metro station',
    end: 'Campanhã metro station',
    landmarks: [],
    position: CAROLINA_MICHAELIS,
  },
  {
    id: 'hillside-of-valbom',
    name: 'The Hillside of Valbom',
    namePt: 'A Encosta de Valbom',
    area: 'Gondomar',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'former-line-of-alfandega',
    name: 'The Old Alfândega Railway',
    namePt: 'O Antigo Ramal da Alfândega',
    area: 'Porto',
    start: 'Heroísmo metro station',
    end: 'Campanhã metro station',
    landmarks: [],
    position: HEROISMO,
  },
  {
    id: 'leca-river-missing-trail',
    name: 'The Missing Leça River Trail',
    namePt: 'O Trilho Perdido do Rio Leça',
    area: 'Matosinhos',
    start: 'Esposade metro station',
    end: 'Senhor de Matosinhos metro station',
    landmarks: [],
    position: ESPOSADE,
    outer: true,
  },
  {
    id: 'rio-febros-trail',
    name: 'The Febros River Trail',
    namePt: 'O Percurso do Rio Febros',
    area: 'Gaia',
    start: 'São Bento metro station',
    end: 'UNIR bus (Parque Biológico de Gaia)',
    landmarks: [],
    position: SAO_BENTO,
    outer: true,
  },
  {
    id: 'azevedo-yellow-walk',
    name: 'Azevedo and the Yellow Walk',
    namePt: 'Azevedo e o Passeio Amarelo',
    area: 'Porto',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'azevedo-old-paths',
    name: 'Azevedo and the Old Paths',
    namePt: 'Azevedo e os Caminhos Antigos',
    area: 'Porto',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'lipor-hill',
    name: 'LIPOR Hill',
    namePt: 'Monte da LIPOR',
    area: 'Maia',
    start: 'Palmilheira train station',
    circular: true,
    landmarks: [],
    position: PALMILHEIRA,
  },
  {
    id: 'ecocaminho-da-maia',
    name: 'Ecocaminho da Maia',
    area: 'Maia',
    start: 'Parque Maia metro station',
    end: 'Castêlo da Maia metro station',
    landmarks: [],
    position: PARQUE_MAIA,
  },
  {
    id: 'avioso-park',
    name: 'Avioso Park',
    namePt: 'Parque de Avioso',
    area: 'Maia',
    start: 'ISMAI metro station',
    circular: true,
    landmarks: [],
    position: ISMAI,
  },
  {
    id: 'fields-of-foz',
    name: 'The Fields of Foz',
    namePt: 'Os Campos da Foz',
    area: 'Porto',
    start: 'Praça do Império metrobus station',
    circular: true,
    landmarks: [],
    position: PRACA_DO_IMPERIO,
  },
  {
    id: 'tgv-could-have-been',
    name: 'The Laborim Allotments',
    namePt: 'Hortas de Laborim',
    area: 'Gaia',
    start: 'Manuel Leão metro station',
    end: 'Santo Ovídio metro station',
    landmarks: [],
    position: MANUEL_LEAO,
  },
  {
    id: 'archeira-ribeira-and-the-woods',
    name: 'Archeira Ribeira and the Woods',
    namePt: 'A Ribeira da Archeira e os Bosques',
    area: 'Gondomar',
    start: 'STCP Gondomar (Souto)',
    end: 'Campanhã metro station',
    landmarks: [],
    position: GONDOMAR_SOUTO,
  },
  {
    id: 'mount-castro-and-river-torto',
    name: 'Mount Castro and the Torto River',
    namePt: 'O Monte Castro e o Rio Torto',
    area: 'Gondomar',
    start: 'Fânzeres metro station',
    end: 'STCP Gondomar (Souto)',
    landmarks: [],
    position: FANZERES,
  },
  {
    id: 'quebrantoes-paths',
    name: 'The Quebrantões Paths',
    namePt: 'Os Caminhos de Quebrantões',
    area: 'Gaia',
    start: 'Heroísmo metro station',
    end: 'Jardim do Morro metro station',
    landmarks: [],
    position: HEROISMO,
  },
  {
    id: 'romantic-path',
    name: 'Romantic Path',
    namePt: 'Caminho Romântico',
    area: 'Porto',
    start: 'Boavista metro station',
    end: 'STCP 500',
    landmarks: [],
    position: BOAVISTA,
  },

  // Limited access (listed with the urban trails, with a badge)
  {
    id: 'hortas-do-musas',
    name: 'Hortas do Musas',
    area: 'Porto',
    start: 'Trindade metro station',
    circular: true,
    landmarks: [],
    position: MUSAS,
    limited: true,
  },
  {
    id: 'quinta-dos-salgueiros',
    name: 'Quinta dos Salgueiros',
    area: 'Porto',
    start: 'Estádio do Dragão metro station',
    circular: true,
    landmarks: [],
    position: QUINTA_SALGUEIROS,
    limited: true,
  },
  {
    id: 'villar-d-allen',
    name: "Villar d'Allen",
    area: 'Porto',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: VILLAR_D_ALLEN,
    limited: true,
  },
  {
    id: 'biological-park',
    name: 'Gaia Biological Park',
    namePt: 'Parque Biológico de Gaia',
    area: 'Gaia',
    start: 'D. João II metro station',
    circular: true,
    landmarks: [],
    position: PARQUE_BIOLOGICO,
    limited: true,
  },
  {
    id: 'leca-quinta-da-conceicao',
    name: 'Leça Quinta da Conceição',
    namePt: 'Quinta da Conceição, Leça',
    area: 'Matosinhos',
    start: 'Mercado (Matosinhos) metro station',
    circular: true,
    landmarks: [],
    position: QUINTA_CONCEICAO,
    limited: true,
  },

  // Outer trails (further out; shown with an "Outer trail" badge and a green pin)
  {
    id: 'canelas-mountain',
    name: 'Canelas Mountain',
    namePt: 'Serra de Canelas',
    area: 'Gaia',
    start: 'UNIR bus (N1)',
    circular: true,
    landmarks: [],
    position: SERRA_DE_CANELAS,
    outer: true,
  },
  {
    id: 'jancido-mills',
    name: 'Jancido Mills',
    namePt: 'Moinhos de Jancido',
    area: 'Gondomar',
    start: 'UNIR bus (Ribeira, Foz do Sousa)',
    circular: true,
    landmarks: [],
    position: MOINHOS_DE_JANCIDO,
    outer: true,
  },
  {
    id: 'alvura-park',
    name: 'Alvura Park',
    namePt: 'Parque da Alvura',
    area: 'Maia',
    start: 'STCP 7',
    circular: true,
    landmarks: [],
    position: ALVURA_PARK,
    outer: true,
  },
  {
    id: 'north-of-river-leca',
    name: 'North of the Leça River',
    namePt: 'A Norte do Rio Leça',
    area: 'Matosinhos',
    start: 'UNIR bus (Monte Xisto)',
    circular: true,
    landmarks: [],
    position: MONTE_XISTO,
    outer: true,
  },
  {
    id: 'sanatorio-valongo',
    name: 'Sanatório de Valongo',
    area: 'Valongo',
    start: 'STCP 700 (Estrada D. Miguel)',
    circular: true,
    landmarks: [],
    position: SANATORIO_VALONGO,
    outer: true,
  },
  {
    id: 'trofa-riverside',
    name: 'Trofa Riverside',
    namePt: 'Trofa Ribeirinha',
    area: 'Trofa',
    start: 'Trofa train station',
    circular: true,
    landmarks: [],
    position: TROFA_RIVERSIDE,
    outer: true,
  },
  {
    id: 'valongo-trails',
    name: 'Valongo Trails',
    namePt: 'Trilhos de Valongo',
    area: 'Valongo',
    start: 'Valongo train station',
    circular: true,
    landmarks: [],
    position: VALONGO_STATION,
    outer: true,
  },
  {
    id: 'cete',
    name: 'Cete',
    area: 'Paredes',
    start: 'Cete train station',
    circular: true,
    landmarks: [],
    position: CETE_STATION,
    outer: true,
  },
  {
    id: 'rio-uima',
    name: 'The Uíma River',
    namePt: 'O Rio Uíma',
    area: 'Santa Maria da Feira',
    start: 'UNIR bus (N326)',
    circular: true,
    landmarks: [],
    position: RIO_UIMA,
    outer: true,
  },
  {
    id: 'trofa-fervenca',
    name: 'Trofa Fervença',
    area: 'Trofa',
    hidden: true,
    circular: true,
    landmarks: [],
    position: FERVENCA,
    outer: true,
  },
  {
    id: 'midoes-shale-village',
    name: 'Midões Shale Village',
    namePt: 'Aldeia de Xisto de Midões',
    area: 'Gondomar',
    hidden: true,
    circular: true,
    landmarks: [],
    position: MIDOES,
    outer: true,
  },
  {
    id: 'esmoriz-wooden-steps',
    name: 'Esmoriz Wooden Steps',
    namePt: 'Passadiços de Esmoriz',
    area: 'Ovar',
    start: 'Esmoriz train station',
    circular: true,
    landmarks: [],
    position: ESMORIZ_STATION,
    outer: true,
  },
];

/** What the page and map show: every trail not marked hidden. */
export const trails = allTrails.filter((t) => !t.hidden);

/** Portuguese for starts and ends that aren't stops (stops show their bare name next to a badge). A place missing here shows in English. */
const placesPt: Record<string, string> = {
};

/** A trail's name, start and end in the given language. */
export function trailText(trail: Trail, lang: Lang) {
  const place = (s?: string) => {
    if (!s) return s;
    if (operatorOf(s)) return stopName(s);
    return lang === 'pt' ? (placesPt[s] ?? s) : s;
  };
  return {
    name: lang === 'pt' ? (trail.namePt ?? trail.name) : trail.name,
    start: place(trail.start),
    end: place(trail.end),
  };
}
