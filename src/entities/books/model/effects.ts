import { createEffect } from 'effector';
import { Book } from './types';

export const fetchBooksFx = createEffect(async (): Promise<Book[]> => {
   const res = await fetch('http://localhost:5000/books');
   return await res.json();
});

export const deleteBookFx = createEffect(async (id: string) => {
   const res = await fetch(`http://localhost:5000/books/${id}`, {
      method: 'DELETE',
   });
   await res.json();
   return id;
});

export const addBookFx = createEffect(async (book: Book) => {
   const result = await fetch('http://localhost:5000/books', {
      method: 'POST',
      body: JSON.stringify({
         ...book,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      }),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return await result.json();
});

export const updateBookFx = createEffect(async (book: Book) => {
   await fetch(`http://localhost:5000/books/${book?.id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return book;
});

export const getBookByIdFx = createEffect(async (bookId: string) => {
   const res = await fetch(`http://localhost:5000/books/${bookId}`);
   return await res.json();
});

export const onChangeBookFx = createEffect(async (book: Book) => {
   return book;
});
