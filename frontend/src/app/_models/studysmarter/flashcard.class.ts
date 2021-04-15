import { Flashcard, IAnswer } from '../flashcard.class';
import { Origin } from '../origin.enum';

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

export class StudySmarterFlashcard extends Flashcard {
  private studySmarter: IStudySmarterFlashcard;
  readonly origin = Origin.studySmarter;

  constructor(flashcard: IStudySmarterFlashcard, subjectId: number) {
    super({ subjectId });
    this.studySmarter = flashcard;
  }

  private get flashcardinfo() {
    return this.studySmarter.flashcardinfo;
  }

  get question(): string {
    if (!this.flashcardinfo.question_html.length) return '';
    return this.flashcardinfo.question_html[0].text;
  }

  get answers(): IAnswer[] {
    return this.flashcardinfo.answer_html.map((answr) => ({
      text: answr.text,
      isCorrect: answr.is_correct
    }));
  }

  get hints(): string[] {
    return this.flashcardinfo.hint_html;
  }

  get solution(): string {
    return this.flashcardinfo.solution_html;
  }

  get tags(): number[] {
    return [];
  }
}
