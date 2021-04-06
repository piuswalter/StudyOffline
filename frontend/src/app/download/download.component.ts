import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Subject } from '../_models';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.sass']
})
export class DownloadComponent implements OnInit {
  hide = true;
  subjectForm: FormGroup;
  private subjects: Subject[] = [];
  progress = 90;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.subjectForm = this.formBuilder.group({
      activeSubjects: new FormArray([]),
      archivedSubjects: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.fetchSubjects();
  }

  get sf(): { [key: string]: AbstractControl } {
    return this.subjectForm.controls;
  }

  get subjectBoxes(): FormArray {
    return this.sf.subjects as FormArray;
  }

  get activeSubjects(): Subject[] {
    return this.subjects.filter((subject) => !subject.archived);
  }
  get archivedSubjects(): Subject[] {
    return this.subjects.filter((subject) => subject.archived);
  }

  fetchSubjects(): void {
    this.apiService.getSubjects().subscribe((data) => {
      this.subjects = data.results;

      this.subjects.forEach(() =>
        this.subjectBoxes.push(new FormControl(false))
      );
    });
  }

  downloadSubjects(): void {
    const selectedSubjects = this.subjectForm.value.subjects
      .map((checked: boolean, i: number) =>
        checked ? this.subjects[i].id : null
      )
      .filter((v: number | undefined) => v !== null);
    this.progress = 0.1;
  }
}
