import { Component } from '@angular/core';
import { DbService } from '../_services/db.service';
import { Subject } from '../_models/subject.class';
import { Flashcard } from '../_models/flashcard.class';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  subjectId = 0;
  private cardIndex = 0;
  private subjectMap: { [key: number]: Subject } = {};
  private flashcards: Flashcard[] = [];

  constructor(private dbService: DbService) {
    this.dbService
      .getSubjects()
      .then((subjects) => {
        subjects.forEach((sub) => (this.subjectMap[sub.id || -1] = sub));
        if (subjects.length) this.subjectId = subjects[0].id || -1;
        void this.dbService.getFlashcards(this.subjectId).then((cards) => {
          this.flashcards = cards;
        });
      })
      .catch((err) => console.error(err));
  }

  get flashcard(): Flashcard | undefined {
    if (this.cardIndex >= this.flashcards.length) return undefined;
    return this.flashcards[this.cardIndex];
  }

  get subject(): Subject {
    return this.subjectMap[this.subjectId];
  }

  get subjects(): Subject[] {
    return Object.values(this.subjectMap);
  }

  async switchSubject(subjectId: number): Promise<void> {
    if (!this.subjectMap[subjectId]) return;
    this.subjectId = subjectId;
    this.cardIndex = 0; // reset index to circumvent array index out of bounds
    this.flashcards = await this.dbService.getFlashcards(this.subjectId);
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  switchCard(inc: number): void {
    const cl = this.flashcards.length;
    if (!inc) inc = this.randomNumber(1, cl - 1);
    this.cardIndex = (this.cardIndex + inc) % cl;
    if (this.cardIndex < 0) this.cardIndex = cl - 1;
  }
}
