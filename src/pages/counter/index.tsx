import { createEvent, createStore } from 'effector';
import { useUnit } from 'effector-react';
import { useState } from 'react';

// Eventlar
export const incremented = createEvent<void>(); // hech narsa olmaydi
export const decremented = createEvent<void>(); // hech narsa olmaydi
export const setCounter = createEvent<number>(); // 1ta parametr oladi

// Store
export const $counter = createStore<number>(0)
   .on(incremented, state => state + 1)
   .on(decremented, state => state - 1)
   .on(setCounter, (_, newValue) => newValue);
$counter.watch(state => {
   console.log('Counter store yangilandi:', state);
});
incremented.watch(() => {
   console.log('Incremented event chaqirildi');
});
setCounter.watch(newValue => {
   console.log('SetCounter event chaqirildi:', newValue);
});
export function CounterPage() {
   const { counter, onIncremented, onDecremented, onSetCounter } = useUnit({
      counter: $counter,
      onIncremented: incremented,
      onDecremented: decremented,
      onSetCounter: setCounter,
   });

   const [inputValue, setInputValue] = useState('');

   const handleSubmit = () => {
      const num = parseInt(inputValue);
      if (!isNaN(num)) {
         onSetCounter(num); // inputdan olingan sonni store ga yuboradi
         setInputValue(''); // inputni tozalash
      }
   };

   return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
         <h1 className='text-4xl font-bold mb-4'>Count: {counter}</h1>
         <div className='space-x-4'>
            <button
               onClick={onDecremented}
               className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            >
               Decrement
            </button>
            <button
               onClick={onIncremented}
               className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
               Increment
            </button>
         </div>
         <input
            type='number'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className='border px-4 py-2 rounded mb-4 mt-4'
            placeholder='Enter number...'
         />

         <button
            onClick={handleSubmit}
            className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
         >
            Set Count
         </button>
      </div>
   );
}
