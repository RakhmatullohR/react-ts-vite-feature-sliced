import { createEffect } from 'effector';
import { Super } from './types';

// 🔹 Effect: API'dan supers'larni olish
export const fetchSupersFx = createEffect(async (): Promise<Super[]> => {
   const res = await fetch('http://localhost:5000/supers');
   return res.json();
});

// 🔹 Effect: yangi super qo‘shish
export const addSuperFx = createEffect(
   async (newSuper: Omit<Super, 'id'>): Promise<Super> => {
      const res = await fetch('http://localhost:5000/supers', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(newSuper),
      });

      return res.json();
   }
);
// 🔹 Effect: superni o‘chirish
export const deleteSuperFx = createEffect(
   async (id: number): Promise<number> => {
      await fetch(`http://localhost:5000/supers/${id}`, {
         method: 'DELETE',
      });

      return id;
   }
);
// 🔹 Effect: superni yangilash
