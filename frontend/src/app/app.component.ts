import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { StudySmarterService } from './_services/study-smarter.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'StudyOffline';

  constructor(
    private dialog: MatDialog,
    private studySmarter: StudySmarterService,
    private titleService: Title
  ) {
    this.titleService.setTitle('StudyOffline');
  }

  get isLoggedIn(): boolean {
    return this.studySmarter.isLoggedIn;
  }

  openLogoutDialog(): void {
    this.dialog.open(LogoutDialogComponent, {
      panelClass: 'transparent',
      disableClose: true
    });
  }
}
