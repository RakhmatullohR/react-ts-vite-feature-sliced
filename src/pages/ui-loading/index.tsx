import { Button } from '@/shared/ui/button';
import { createEffect, sample } from 'effector';
import { createGate, useGate, useUnit } from 'effector-react';

// Asinxron effekt yaratish (1 soniya kutish)
const myVerySideEffectFx = createEffect(async (id: string) => {
   console.log('Effekt ishga tushdi', id);
   await new Promise<void>(resolve => {
      setTimeout(() => {
         resolve();
      }, 3000);
   });
});

// Gate yaratish (komponentni boshqarish uchun)
const SampleCompGate = createGate<string>();

// sample yordamida gate ochilganida effektni ishga tushirish
sample({
   clock: SampleCompGate.open,
   target: myVerySideEffectFx,
});

// Effekt tugallanganini kuzatib borish
myVerySideEffectFx.done.watch(() => console.log('Effekt tugadi'));

// Loading komponenti
const Loading = () => <div>I am loading...</div>;

// Form komponenti
const OpenGateWrapper = () => (
   <div className='flex flex-col gap-4 p-4 border rounded shadow-md w-80'>
      <h2 className='text-lg font-bold'>Open Gate Example</h2>
      <p className='text-sm text-gray-600'>
         Press the button to open the gate and start the effect.
      </p>
      <Button
         type='button'
         onClick={e => {
            e.preventDefault();
            SampleCompGate.open('my-id'); // Gate ochish
            console.log('Form submitted');
         }}
         className='p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600'
      >
         Open Gate
      </Button>
   </div>
);

// UILoadingPage sahifasi
export const UILoadingPage = () => {
   // Gate ochish
   useGate(SampleCompGate);

   // Effektning holatini olish
   const loading = useUnit(myVerySideEffectFx.pending);

   return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
         {/* Agar loading bo'lsa, Loading komponentini ko'rsatamiz */}
         {loading ? <Loading /> : <OpenGateWrapper />}
      </div>
   );
};
