import { Component, Input } from '@angular/core';
import { IStudySmarterSubject } from 'src/app/_models/studysmarter';

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.sass']
})
export class SubjectSelectorComponent {
  @Input() subject!: IStudySmarterSubject;

  constructor() {}
}
