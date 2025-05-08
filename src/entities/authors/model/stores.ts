import { combine, createStore } from 'effector';
import {
   addAuthorFx,
   deleteAuthorFx,
   fetchAuthorsFx,
   getAuthorByIdFx,
   onChangeAuthorFx,
   updateAuthorFx,
} from './effects';
import { changeAuthorFilter } from './events';
import { Author } from './types';

export const $authors = createStore<Author[]>([]);
export const $authorFilter = createStore('');

export const $filteredAuthors = combine(
   $authors,
   $authorFilter,
   (authors, filter) => {
      if (!filter.trim()) return authors;

      return authors.filter(author =>
         author.name.toLowerCase().includes(filter.toLowerCase())
      );
   }
);

$authorFilter.on(changeAuthorFilter, (_, filter) => filter);

$authors.on(fetchAuthorsFx.doneData, (_, authors) => {
   return authors.sort((a: Author, b: Author) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
   });
});

$authors.on(deleteAuthorFx.doneData, (state, deletedId) =>
   state.filter(a => a.id !== deletedId)
);

$authors.on(addAuthorFx.doneData, (state, author) => [author, ...state]);

$authors.on(updateAuthorFx.doneData, (state, author) =>
   state.map(a => (a.id === author?.id ? author : a))
);

export const $currentAuthor = createStore<Author | null>(null);

$currentAuthor.on(getAuthorByIdFx.doneData, (_, author) => author);
$currentAuthor.on(onChangeAuthorFx.doneData, (_, author) => author);
