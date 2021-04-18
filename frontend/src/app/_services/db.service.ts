import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';
import { Flashcard } from '../_models/flashcard.class';
import {
  IStudySmarterFlashcard,
  IStudySmarterSubject,
  StudySmarterFlashcard,
  StudySmarterSubject
} from '../_models/studysmarter';
import { Subject } from '../_models/subject.class';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  subjects!: Dexie.Table<Subject, number>;
  flashcards!: Dexie.Table<Flashcard, number>;

  constructor() {
    super('StudyOffline');
    this.version(1).stores({
      subjects: '++id,&studySmarter.id',
      flashcards: '++id,subjectId'
    });
  }

  addSubject(subject: IStudySmarterSubject): Observable<number> {
    return from(this.subjects.add(new StudySmarterSubject(subject)));
  }

  async getSubjects(): Promise<Subject[]> {
    const raw = await this.subjects.toArray();
    return raw.map(
      (sub) =>
        new StudySmarterSubject(
          (sub as StudySmarterSubject).studySmarter,
          sub.id
        )
    );
  }

  addFlashcards(
    flashcards: IStudySmarterFlashcard[],
    subjectId: number
  ): Observable<number> {
    return from(
      this.flashcards.bulkAdd(
        flashcards.map((card) => new StudySmarterFlashcard(card, subjectId))
      )
    );
  }

  async getFlashcards(subjectId: number): Promise<Flashcard[]> {
    const raw = await this.flashcards.where({ subjectId }).toArray();
    return raw.map(
      (card) =>
        new StudySmarterFlashcard(
          (card as StudySmarterFlashcard).studySmarter,
          card.subjectId
        )
    );
  }
}
