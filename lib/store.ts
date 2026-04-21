'use client';

import { create } from 'zustand';
import type { RiskLevel } from '@/data/mock-risks';

interface DashboardState {
  minScore: number;
  selectedSeverity: RiskLevel | 'All';
  setMinScore: (value: number) => void;
  setSelectedSeverity: (value: RiskLevel | 'All') => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  minScore: 0,
  selectedSeverity: 'All',
  setMinScore: (value) => set({ minScore: value }),
  setSelectedSeverity: (value) => set({ selectedSeverity: value })
}));
