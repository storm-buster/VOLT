import { create } from 'zustand';

export type TariffMode = 'peak' | 'mid' | 'sasta';

export interface Appliance {
  id: string;
  name: string;
  iconName: string; // Storing string name since we can't easily store React components in Zustand without issues
  kw: number;
  isOn: boolean;
  dailyHours: number;
  monthlyCost: number;
  category: string;
  smartEnabled: boolean;
  schedule?: string;
}

export const defaultAppliances: Appliance[] = [
  { id: 'ac', name: 'Air Conditioner', iconName: 'AirVent', kw: 1.5, isOn: true, dailyHours: 8, monthlyCost: 540, category: 'Cooling', smartEnabled: true, schedule: '9AM–12PM, 2PM–6PM' },
  { id: 'geyser', name: 'Geyser', iconName: 'Droplets', kw: 2.0, isOn: false, dailyHours: 0.5, monthlyCost: 93, category: 'Heating', smartEnabled: true, schedule: '5:30AM – Sasta tariff' },
  { id: 'fridge', name: 'Refrigerator', iconName: 'Refrigerator', kw: 0.15, isOn: true, dailyHours: 24, monthlyCost: 108, category: 'Kitchen', smartEnabled: false },
  { id: 'wm', name: 'Washing Machine', iconName: 'WashingMachine', kw: 0.5, isOn: false, dailyHours: 0.75, monthlyCost: 35, category: 'Cleaning', smartEnabled: true, schedule: '6AM – Sasta tariff' },
  { id: 'tv', name: 'Television', iconName: 'Tv', kw: 0.1, isOn: true, dailyHours: 5, monthlyCost: 15, category: 'Entertainment', smartEnabled: false },
  { id: 'lights', name: 'LED Lights (8)', iconName: 'Lightbulb', kw: 0.08, isOn: true, dailyHours: 6, monthlyCost: 14, category: 'Lighting', smartEnabled: true },
  { id: 'fan', name: 'Ceiling Fan (3)', iconName: 'Fan', kw: 0.075, isOn: true, dailyHours: 10, monthlyCost: 68, category: 'Cooling', smartEnabled: false },
  { id: 'router', name: 'Wi-Fi Router', iconName: 'Smartphone', kw: 0.012, isOn: true, dailyHours: 24, monthlyCost: 9, category: 'Electronics', smartEnabled: false },
  { id: 'iron', name: 'Iron', iconName: 'Plug', kw: 1.0, isOn: false, dailyHours: 0.3, monthlyCost: 23, category: 'Utilities', smartEnabled: false },
];

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

  // Appliances
  appliances: Appliance[];
  toggleAppliance: (id: string) => void;
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

  appliances: defaultAppliances,
  toggleAppliance: (id) => set((state) => ({
    appliances: state.appliances.map(a => a.id === id ? { ...a, isOn: !a.isOn } : a)
  })),
}));
