import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  mode: 'determinate' | 'indeterminate';
}

@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.sass']
})
export class ProgressSpinnerDialogComponent {
  progress = 1;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
