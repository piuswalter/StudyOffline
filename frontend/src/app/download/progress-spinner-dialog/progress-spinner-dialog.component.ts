import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.sass']
})
export class ProgressSpinnerDialogComponent {
  @Input() mode!: 'determinate' | 'indeterminate';
  @Input() progress!: number;

  constructor() {}
}
