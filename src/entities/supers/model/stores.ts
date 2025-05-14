import { createStore } from 'effector';
import { addSuperFx, fetchSupersFx } from './effects';
import { Super } from './types';

// 🔹 Store: umumiy superlar ro‘yxati
export const $supers = createStore<Super[]>([])
   .on(fetchSupersFx.doneData, (_, payload) => payload)
   .on(addSuperFx.doneData, (state, payload) => {
      console.log('Super qoʻshildi:', payload);
      return [...state, payload];
   });

// 🔹 Store: filtered superlar
export const $heroes = $supers.map(supers => supers.filter(s => !s.isVillain));
export const $villains = $supers.map(supers => supers.filter(s => s.isVillain));
