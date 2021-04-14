import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { last, map } from 'rxjs/operators';
import { Flashcard, Subject } from '../_models';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent implements OnInit {
  @ViewChild('subjectList') subjectList: MatSelectionList | undefined;
  private subjects: Subject[] = [];
  progress = 0;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  private cmpSubjectLastUsed(a: Subject, b: Subject) {
    return new Date(b.last_used).getTime() - new Date(a.last_used).getTime();
  }

  private filteredSubjects(active: boolean): Subject[] {
    return this.subjects
      .filter((subject) => subject.archived !== active)
      .sort(this.cmpSubjectLastUsed.bind(this));
  }

  get activeSubjects(): Subject[] {
    return this.filteredSubjects(true);
  }
  get archivedSubjects(): Subject[] {
    return this.filteredSubjects(false);
  }

  /**
   * maps array of checkbox objects to IDs of selected subjects
   */
  get selectedSubjectIds(): number[] {
    if (!this.subjectList) return [];
    return this.subjectList.selectedOptions.selected.map(
      (obj) => obj.value as number
    );
  }

  /**
   * Add up flashcard count of all selected subjects
   *
   * @param selected - List of IDs of the subjects you want to count
   * @returns - The total flashcard count of all selected subjects
   */
  getFlashcardCount(selected: number[]): number {
    return this.subjects.reduce(
      (acc, sub) => (selected.includes(sub.id) ? acc + sub.flashcards : acc),
      0
    );
  }

  fetchSubjects(): void {
    this.apiService.getSubjects().subscribe((data) => {
      this.subjects = data.results;
    });
  }

  downloadSubjects(): void {
    const toFetch =
      this.getFlashcardCount(this.selectedSubjectIds) +
      this.selectedSubjectIds.length;
    let fetched = 0;

    for (const subjectId of this.selectedSubjectIds) {
      let subjectFetched = 0;
      this.apiService
        .getFlashcards(subjectId)
        .pipe(
          map((card: HttpEvent<Flashcard>) => {
            if (card.type === HttpEventType.DownloadProgress) {
              this.progress = (100 / toFetch) * ++fetched;
              subjectFetched++;
            }
            return card;
          }),
          last()
        )
        .subscribe((flashcards) => {
          fetched += this.getFlashcardCount([subjectId]) - subjectFetched;
          this.progress = (100 / toFetch) * ++fetched;
          console.log('Final flashcards: ', flashcards);
          // flashcards.map((card) => console.log('test'));
          // console.log(flashcards.length);
          // const answr = flashcards.results[0].flashcardinfo.answer_html[0].text;
          // // images are now encoded within backend!
          // console.log(answr);
        });
      // this.apiService.getFlashcards2(subjectId).subscribe(data => console.log);
    }
  }
}
