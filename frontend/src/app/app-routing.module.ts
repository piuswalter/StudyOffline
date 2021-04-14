import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { StudySmarterLoginComponent } from './study-smarter-login/study-smarter-login.component';
import { UploadComponent } from './upload/upload.component';
import { StudySmarterGuard } from './_services/study-smarter.guard';

const routes: Routes = [
  {
    path: 'download',
    component: DownloadComponent,
    canActivate: [StudySmarterGuard]
  },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'login', component: StudySmarterLoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
