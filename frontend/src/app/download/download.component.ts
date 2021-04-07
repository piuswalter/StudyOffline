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

  fetchSubjects(): void {
    this.apiService.getSubjects().subscribe((data) => {
      this.subjects = data.results;
    });
  }

  downloadSubjects(): void {
    if (!this.subjectList) return;

    // map array of checkbox objects to IDs of selected subjects
    const selectedIds = this.subjectList.selectedOptions.selected.map(
      (obj) => obj.value as number
    );

    // add up flashcard count of all selected subjects
    const flashcardCount = this.subjects.reduce(
      (acc, sub) => (selectedIds.includes(sub.id) ? acc + sub.flashcards : acc),
      0
    );

    for (const subjectId of selectedIds) {
      this.apiService.getFlashcards(subjectId).subscribe((flashcards) => {
        const answr = flashcards.results[0].flashcardinfo.answer_html[0].text;
        // images are decoding within backend!
        console.log(answr);
      });
    }
    this.progress = 0.1;
  }
}
