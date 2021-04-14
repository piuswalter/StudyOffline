import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'src/app/_models';

@Component({
  selector: 'app-subject-selector',
  templateUrl: './subject-selector.component.html',
  styleUrls: ['./subject-selector.component.sass']
})
export class SubjectSelectorComponent implements OnInit {
  @Input() subject!: Subject;

  constructor() {}

  ngOnInit(): void {}
}
