import { createEffect } from 'effector';
import { Author } from './types';

export const fetchAuthorsFx = createEffect(async (): Promise<Author[]> => {
   const res = await fetch('http://localhost:5000/authors');
   return await res.json();
});

export const deleteAuthorFx = createEffect(async (id: string) => {
   const res = await fetch(`http://localhost:5000/authors/${id}`, {
      method: 'DELETE',
   });
   await res.json();
   return id;
});

export const addAuthorFx = createEffect(async (author: Author) => {
   const result = await fetch('http://localhost:5000/authors', {
      method: 'POST',
      body: JSON.stringify({
         ...author,
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      }),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return await result.json();
});

export const updateAuthorFx = createEffect(async (author: Author) => {
   await fetch(`http://localhost:5000/authors/${author?.id}`, {
      method: 'PUT',
      body: JSON.stringify(author),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   return author;
});

export const getAuthorByIdFx = createEffect(async (author: Author) => {
   await fetch(`http://localhost:5000/authors/${author.id}`);
   return author;
});

export const onChangeAuthorFx = createEffect(async (author: Author) => {
   return author;
});
