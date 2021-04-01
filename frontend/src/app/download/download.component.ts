import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
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
  loginForm: FormGroup;
  subjectForm: FormGroup;
  subjects: Subject[] = [];
  progress = 90;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required.bind(this), Validators.email.bind(this)]
      ],
      password: ['', Validators.required.bind(this)]
    });
    this.subjectForm = this.formBuilder.group({
      subjects: new FormArray([])
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginForm.controls;
  }

  get sf() {
    return this.subjectForm.controls;
  }

  get subjectBoxes() {
    return this.sf.subjects as FormArray;
  }

  get isLoggedIn() {
    return this.apiService.isLoggedIn;
  }

  onSubmit(): void {
    this.apiService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      },
      () => {
        this.apiService.getSubjects().subscribe((data) => {
          this.subjects = data.results;
          this.subjects.forEach(() =>
            this.subjectBoxes.push(new FormControl(false))
          );
        });
      }
    );
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
