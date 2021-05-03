import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Flashcard } from 'src/app/_models/flashcard.class';

interface ISafeAnswer {
  safeHtml: SafeHtml;
  isCorrect: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.sass']
})
export class FlashcardComponent {
  hideAnswer = true;
  question: SafeHtml = '';
  answer: SafeHtml = '';
  answers: ISafeAnswer[] = [];

  constructor(private domSanitizer: DomSanitizer) {}

  @Output() switchCard = new EventEmitter<number>();

  @Input() set flashcard(flashcard: Flashcard | undefined) {
    if (!flashcard) return;
    this.hideAnswer = true;
    const { question, answers } = flashcard;
    this.question = this.domSanitizer.bypassSecurityTrustHtml(question);
    if (answers.length !== 1) {
      this.answers = answers.map(({ isCorrect, text }) => {
        const safeHtml = this.domSanitizer.bypassSecurityTrustHtml(text);
        return { safeHtml, isCorrect, isSelected: false };
      });
    } else {
      this.answers = [];
      this.answer = this.domSanitizer.bypassSecurityTrustHtml(answers[0].text);
    }
  }

  get isAnswerCorrect(): boolean {
    return this.answers.every(
      (answer) => answer.isSelected === answer.isCorrect
    );
  }

  get isMultipleChoice(): boolean {
    return this.answers.length > 0;
  }

  onCardClicked(idx: number): void {
    if (!this.hideAnswer) return;
    this.answers[idx].isSelected = !this.answers[idx].isSelected;
  }
}
