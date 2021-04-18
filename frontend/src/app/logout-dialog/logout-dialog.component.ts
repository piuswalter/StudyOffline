import { Component } from '@angular/core';
import { DbService } from '../_services/db.service';
import { StudySmarterService } from '../_services/study-smarter.service';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.sass']
})
export class LogoutDialogComponent {
  deleteFlashcards = false;

  constructor(
    private dbService: DbService,
    private studySmarter: StudySmarterService
  ) {}

  logout(): void {
    if (this.deleteFlashcards) {
      this.dbService.clearAll();
    }
    this.studySmarter.logout();
    document.location.reload();
  }
}
