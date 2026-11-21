import { operatorOf, stopName } from './transport';
import type { Lang } from '../i18n/strings';

/** The page sections, in the order they appear: heading, the line under it (each in English and Portuguese), and map pin colour. */
export const sections = [
  {
    id: 'trails',
    title: 'Urban Trails',
    titlePt: 'Percursos Urbanos',
    description: 'Trails that start in the city centre or at a metro station, short enough to walk after work.',
    descriptionPt: 'Percursos que começam no centro da cidade ou numa estação de metro, curtos o suficiente para fazer depois do trabalho.',
    pin: '#2a81cb',
  },
  {
    id: 'limited',
    title: 'Limited availability',
    titlePt: 'Acesso limitado',
    description: "Places that need a booking or a ticket, or that aren't always open to the public.",
    descriptionPt: 'Locais que precisam de marcação ou de bilhete, ou que nem sempre estão abertos ao público.',
    pin: '#e07b24',
  },
  {
    id: 'outside',
    title: 'Outside trails',
    titlePt: 'Percursos mais longe',
    description:
      "Trails beyond Porto's neighbouring municipalities, or ones you can reach by public transport but that take more effort to get to.",
    descriptionPt:
      'Percursos para lá dos concelhos vizinhos do Porto, ou a que se chega de transportes públicos mas com mais esforço.',
    pin: '#3a9a4a',
  },
] as const;

export type SectionId = (typeof sections)[number]['id'];

/** Location subsections (Trails and Outside trails), in the order they appear. Empty ones are skipped. */
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
  /** Which section it's listed in; leave out for "Urban Trails". */
  section?: SectionId;
};

// Start-point coordinates, from OpenStreetMap.
const CAMPANHA: [number, number] = [41.15073, -8.58564];
const CAROLINA_MICHAELIS: [number, number] = [41.15856, -8.6219];
const FONTAINHAS: [number, number] = [41.14256, -8.60091];
const ESPOSADE: [number, number] = [41.21603, -8.65456];
const PONTE_LUIZ_I: [number, number] = [41.13966, -8.60935];
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
    start: 'Miradouro das Fontaínhas',
    end: 'Campanhã metro station',
    landmarks: [],
    position: FONTAINHAS,
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
  },
  {
    id: 'rio-febros-trail',
    name: 'The Febros River Trail',
    namePt: 'O Percurso do Rio Febros',
    area: 'Gaia',
    start: 'Ponte Luiz I',
    end: 'Parque Biológico de Gaia',
    landmarks: [],
    position: PONTE_LUIZ_I,
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
    end: 'Castêlo da Maia',
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
    start: 'Gondomar (Souto) bus station',
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
    end: 'Gondomar (Souto) bus station',
    landmarks: [],
    position: FANZERES,
  },
  {
    id: 'quebrantoes-paths',
    name: 'The Quebrantões Paths',
    namePt: 'Os Caminhos de Quebrantões',
    area: 'Gaia',
    start: 'Miradouro das Fontaínhas',
    end: 'Jardim do Morro metro station',
    landmarks: [],
    position: FONTAINHAS,
  },
  {
    id: 'romantic-path',
    name: 'Romantic Path',
    namePt: 'Caminho Romântico',
    area: 'Porto',
    start: 'Boavista metro station',
    end: 'Douro River',
    landmarks: [],
    position: BOAVISTA,
  },

  // Limited availability
  {
    id: 'hortas-do-musas',
    name: 'Hortas do Musas',
    area: 'Porto',
    start: 'Trindade metro station',
    circular: true,
    landmarks: [],
    position: MUSAS,
    section: 'limited',
  },
  {
    id: 'quinta-dos-salgueiros',
    name: 'Quinta dos Salgueiros',
    area: 'Porto',
    start: 'Estádio do Dragão metro station',
    circular: true,
    landmarks: [],
    position: QUINTA_SALGUEIROS,
    section: 'limited',
  },
  {
    id: 'villar-d-allen',
    name: "Villar d'Allen",
    area: 'Porto',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: VILLAR_D_ALLEN,
    section: 'limited',
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
    section: 'limited',
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
    section: 'limited',
  },

  // Outside trails
  {
    id: 'canelas-mountain',
    name: 'Canelas Mountain',
    namePt: 'Serra de Canelas',
    area: 'Gaia',
    start: 'UNIR bus (N1)',
    circular: true,
    landmarks: [],
    position: SERRA_DE_CANELAS,
    section: 'outside',
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
    section: 'outside',
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
    section: 'outside',
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
    section: 'outside',
  },
  {
    id: 'sanatorio-valongo',
    name: 'Sanatório de Valongo',
    area: 'Valongo',
    start: 'STCP 700 (Estrada D. Miguel)',
    circular: true,
    landmarks: [],
    position: SANATORIO_VALONGO,
    section: 'outside',
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
    section: 'outside',
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
    section: 'outside',
  },
  {
    id: 'cete',
    name: 'Cete',
    area: 'Paredes',
    start: 'Cete train station',
    circular: true,
    landmarks: [],
    position: CETE_STATION,
    section: 'outside',
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
    section: 'outside',
  },
  {
    id: 'trofa-fervenca',
    name: 'Trofa Fervença',
    area: 'Trofa',
    hidden: true,
    circular: true,
    landmarks: [],
    position: FERVENCA,
    section: 'outside',
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
    section: 'outside',
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
    section: 'outside',
  },
];

/** What the page and map show: every trail not marked hidden. */
export const trails = allTrails.filter((t) => !t.hidden);

/** Portuguese for starts and ends that aren't stops (stops show their bare name next to a badge). A place missing here shows in English. */
const placesPt: Record<string, string> = {
  'Douro River': 'Rio Douro',
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

/** A section's heading and description in the given language. */
export function sectionText(section: (typeof sections)[number], lang: Lang) {
  return lang === 'pt'
    ? { title: section.titlePt, description: section.descriptionPt }
    : { title: section.title, description: section.description };
}
