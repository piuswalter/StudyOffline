import { Tag } from ".";

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
    hint_html: string[],
    solution_html: string
  },
  tags: any[], // empty
  community_applied_tag_ids: Tag[],
}
