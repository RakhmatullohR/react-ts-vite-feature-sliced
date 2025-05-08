import { useUnit } from 'effector-react';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
   $filteredAuthors,
   Author,
   changeAuthorFilter,
   deleteAuthorFx,
   fetchAuthorsFx,
} from '@/entities/authors/model';
import { AddEditDrawer } from '@/features/manage-author';
import { Input } from '@/shared/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/shared/ui/table';

export function AuthorsPage() {
   const [filterOpen, setFilterOpen] = useState(false);
   const [filter, setFilter] = useState('');
   const filteredAuthors = useUnit($filteredAuthors);

   useEffect(() => {
      fetchAuthorsFx();
   }, []);

   const handleFilterKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
         changeAuthorFilter(filter);
      }
   };

   return (
      <div className='max-h-full overflow-hidden'>
         <div className='flex items-center justify-between p-4 h-17'>
            <h1 className='text-2xl font-bold'>Authors</h1>
            <div className='flex gap-2 h-full'>
               {filterOpen && (
                  <Input
                     type='search'
                     placeholder='Filter by name'
                     value={filter}
                     onChange={e => {
                        if (e.target.value === '') changeAuthorFilter('');
                        setFilter(e.target.value);
                     }}
                     onKeyDown={handleFilterKeyDown}
                     className='border border-gray-300 rounded px-4 h-full'
                     autoFocus
                  />
               )}
               <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className='bg-blue-500 text-white px-4 py-2 rounded'
               >
                  <SearchIcon className='w-4 h-4' />
               </button>
               <AddEditDrawer author={{ name: '', booksCount: 0 } as Author} />
            </div>
         </div>

         <div className='px-4 pb-2'>
            <div className='border rounded-md overflow-hidden'>
               <div className='relative max-h-[calc(100vh-148px)] overflow-y-auto table-wrapper'>
                  <Table className='min-w-full table table-sticky'>
                     <TableHeader className='bg-background'>
                        <TableRow>
                           <TableHead className='w-[100px]'>id</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Books Count</TableHead>
                           <TableHead className='text-right'>Actions</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {filteredAuthors.map(author => (
                           <TableRow key={author.id}>
                              <TableCell>{author.id}</TableCell>
                              <TableCell>{author.name}</TableCell>
                              <TableCell>{author.booksCount}</TableCell>
                              <TableCell className='text-right'>
                                 <AddEditDrawer author={author}>
                                    <button className='cursor-pointer'>
                                       Edit
                                    </button>
                                 </AddEditDrawer>
                                 <button
                                    onClick={() => {
                                       if (
                                          confirm(
                                             `Are you sure you want to delete ${author.name}?`
                                          )
                                       ) {
                                          deleteAuthorFx(author.id as string);
                                       }
                                    }}
                                    className='text-red-600 ml-2 cursor-pointer'
                                 >
                                    Delete
                                 </button>
                              </TableCell>
                           </TableRow>
                        ))}
                     </TableBody>
                  </Table>
               </div>
            </div>
         </div>
      </div>
   );
}
