import { combine, createStore } from 'effector';
import { Book } from './types';
import { changeBookFilter } from './events';
import {
   addBookFx,
   deleteBookFx,
   fetchBooksFx,
   getBookByIdFx,
   onChangeBookFx,
   updateBookFx,
} from './effects';

export const $books = createStore<Book[]>([]);
export const $bookFilter = createStore('');

export const $filteredbooks = combine($books, $bookFilter, (books, filter) => {
   if (!filter.trim()) return books;

   return books.filter(
      book =>
         book.title.toLowerCase().includes(filter.toLowerCase()) ||
         book.genre.toLowerCase().includes(filter.toLowerCase())
   );
});

$bookFilter.on(changeBookFilter, (_, filter) => filter);

$books.on(fetchBooksFx.doneData, (_, books) => {
   return books.sort((a: Book, b: Book) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
   });
});

$books.on(deleteBookFx.doneData, (state, deletedId) =>
   state.filter(a => a.id !== deletedId)
);

$books.on(addBookFx.doneData, (state, book) => [book, ...state]);
$books.on(updateBookFx.doneData, (state, book) =>
   state.map(a => (a.id === book?.id ? book : a))
);

$books.on(updateBookFx.doneData, (state, book) =>
   state.map(a => (a.id === book?.id ? book : a))
);

export const $currentBook = createStore<Book | null>(null);

$currentBook.on(getBookByIdFx.doneData, (_, book) => book);
$currentBook.on(onChangeBookFx.doneData, (_, book) => book);
