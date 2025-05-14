import { createEffect, createStore, sample } from 'effector';
import { useList } from 'effector-react';
import { useEffect } from 'react';

/**
 * 1. Effekt: userId'larni olish
 */
const getAllIdsFx = createEffect(async () => {
   return [1, 2, 3];
});

/**
 * 2. Effekt: har bir userId uchun postlarni olish
 */
const getPostsByIdsFx = createEffect(async (ids: number[]) => {
   return Promise.all(
      ids.map(async id => {
         const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts?userId=${id}`
         );
         const posts = await res.json();
         return { id, posts };
      })
   );
});

/**
 * 3. sample orqali: birinchi effekt tugaganda, ikkinchisini chaqiramiz
 */
sample({
   clock: getAllIdsFx.doneData,
   target: getPostsByIdsFx,
});

/**
 * 4. postlarni saqlash uchun store
 */
const $postGroups = createStore<{ id: number; posts: any[] }[]>([]).on(
   getPostsByIdsFx.doneData,
   (_, result) => result
);

/**
 * 5. Component: EffectsSequencePage
 */
export const EffectsSequencePage = () => {
   useEffect(() => {
      // sahifa yuklanganda effektni ishga tushiramiz
      getAllIdsFx();
   }, []);

   return (
      <div className='p-4'>
         <h1 className='text-xl font-bold mb-4'>📦 Fetched Posts by User ID</h1>
         {useList($postGroups, ({ id, posts }) => {
            console.log(id);

            return (
               <div key={id} className='mb-8'>
                  <h2 className='text-lg font-semibold text-blue-600'>
                     User ID: {id}
                  </h2>
                  {posts.map(({ title, body, id }, idx) => (
                     <div
                        key={idx}
                        className='border p-2 my-2 rounded shadow-sm'
                     >
                        <h3 className='font-medium'>
                           {id}. {title}
                        </h3>
                        <p>{body}</p>
                     </div>
                  ))}
               </div>
            );
         })}
      </div>
   );
};
