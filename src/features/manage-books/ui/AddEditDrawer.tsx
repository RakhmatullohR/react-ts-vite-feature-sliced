'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { $authors, fetchAuthorsFx } from '@/entities/authors/model';
import {
   addBookFx,
   Book,
   BookGenre,
   updateBookFx,
} from '@/entities/books/model';
import { useUnit } from 'effector-react';

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
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/shared/ui/select';

import { Plus, X } from 'lucide-react';

const formSchema = z.object({
   title: z.string().min(1, 'Title is required'),
   authorId: z.string().min(1, 'Author is required'),
   authorName: z.string().min(1, 'Author is required'),
   genre: z.nativeEnum(BookGenre, {
      errorMap: () => ({ message: 'Genre is required' }),
   }),
   publishedYear: z.coerce.number().min(1000, 'Valid year required'),
});

export function AddEditDrawer({
   children,
   book,
}: {
   children?: React.ReactNode;
   book: Book;
}) {
   const authors = useUnit($authors);
   const [open, setOpen] = useState(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: '',
         authorId: '',
         authorName: '',
         genre: BookGenre.FANTASY,
         publishedYear: new Date().getFullYear(),
      },
   });

   useEffect(() => {
      if (book?.id) {
         form.reset(book);
      } else {
         form.reset({
            title: '',
            authorId: '',
            authorName: '',
            genre: BookGenre.FANTASY,
            publishedYear: new Date().getFullYear(),
         });
      }
   }, [book, form]);

   useEffect(() => {
      fetchAuthorsFx();
   }, []);

   const closeDrawer = () => setOpen(false);

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      if (book?.id) {
         updateBookFx({ ...book, ...values });
      } else {
         addBookFx({ ...book, ...values });
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
                     <DrawerTitle>
                        {book?.id ? 'Edit Book' : 'Add Book'}
                     </DrawerTitle>
                     <DrawerClose asChild>
                        <X />
                     </DrawerClose>
                  </div>
               </DrawerHeader>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className='p-4 pb-0 space-y-4'
                  >
                     {/* Title */}
                     <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                 <Input placeholder='Book title' {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Author */}
                     <FormField
                        control={form.control}
                        name='authorId'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Author</FormLabel>
                              <Select
                                 onValueChange={val => {
                                    const author = authors.find(
                                       a => a.id === val
                                    );
                                    form.setValue('authorId', val);
                                    form.setValue(
                                       'authorName',
                                       author?.name || ''
                                    );
                                 }}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder='Select an author' />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectGroup>
                                       {authors.map(author => (
                                          <SelectItem
                                             key={author.id}
                                             value={author.id}
                                          >
                                             {author.name}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Genre */}
                     <FormField
                        control={form.control}
                        name='genre'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Genre</FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder='Select genre' />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectGroup>
                                       {Object.values(BookGenre).map(genre => (
                                          <SelectItem key={genre} value={genre}>
                                             {genre}
                                          </SelectItem>
                                       ))}
                                    </SelectGroup>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Published Year */}
                     <FormField
                        control={form.control}
                        name='publishedYear'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Published Year</FormLabel>
                              <FormControl>
                                 <Input
                                    type='number'
                                    placeholder='e.g. 2020'
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>

               <DrawerFooter className='flex justify-end'>
                  <DrawerClose asChild>
                     <Button variant='outline'>Cancel</Button>
                  </DrawerClose>
                  <Button
                     onClick={form.handleSubmit(onSubmit)}
                     className='ml-2'
                  >
                     Submit
                  </Button>
               </DrawerFooter>
            </div>
         </DrawerContent>
      </Drawer>
   );
}
