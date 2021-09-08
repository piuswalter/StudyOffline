import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { from, Observable } from 'rxjs';
import { Flashcard } from '../_models/flashcard.class';
import {
  IStudySmarterFlashcard,
  IStudySmarterSubject,
  IStudySmarterTag,
  StudySmarterFlashcard,
  StudySmarterSubject,
  StudySmarterTag
} from '../_models/studysmarter';
import { Subject } from '../_models/subject.class';
import { Tag } from '../_models/tag.class';

@Injectable({
  providedIn: 'root'
})
export class DbService extends Dexie {
  subjects!: Dexie.Table<Subject, number>;
  flashcards!: Dexie.Table<Flashcard, number>;
  tags!: Dexie.Table<Tag, number>;

  constructor() {
    super('StudyOffline');
    this.version(1).stores({
      subjects: '++id,&studySmarter.id',
      flashcards: '++id,subjectId',
      tags: '++id,&studySmarter.id,subjectId'
    });
  }

  addSubject(subject: IStudySmarterSubject): Observable<number> {
    return from(this.subjects.add(new StudySmarterSubject(subject)));
  }

  async getSubjectIds(): Promise<number[]> {
    const raw = await this.subjects.toArray();
    return raw.map(
      (subject) => (subject as StudySmarterSubject).studySmarter.id
    );
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

  async deleteSubject(studySmarterId: number): Promise<void> {
    const subject = await this.subjects
      .where('studySmarter.id')
      .equals(studySmarterId)
      .first();
    if (!subject?.id) return;
    await this.subjects.delete(subject.id);
    await this.flashcards.where('subjectId').equals(subject.id).delete();
  }

  async deleteSubjects(studySmarterIds: number[]): Promise<void> {
    await Promise.all(studySmarterIds.map((id) => this.deleteSubject(id)));
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

  addTags(tags: IStudySmarterTag[], subjectId: number): Observable<number> {
    return from(
      this.tags.bulkAdd(tags.map((tag) => new StudySmarterTag(tag, subjectId)))
    );
  }

  async getTags(subjectId: number): Promise<Tag[]> {
    const raw = await this.tags.where({ subjectId }).toArray();
    return raw.map(
      (tag) =>
        new StudySmarterTag((tag as StudySmarterTag).studySmarter, tag.id)
    );
  }

  clearAll(): void {
    void this.delete();
  }
}
