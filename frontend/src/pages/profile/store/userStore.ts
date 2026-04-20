import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Citizen } from '../../../entities/citizen/types';

interface DraftState {
  draft: Partial<Citizen> | null;
  setDraft: (data: Partial<Citizen>) => void;
  clearDraft: () => void;
}

export const useProfileDraft = create<DraftState>()(
  persist(
    (set) => ({
      draft: null,
      setDraft: (data) => set({ draft: data }),
      clearDraft: () => set({ draft: null }),
    }),
    { name: 'citizen-profile-draft' }
  )
);