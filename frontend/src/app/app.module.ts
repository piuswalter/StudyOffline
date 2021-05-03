import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HelpComponent } from './help/help.component';
import { DownloadComponent } from './download/download.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudySmarterLoginComponent } from './study-smarter-login/study-smarter-login.component';
import { StudySmarterService } from './_services/study-smarter.service';
import { SubjectSelectorComponent } from './download/subject-selector/subject-selector.component';
import { ProgressSpinnerDialogComponent } from './download/progress-spinner-dialog/progress-spinner-dialog.component';
import { LogoutDialogComponent } from './logout-dialog/logout-dialog.component';
import { FlashcardComponent } from './home/flashcard/flashcard.component';

const initLocalStorage = (studySmarter: StudySmarterService) => {
  return (): void => studySmarter.loadCredentials();
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    HelpComponent,
    DownloadComponent,
    StudySmarterLoginComponent,
    SubjectSelectorComponent,
    ProgressSpinnerDialogComponent,
    LogoutDialogComponent,
    FlashcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initLocalStorage,
      deps: [StudySmarterService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
