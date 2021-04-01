interface Flashcard {
  question: string;
  answer: string;
}

export interface QueryCatalog {
  id: number;
  name: string;
  flashcards: Flashcard[];
}
