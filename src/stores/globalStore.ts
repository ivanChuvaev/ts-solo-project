import type { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { WeatherApiForecastResponse } from '../types/WeatherApiForecastResponse';

type StoreType = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  currentPlaceInfo: null | WeatherApiForecastResponse;
  setCurrentPlaceInfo: Dispatch<SetStateAction< null | WeatherApiForecastResponse>>;
};

export const useGlobalStore = create<StoreType>()(
  devtools((set, get) => ({
    search: '',
    setSearch: (newSearch) =>
      set({ search: typeof newSearch === 'function' ? newSearch(get().search) : newSearch }),
    currentPlaceInfo: null,
    setCurrentPlaceInfo: (newCurrentPlaceInfo) =>
      set({
        currentPlaceInfo:
          typeof newCurrentPlaceInfo === 'function'
            ? newCurrentPlaceInfo(get().currentPlaceInfo)
            : newCurrentPlaceInfo,
      }),
  })),
);

type State<T> = [T, Dispatch<SetStateAction<T>>];

export const useGlobalSearch = (): State<StoreType['search']> =>
  useGlobalStore((state) => [state.search, state.setSearch]);

export const useGlobalCurrentPlaceInfo = (): State<StoreType['currentPlaceInfo']> =>
  useGlobalStore((state) => [state.currentPlaceInfo, state.setCurrentPlaceInfo]);
