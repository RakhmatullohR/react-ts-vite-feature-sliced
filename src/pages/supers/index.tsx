import {
   $supers,
   appStarted,
   deleteSuperFx,
   formSubmitted,
} from '@/entities/supers/model';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/ui/table';
import { useUnit } from 'effector-react';
import { Angry, Smile } from 'lucide-react';
import { useEffect, useState } from 'react';

// 🔹 Komponent
export function SupersPage() {
   const supers = useUnit($supers);

   const [formState, setFormState] = useState({
      name: '',
      isVillain: false,
   });
   const { name, isVillain } = formState;

   useEffect(() => {
      appStarted(); // yuklashda supers'larni olib kelish
   }, []);

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim()) return;
      formSubmitted({ name: name.trim(), isVillain });
      setFormState({ name: '', isVillain: false }); // forma tozalash
   };

   return (
      <div className='p-4 font-sans space-y-6 min-w-full mx-auto'>
         <h1 className='text-2xl font-bold'>
            {/* 🦸 Superlar Roʻyxati */}
            List
         </h1>

         <form
            onSubmit={handleSubmit}
            className='flex gap-2 items-center max-w-xl'
         >
            <input
               type='text'
               placeholder='Ism...'
               className='border rounded px-2 py-1 flex-1'
               value={name}
               onChange={e =>
                  setFormState({ ...formState, name: e.target.value })
               }
            />
            <label className='flex items-center gap-1'>
               <input
                  type='checkbox'
                  checked={isVillain}
                  onChange={e =>
                     setFormState({ ...formState, isVillain: e.target.checked })
                  }
               />
               isVillain
            </label>
            <button
               type='submit'
               className='bg-blue-500 text-white px-3 py-1 rounded'
            >
               Qoʻshish
            </button>
         </form>

         <div className='relative max-h-[calc(100vh-248px)] min-w-full overflow-y-auto table-wrapper'>
            <Table className='min-w-full table table-sticky'>
               <TableHeader className='sticky top-0 bg-gray-700'>
                  <TableRow className='h-10'>
                     <TableHead className=''>#</TableHead>
                     <TableHead className=''>Name</TableHead>
                     <TableHead className=''>isVillain</TableHead>
                     <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {supers.map((s, i) => (
                     <TableRow key={s.id}>
                        <TableCell className=''>{i + 1}</TableCell>
                        <TableCell className=''>{s.name}</TableCell>
                        <TableCell className=''>
                           {s.isVillain ? (
                              <Angry color='red' />
                           ) : (
                              <Smile color='green' />
                           )}
                        </TableCell>
                        <TableCell className='text-right'>
                           <button
                              onClick={() => deleteSuperFx(s.id)}
                              className='cursor-pointer text-red-500'
                           >
                              Oʻchirish
                           </button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </div>
   );
}
