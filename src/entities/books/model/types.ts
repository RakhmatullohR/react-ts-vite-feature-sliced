export type Book = {
   id: string;
   title: string;
   authorId: string;
   authorName: string;
   publishedYear: number;
   genre: BookGenre;
   createdAt: string;
   updatedAt: string;
};

export enum BookGenre {
   FANTASY = 'fantasy',
   SCIENCE_FICTION = 'science fiction',
   MYSTERY = 'mystery',
   THRILLER = 'thriller',
   ROMANCE = 'romance',
   NON_FICTION = 'non-fiction',
   HISTORICAL = 'historical',
   BIOGRAPHY = 'biography',
   SELF_HELP = 'self-help',
   COOKBOOK = 'cookbook',
   CHILDREN = 'children',
   YOUNG_ADULT = 'young adult',
   CLASSIC = 'classic',
   GRAPHIC_NOVEL = 'graphic novel',
   POETRY = 'poetry',
   ANTHOLOGY = 'anthology',
}
