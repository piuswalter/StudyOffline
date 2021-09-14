import { IStudySmarterFlashcard } from '.';
import { Flashcard, IAnswer } from '../flashcard.class';
import { Origin } from '../origin.enum';

export class StudySmarterFlashcard extends Flashcard {
  studySmarter: IStudySmarterFlashcard;
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
    return this.studySmarter.community_applied_tag_ids;
  }
}
