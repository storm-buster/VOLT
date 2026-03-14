import { create } from 'zustand';

export type TariffMode = 'peak' | 'mid' | 'sasta';

interface VoltStore {
  // Tariff
  tariffMode: TariffMode;
  setTariffMode: (mode: TariffMode) => void;

  // Live data
  liveKW: number;
  setLiveKW: (kw: number) => void;

  // WebSocket
  wsConnected: boolean;
  setWsConnected: (connected: boolean) => void;

  // Grid Impact
  homesSliderValue: number;
  setHomesSliderValue: (value: number) => void;

  // Colony data
  colonyData: ColonyData;
  setColonyData: (data: ColonyData) => void;
}

export interface FlatData {
  rank: number;
  flat: string;
  savings: number;
  energyScore: number;
  kw: number;
}

export interface ColonyData {
  totalKW: number;
  totalHomes: number;
  totalSaving: number;
  tariff: TariffMode;
  flats: FlatData[];
}

const defaultColonyData: ColonyData = {
  totalKW: 142.7,
  totalHomes: 200,
  totalSaving: 41200,
  tariff: 'mid',
  flats: [
    { rank: 1, flat: 'A-301', savings: 1240, energyScore: 94, kw: 0.52 },
    { rank: 2, flat: 'B-108', savings: 1180, energyScore: 91, kw: 0.61 },
    { rank: 3, flat: 'C-205', savings: 1090, energyScore: 88, kw: 0.68 },
    { rank: 4, flat: 'D-412', savings: 980, energyScore: 85, kw: 0.73 },
    { rank: 5, flat: 'A-104', savings: 920, energyScore: 82, kw: 0.79 },
    { rank: 6, flat: 'B-310', savings: 870, energyScore: 79, kw: 0.84 },
    { rank: 7, flat: 'C-407', savings: 810, energyScore: 76, kw: 0.91 },
    { rank: 8, flat: 'D-202', savings: 760, energyScore: 73, kw: 0.95 },
    { rank: 9, flat: 'A-506', savings: 710, energyScore: 71, kw: 1.02 },
    { rank: 10, flat: 'B-201', savings: 650, energyScore: 68, kw: 1.08 },
  ],
};

export const useVoltStore = create<VoltStore>((set) => ({
  tariffMode: 'mid',
  setTariffMode: (mode) => set({ tariffMode: mode }),

  liveKW: 142.7,
  setLiveKW: (kw) => set({ liveKW: kw }),

  wsConnected: false,
  setWsConnected: (connected) => set({ wsConnected: connected }),

  homesSliderValue: 100,
  setHomesSliderValue: (value) => set({ homesSliderValue: value }),

  colonyData: defaultColonyData,
  setColonyData: (data) => set({ colonyData: data }),
}));
