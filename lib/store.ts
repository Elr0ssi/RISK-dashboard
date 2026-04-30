'use client';

import { create } from 'zustand';
import type { Category, Period } from '@/lib/data-service';
import { subcategoryMap } from '@/lib/data-service';

interface DashboardState {
  selectedCategory: Category;
  selectedSubcategory: string;
  selectedPeriod: Period;
  selectedCountryIso3: string | null;
  setCategory: (value: Category) => void;
  setSubcategory: (value: string) => void;
  setPeriod: (value: Period) => void;
  setSelectedCountryIso3: (value: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedCategory: 'economy',
  selectedSubcategory: subcategoryMap.economy[0],
  selectedPeriod: 'real-time',
  selectedCountryIso3: null,
  setCategory: (value) =>
    set({
      selectedCategory: value,
      selectedSubcategory: subcategoryMap[value][0]
    }),
  setSubcategory: (value) => set({ selectedSubcategory: value }),
  setPeriod: (value) => set({ selectedPeriod: value }),
  setSelectedCountryIso3: (value) => set({ selectedCountryIso3: value })
}));
