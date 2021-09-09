import { Component } from '@angular/core';
import { DbService } from '../_services/db.service';
import { Subject } from '../_models/subject.class';
import { Flashcard } from '../_models/flashcard.class';
import { Tag } from '../_models/tag.class';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  subjectId = 0;
  tagControl = new FormControl();
  private cardIndex = 0;
  private subjectMap: { [key: number]: Subject } = {};
  private tagMap: { [key: number]: Tag } = {};
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
      .then(() => {
        this.dbService
          .getTags(this.subjectId)
          .then((tags) => {
            this.tagMap = tags;
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  get flashcard(): Flashcard | undefined {
    if (this.cardIndex >= this.filteredFlashcards.length) return undefined;
    return this.filteredFlashcards[this.cardIndex];
  }

  /**
   * Convert selected tag ID from string to int
   */
  get selectedTagIds(): number[] {
    const raw = this.tagControl.value as string[];
    if (!raw) return [];
    return raw.map((id) => parseInt(id, 10));
  }

  /**
   * Get all flashcards with selected tags
   */
  get filteredFlashcards(): Flashcard[] {
    if (this.selectedTagIds.length === 0) return this.flashcards;
    return this.flashcards.filter((card) => {
      if (card.tags.length === 0) return false; // do not show untagged cards
      return card.tags.some((tag) => this.selectedTagIds.includes(tag));
    });
  }

  get subject(): Subject {
    return this.subjectMap[this.subjectId];
  }

  get subjects(): Subject[] {
    return Object.values(this.subjectMap);
  }

  get allTags(): Tag[] {
    return Object.values(this.tagMap);
  }

  get flashcardTags(): Tag[] {
    return this.allTags.filter((tag) =>
      this.flashcard?.tags.includes(tag.studySmarterId ?? -1)
    );
  }

  async switchSubject(subjectId: number): Promise<void> {
    if (!this.subjectMap[subjectId]) return;
    this.subjectId = subjectId;
    this.cardIndex = 0; // reset index to circumvent array index out of bounds
    this.tagMap = await this.dbService.getTags(subjectId);
    this.flashcards = await this.dbService.getFlashcards(subjectId);
  }

  randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  switchCard(inc: number): void {
    const cl = this.filteredFlashcards.length;
    if (!inc) inc = this.randomNumber(1, cl - 1);
    this.cardIndex = (this.cardIndex + inc) % cl;
    if (this.cardIndex < 0) this.cardIndex = cl - 1;
  }
}
