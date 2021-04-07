import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Subject } from '../_models';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent implements OnInit {
  @ViewChild('subjectList') subjectList: MatSelectionList | undefined;
  @ViewChild('encoder') encoder: ElementRef<HTMLDivElement> | undefined;
  private subjects: Subject[] = [];
  progress = 90;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  get activeSubjects(): Subject[] {
    return this.subjects.filter((subject) => !subject.archived);
  }
  get archivedSubjects(): Subject[] {
    return this.subjects.filter((subject) => subject.archived);
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
    if (!this.subjectList) return;

    for (const subjectId of this.selectedSubjectIds) {
      this.apiService.getFlashcards(subjectId).subscribe((flashcards) => {
        const answr = flashcards.results[0].flashcardinfo.answer_html[0].text;
        // images are decoding within backend!
        console.log(answr);
      });
    }
    this.progress = 0.1;
  }
}
