export type Trail = {
  id: string;
  name: string;
  start: string;
  /** Where the trail ends; leave out for a circular trail. */
  end?: string;
  circular?: boolean;
  landmarks: string[];
  /** Pin position on the map: [latitude, longitude] of the start. */
  position: [number, number];
  /** Image path (e.g. '/trails/hills-of-porto.jpg' in public/); leave out until there is one. */
  image?: string;
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

export const trails: Trail[] = [
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
];
