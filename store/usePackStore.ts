import { create } from 'zustand';

export interface Activity {
  id: string;
  name: string;
  icon: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: string;
  isPacked: boolean;
  isCustom: boolean;
  isAISuggestion?: boolean;
  quantity: {
    light: number;
    full: number;
  };
}

export interface WeatherData {
  city: string;
  forecast: {
    date: string;
    temp_min: number;
    temp_max: number;
    description: string;
    main: string;
    icon: string;
  }[];
  summary: string;
}

interface PackStore {
  // Form state
  destination: string;
  startDate: Date | null;
  endDate: Date | null;
  selectedActivities: Activity[];
  tripDescription: string;
  
  // Weather and packing
  weatherData: WeatherData | null;
  packingList: PackingItem[];
  isLightPack: boolean;
  isLoading: boolean;
  isLoadingAI: boolean;
  error: string | null;
  
  // Actions
  setDestination: (destination: string) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  toggleActivity: (activity: Activity) => void;
  setTripDescription: (description: string) => void;
  setWeatherData: (data: WeatherData) => void;
  setPackingList: (items: PackingItem[]) => void;
  addAISuggestions: (suggestions: PackingItem[]) => void;
  removeAISuggestions: () => void;
  regenerateAISuggestions: (newSuggestions: PackingItem[]) => void;
  togglePackMode: () => void;
  toggleItemPacked: (itemId: string) => void;
  addCustomItem: (name: string, category: string) => void;
  removeCustomItem: (itemId: string) => void;
  setLoading: (loading: boolean) => void;
  setLoadingAI: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const ACTIVITIES: Activity[] = [
  { id: 'beach', name: 'Beach', icon: '🏖️' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'hiking', name: 'Hiking', icon: '🥾' },
  { id: 'festival', name: 'Festival', icon: '🎪' },
  { id: 'casual', name: 'Casual City', icon: '🚶' },
  { id: 'formal', name: 'Formal Events', icon: '🍸' },
  { id: 'winter', name: 'Winter Sports', icon: '⛷️' },
  { id: 'photography', name: 'Photography', icon: '📸' },
];

export const usePackStore = create<PackStore>((set, get) => {
  const initialState = {
    destination: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    selectedActivities: [] as Activity[],
    tripDescription: '',
    weatherData: null as WeatherData | null,
    packingList: [] as PackingItem[],
    isLightPack: true,
    isLoading: false,
    isLoadingAI: false,
    error: null as string | null,
  };

  const actions = {
    setDestination: (destination: string) => set({ destination }),
    setStartDate: (date: Date | null) => set({ startDate: date }),
    setEndDate: (date: Date | null) => set({ endDate: date }),
    
    toggleActivity: (activity: Activity) => set((state) => {
      const exists = state.selectedActivities.find(a => a.id === activity.id);
      if (exists) {
        return {
          selectedActivities: state.selectedActivities.filter(a => a.id !== activity.id)
        };
      } else {
        return {
          selectedActivities: [...state.selectedActivities, activity]
        };
      }
    }),
    
    setTripDescription: (description: string) => set({ tripDescription: description }),
    setWeatherData: (data: WeatherData) => set({ weatherData: data }),
    setPackingList: (items: PackingItem[]) => set({ packingList: items }),
    
    addAISuggestions: (suggestions: PackingItem[]) => set((state) => ({
      packingList: [...state.packingList, ...suggestions]
    })),
    
    removeAISuggestions: () => set((state) => ({
      packingList: state.packingList.filter(item => !item.isAISuggestion)
    })),
    
    regenerateAISuggestions: async (newSuggestions: PackingItem[]) => set((state) => ({
      packingList: [
        ...state.packingList.filter(item => !item.isAISuggestion),
        ...newSuggestions
      ]
    })),
    
    togglePackMode: () => set((state) => ({ isLightPack: !state.isLightPack })),
    
    toggleItemPacked: (itemId: string) => set((state) => ({
      packingList: state.packingList.map(item =>
        item.id === itemId ? { ...item, isPacked: !item.isPacked } : item
      )
    })),
    
    addCustomItem: (name: string, category: string) => set((state) => {
      const newItem: PackingItem = {
        id: `custom-${Date.now()}`,
        name,
        category,
        isPacked: false,
        isCustom: true,
        quantity: { light: 1, full: 1 }
      };
      return { packingList: [...state.packingList, newItem] };
    }),
    
    removeCustomItem: (itemId: string) => set((state) => ({
      packingList: state.packingList.filter(item => item.id !== itemId)
    })),
    
    setLoading: (loading: boolean) => set({ isLoading: loading }),
    setLoadingAI: (loading: boolean) => set({ isLoadingAI: loading }),
    setError: (error: string | null) => set({ error }),
    
    reset: () => set(initialState),
  };

  return { ...initialState, ...actions };
});