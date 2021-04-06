import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import { StudySmarterService } from '../_services/study-smarter.service';

@Component({
  selector: 'app-study-smarter-login',
  templateUrl: './study-smarter-login.component.html',
  styleUrls: ['./study-smarter-login.component.sass']
})
export class StudySmarterLoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private studySmarter: StudySmarterService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required.bind(this), Validators.email.bind(this)]
      ],
      password: ['', Validators.required.bind(this)],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    if (this.studySmarter.isLoggedIn) {
      this.redirect();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.apiService.login(
      {
        username: this.f.username.value as string,
        password: this.f.password.value as string
      },
      this.f.rememberMe.value,
      this.redirect.bind(this)
    );
  }

  redirect(): void {
    void this.route.queryParams.subscribe((params) => {
      void this.router.navigate([params.redirect || '/']);
    });
  }
}
