interface StudySmarterFlashcardAnswer {
  text: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  is_correct: boolean;
}

export interface IStudySmarterFlashcard {
  id?: number;
  subjects: number[];

  flashcardinfo: {
    id?: number;
    creator: number;
    /* eslint-disable @typescript-eslint/naming-convention */
    question_html: StudySmarterFlashcardAnswer[];
    answer_html: StudySmarterFlashcardAnswer[];
    hint_html: string[];
    solution_html: string;
  };
  community_applied_tag_ids: number[];
  /* eslint-enable @typescript-eslint/naming-convention */
}
