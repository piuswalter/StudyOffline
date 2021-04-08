/* eslint-disable camelcase */
export interface FlashcardAnswer {
  text: string,
  is_correct: boolean
}

export interface Flashcard {
  id: number,
  flashcardinfo: {
    id: number,
    creator: number,
    question_html: FlashcardAnswer[],
    answer_html: FlashcardAnswer[],
    hint_html: any[],
    solution_html: string,
    tags: any[]
  },
}
