import { Component } from '@angular/core';
import { DbService } from '../_services/db.service';
import { Subject } from '../_models/subject.class';
import { Flashcard } from '../_models/flashcard.class';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  subjectId = 0;
  hideAnswer = true;
  question: SafeHtml = '';
  answer: SafeHtml = '';
  private cardIndex = 0;
  private subjectMap: { [key: number]: Subject } = {};
  private flashcards: Flashcard[] = [];

  constructor(
    private dbService: DbService,
    private domSanitizer: DomSanitizer
  ) {
    this.dbService
      .getSubjects()
      .then((subjects) => {
        subjects.forEach((sub) => (this.subjectMap[sub.id || -1] = sub));
        if (subjects.length) this.subjectId = subjects[0].id || -1;
        void this.dbService.getFlashcards(this.subjectId).then((cards) => {
          this.flashcards = cards;
          this.renderCard();
        });
      })
      .catch((err) => console.error(err));
  }

  get subject(): Subject {
    return this.subjectMap[this.subjectId];
  }

  get subjects(): Subject[] {
    return Object.values(this.subjectMap);
  }

  async switchSubject(subjectId: number): Promise<void> {
    if (this.subjectMap[subjectId]) {
      this.subjectId = subjectId;
      this.flashcards = await this.dbService.getFlashcards(this.subjectId);
      this.cardIndex = 0; // reset index to circumvent array index out of bounds
      this.renderCard();
    }
  }

  renderCard(): void {
    this.hideAnswer = true;
    if (this.flashcards[this.cardIndex]) {
      const { question, answers } = this.flashcards[this.cardIndex];
      this.question = this.domSanitizer.bypassSecurityTrustHtml(question);
      if (answers.length !== 1) {
        this.answer = '<p>Multiple Choice has not implemented yet</p>';
      } else {
        this.answer = this.domSanitizer.bypassSecurityTrustHtml(
          answers[0].text
        );
      }
    }
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  switchCard(inc: number): void {
    const cl = this.flashcards.length;
    if (!inc) inc = this.randomNumber(1, cl - 1);
    this.cardIndex = (this.cardIndex + inc) % cl;
    if (this.cardIndex < 0) this.cardIndex = cl - 1;
    this.renderCard();
  }
}
