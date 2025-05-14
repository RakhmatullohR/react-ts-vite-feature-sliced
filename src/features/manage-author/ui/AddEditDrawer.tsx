import { addAuthorFx, Author, updateAuthorFx } from '@/entities/authors/model';
import { Button } from '@/shared/ui/button';
import {
   Drawer,
   DrawerClose,
   DrawerContent,
   DrawerFooter,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from '@/shared/ui/drawer';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AddEditDrawer({
   children,
   author,
}: {
   children?: React.ReactNode;
   author: Author;
}) {
   const [userState, setUserState] = useState<Author | null>(author);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      setUserState(author);
   }, [author]);

   const closeDrawer = () => setOpen(false);

   const handleSubmit = () => {
      if (!userState) return;
      if (!author.id) {
         addAuthorFx(userState);
      } else {
         updateAuthorFx(userState);
      }
      closeDrawer();
   };

   return (
      <Drawer open={open} onOpenChange={setOpen} direction='right'>
         <DrawerTrigger asChild>
            {children || (
               <Button>
                  <Plus />
               </Button>
            )}
         </DrawerTrigger>
         <DrawerContent>
            <div className='mx-auto w-full max-w-sm'>
               <DrawerHeader>
                  <div className='flex items-center justify-between'>
                     <DrawerTitle>Edit Author</DrawerTitle>
                     <DrawerClose asChild>
                        <X />
                     </DrawerClose>
                  </div>
               </DrawerHeader>

               <div className='p-4 pb-0 flex flex-col gap-4'>
                  <div className='flex flex-col gap-2'>
                     <label htmlFor='name'>Name</label>
                     <input
                        id='name'
                        value={userState?.name || ''}
                        onChange={e =>
                           setUserState({
                              ...userState,
                              name: e.target.value,
                           } as Author)
                        }
                        placeholder='Author Name'
                        className='border rounded-md p-2'
                     />
                  </div>
                  <div className='flex flex-col gap-2'>
                     <label htmlFor='booksCount'>Books Count</label>
                     <input
                        type='number'
                        id='booksCount'
                        value={userState?.booksCount || 0}
                        onChange={e =>
                           setUserState({
                              ...userState,
                              booksCount: +e.target.value,
                           } as Author)
                        }
                        placeholder='Books Count'
                        className='border rounded-md p-2'
                     />
                  </div>
                  {/* isDead */}
                  <div className='flex items-center gap-2'>
                     <input
                        type='checkbox'
                        id='isDead'
                        checked={userState?.isDead || false}
                        onChange={e =>
                           setUserState({
                              ...userState,
                              isDead: e.target.checked,
                           } as Author)
                        }
                     />
                     <label htmlFor='isDead'>Is Dead</label>
                  </div>
               </div>

               <DrawerFooter className='flex flex-row justify-end'>
                  <DrawerClose asChild>
                     <Button variant='outline'>Cancel</Button>
                  </DrawerClose>
                  <Button onClick={handleSubmit} className='ml-2'>
                     Submit
                  </Button>
               </DrawerFooter>
            </div>
         </DrawerContent>
      </Drawer>
   );
}
