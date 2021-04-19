import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { IStudySmarterSubject } from '../_models/studysmarter';
import { ApiService } from '../_services/api.service';
import { DbService } from '../_services/db.service';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent implements OnInit {
  @ViewChild('subjectList') subjectList: MatSelectionList | undefined;
  private subjects: IStudySmarterSubject[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private dbService: DbService
  ) {}

  ngOnInit(): void {
    this.fetchSubjects();
  }

  private cmpSubjectLastUsed(a: IStudySmarterSubject, b: IStudySmarterSubject) {
    return new Date(b.last_used).getTime() - new Date(a.last_used).getTime();
  }

  private filteredSubjects(active: boolean): IStudySmarterSubject[] {
    return this.subjects
      .filter((subject) => subject.archived !== active)
      .sort(this.cmpSubjectLastUsed.bind(this));
  }

  get activeSubjects(): IStudySmarterSubject[] {
    return this.filteredSubjects(true);
  }
  get archivedSubjects(): IStudySmarterSubject[] {
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
    const dialogRef = this.showProgressSpinnerUntilExecuted();
    const toFetch =
      this.getFlashcardCount(this.selectedSubjectIds) +
      this.selectedSubjectIds.length;
    let fetched = 0;

    const subscriptions: Subscription[] = [];
    for (const subjectId of this.selectedSubjectIds) {
      let subjectFetched = 0;
      const subscription = this.apiService
        .getFlashcards(subjectId)
        .pipe(
          first((event) => {
            if (event.type === HttpEventType.DownloadProgress) {
              dialogRef.componentInstance.progress =
                (100 / toFetch) * ++fetched;
              subjectFetched++;
            }
            return event.type === HttpEventType.Response;
          })
        )
        .subscribe((event) => {
          if (!(event && event.type === HttpEventType.Response)) return;
          const cards = event.body || [];

          const subjectIdx = this.subjects
            .map((sub) => sub.id)
            .indexOf(subjectId);

          if (subjectIdx !== -1) {
            this.dbService
              .addSubject(this.subjects[subjectIdx])
              .subscribe((dbSubjectId) => {
                this.dbService.addFlashcards(cards, dbSubjectId).subscribe();
              });
          }

          fetched += this.getFlashcardCount([subjectId]) - subjectFetched;
          dialogRef.componentInstance.progress = (100 / toFetch) * ++fetched;
          if (fetched === toFetch) {
            dialogRef.close();
          }
        });
      subscriptions.push(subscription);
    }
    dialogRef
      .afterClosed()
      .subscribe(() => subscriptions.forEach((sub) => sub.unsubscribe()));
  }

  showProgressSpinnerUntilExecuted(): MatDialogRef<ProgressSpinnerDialogComponent> {
    return this.dialog.open(ProgressSpinnerDialogComponent, {
      panelClass: 'transparent',
      disableClose: true,
      data: {
        mode: 'determinate'
      }
    });
  }
}
