import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Flashcard } from '../_models/flashcard.class';
import {
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

  async getSubjects(): Promise<Subject[]> {
    const raw = await this.subjects.toArray();
    return raw.map(
      (sub) => new StudySmarterSubject((sub as any).studySmarter, sub.id)
    );
  }

  async getFlashcards(subjectId: number): Promise<Flashcard[]> {
    const raw = await this.flashcards.where({ subjectId }).toArray();
    return raw.map(
      (card) =>
        new StudySmarterFlashcard((card as any).studySmarter, card.subjectId)
    );
  }
}
