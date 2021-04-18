import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownloadComponent } from './download/download.component';
import { HelpComponent } from './help/help.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { StudySmarterLoginComponent } from './study-smarter-login/study-smarter-login.component';
import { StudySmarterGuard } from './_services/study-smarter.guard';

const routes: Routes = [
  {
    path: 'download',
    component: DownloadComponent,
    canActivate: [StudySmarterGuard]
  },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'login', component: StudySmarterLoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
