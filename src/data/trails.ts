/** The page sections, in the order they appear. `pin` is the map pin colour. */
export const sections = [
  { id: 'trails', title: 'Trails', pin: '#2a81cb' },
  { id: 'limited', title: 'Limited availability', pin: '#e07b24' },
  { id: 'outside', title: 'Outside trails', pin: '#3a9a4a' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export type Trail = {
  id: string;
  name: string;
  /** Leave out until known; the card shows "—". */
  start?: string;
  /** Where the trail ends; leave out for a circular trail. */
  end?: string;
  circular?: boolean;
  landmarks: string[];
  /** Pin position on the map: [latitude, longitude] of the start. Leave out for no pin. */
  position?: [number, number];
  /** true keeps the trail (and its photos) in the data but leaves it off the page and map. */
  hidden?: boolean;
  /** Which section it's listed in; leave out for the main "Trails" section. */
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
const SANATORIO_VALONGO: [number, number] = [41.17941, -8.50901]; // Sanatório de Valongo ruins, Monte Montalto
const TROFA_RIVERSIDE: [number, number] = [41.33617, -8.55894]; // Parque de Nossa Senhora das Dores, by the River Ave, Trofa
const VALONGO_STATION: [number, number] = [41.18825, -8.48727]; // Valongo train station, by the Serras de Valongo
const CETE_STATION: [number, number] = [41.17151, -8.35543]; // Cete train station, Paredes
const RIO_UIMA: [number, number] = [40.9764, -8.50552]; // Parque das Ribeiras do Uíma, Lobão, Santa Maria da Feira
const FERVENCA: [number, number] = [41.35347, -8.58198]; // Fervença, Ribeirão (Famalicão), just north of Trofa
const MIDOES: [number, number] = [41.11397, -8.4742]; // Midões hamlet, Foz do Sousa e Covelo, Gondomar

const allTrails: Trail[] = [
  {
    id: 'hills-of-porto',
    name: 'The hills of Porto',
    start: 'Carolina Michaëlis metro station',
    end: 'Campanhã metro station',
    landmarks: [],
    position: CAROLINA_MICHAELIS,
  },
  {
    id: 'hillside-of-valbom',
    name: 'The Hillside of Valbom',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'former-line-of-alfandega',
    name: 'The Former Line of Alfândega',
    start: 'Miradouro das Fontaínhas',
    end: 'Campanhã metro station',
    landmarks: [],
    position: FONTAINHAS,
  },
  {
    id: 'leca-river-missing-trail',
    name: 'Leça River Missing Trail',
    start: 'Esposade metro station',
    end: 'Senhor de Matosinhos metro station',
    landmarks: [],
    position: ESPOSADE,
  },
  {
    id: 'rio-febros-trail',
    name: 'Rio Febros Trail',
    start: 'Ponte Luiz I',
    end: 'Parque Biológico de Gaia',
    landmarks: [],
    position: PONTE_LUIZ_I,
  },
  {
    id: 'azevedo-yellow-walk',
    name: 'Azevedo and the yellow walk',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'azevedo-old-paths',
    name: 'Azevedo and the old paths',
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: CAMPANHA,
  },
  {
    id: 'lipor-hill',
    name: 'LIPOR hill',
    start: 'Palmilheira train station',
    circular: true,
    landmarks: [],
    position: PALMILHEIRA,
  },
  {
    id: 'ecocaminho-da-maia',
    name: 'Ecocaminho da Maia',
    start: 'Parque Maia metro station',
    end: 'Castêlo da Maia',
    landmarks: [],
    position: PARQUE_MAIA,
  },
  {
    id: 'avioso-park',
    name: 'Avioso Park',
    start: 'ISMAI metro station',
    circular: true,
    landmarks: [],
    position: ISMAI,
  },
  {
    id: 'fields-of-foz',
    name: 'The fields of Foz',
    start: 'Praça do Império metrobus station',
    circular: true,
    landmarks: [],
    position: PRACA_DO_IMPERIO,
  },
  {
    id: 'tgv-could-have-been',
    name: 'TGV could have been',
    start: 'Manuel Leão metro station',
    end: 'Santo Ovídio metro station',
    landmarks: [],
    position: MANUEL_LEAO,
  },
  {
    id: 'archeira-ribeira-and-the-woods',
    name: 'Archeira Ribeira and the woods',
    start: 'Gondomar (Souto) bus station',
    end: 'Campanhã metro station',
    landmarks: [],
    position: GONDOMAR_SOUTO,
  },
  {
    id: 'mount-castro-and-river-torto',
    name: 'Mount Castro and River Torto',
    start: 'Fânzeres metro station',
    end: 'Gondomar (Souto) bus station',
    landmarks: [],
    position: FANZERES,
  },
  {
    id: 'quebrantoes-paths',
    name: 'Quebrantões Paths',
    start: 'Miradouro das Fontaínhas',
    end: 'Jardim do Morro metro station',
    landmarks: [],
    position: FONTAINHAS,
  },

  // Limited availability
  {
    id: 'hortas-do-musas',
    name: 'Hortas do Musas',
    start: 'Trindade metro station',
    circular: true,
    landmarks: [],
    position: MUSAS,
    section: 'limited',
  },
  {
    id: 'quinta-dos-salgueiros',
    name: 'Quinta dos Salgueiros',
    start: 'Estádio do Dragão metro station',
    circular: true,
    landmarks: [],
    position: QUINTA_SALGUEIROS,
    section: 'limited',
  },
  {
    id: 'villar-d-allen',
    name: "Villar d'Allen",
    start: 'Campanhã metro station',
    circular: true,
    landmarks: [],
    position: VILLAR_D_ALLEN,
    section: 'limited',
  },
  {
    id: 'biological-park',
    name: 'Biological Park',
    start: 'D. João II metro station',
    circular: true,
    landmarks: [],
    position: PARQUE_BIOLOGICO,
    section: 'limited',
  },
  {
    id: 'leca-quinta-da-conceicao',
    name: 'Leça Quinta da Conceição',
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
    start: 'UNIR bus (N1)',
    circular: true,
    landmarks: [],
    position: SERRA_DE_CANELAS,
    section: 'outside',
  },
  {
    id: 'jancido-mills',
    name: 'Jancido Mills',
    start: 'UNIR bus (Ribeira, Foz do Sousa)',
    circular: true,
    landmarks: [],
    position: MOINHOS_DE_JANCIDO,
    section: 'outside',
  },
  {
    id: 'alvura-park',
    name: 'Alvura Park',
    start: 'STCP 7',
    circular: true,
    landmarks: [],
    position: ALVURA_PARK,
    section: 'outside',
  },
  {
    id: 'north-of-river-leca',
    name: 'North of River Leça',
    circular: true,
    landmarks: [],
    // No pin until the start point is known.
    section: 'outside',
  },
  {
    id: 'sanatorio-valongo',
    name: 'Sanatório de Valongo',
    start: 'STCP 700 (Estrada D. Miguel)',
    circular: true,
    landmarks: [],
    position: SANATORIO_VALONGO,
    section: 'outside',
  },
  {
    id: 'trofa-riverside',
    name: 'Trofa Riverside',
    start: 'Trofa train station',
    circular: true,
    landmarks: [],
    position: TROFA_RIVERSIDE,
    section: 'outside',
  },
  {
    id: 'valongo-trails',
    name: 'Valongo Trails',
    start: 'Valongo train station',
    circular: true,
    landmarks: [],
    position: VALONGO_STATION,
    section: 'outside',
  },
  {
    id: 'cete',
    name: 'Cete',
    start: 'Cete train station',
    circular: true,
    landmarks: [],
    position: CETE_STATION,
    section: 'outside',
  },
  {
    id: 'rio-uima',
    name: 'Rio Uíma',
    start: 'UNIR bus (N326)',
    circular: true,
    landmarks: [],
    position: RIO_UIMA,
    section: 'outside',
  },
  {
    id: 'trofa-fervenca',
    name: 'Trofa Fervença',
    hidden: true,
    circular: true,
    landmarks: [],
    position: FERVENCA,
    section: 'outside',
  },
  {
    id: 'midoes-shale-village',
    name: 'Midões Shale Village',
    hidden: true,
    circular: true,
    landmarks: [],
    position: MIDOES,
    section: 'outside',
  },
];

/** What the page and map show: every trail not marked hidden. */
export const trails = allTrails.filter((t) => !t.hidden);
