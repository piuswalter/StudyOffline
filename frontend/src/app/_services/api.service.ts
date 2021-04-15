import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  IStudySmarterFlashcard,
  IStudySmarterSubject,
  LoginRequest,
  LoginResponse,
  StudySmarterResponse
} from '../_models/studysmarter';
import { StudySmarterService } from './study-smarter.service';

const handleError = (error: HttpErrorResponse): Observable<never> => {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(errorMessage);
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private http: HttpClient,
    private studySmarter: StudySmarterService
  ) {}

  private get httpOptions(): { headers: HttpHeaders } | any {
    if (!this.studySmarter.apiToken) return {};
    return {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Token ${this.studySmarter.apiToken}`
      })
    };
  }

  login(data: LoginRequest, save: boolean, callback = () => {}): Subscription {
    const options = {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json'
      })
    };

    return this.http
      .post<LoginResponse>(`${environment.apiURL}/login`, data, options)
      .pipe(retry(1), catchError(handleError))
      .subscribe((loginData) => {
        this.studySmarter.saveCredentials(loginData, save);
        callback();
      });
  }

  private getApiUrl(endpoint: string): string {
    return `${environment.apiURL}/users/${this.studySmarter.userId}/${endpoint}`;
  }

  private fetchUserEndpoint<T>(
    endpoint: string
  ): Observable<StudySmarterResponse<T>> {
    return ((this.http.get(
      this.getApiUrl(endpoint),
      this.httpOptions
    ) as unknown) as Observable<StudySmarterResponse<T>>).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  private fetchUserProgressEndpoint<T>(
    endpoint: string
  ): Observable<HttpResponse<T>> {
    return this.http.request<T>(
      new HttpRequest('GET', this.getApiUrl(endpoint), {
        ...this.httpOptions,
        reportProgress: true,
        observe: 'events'
      })
    ) as Observable<HttpResponse<T>>;
  }

  getSubjects(): Observable<StudySmarterResponse<IStudySmarterSubject>> {
    return this.fetchUserEndpoint<IStudySmarterSubject>('subjects');
  }

  getFlashcards(
    subjectId: number
  ): Observable<HttpResponse<IStudySmarterFlashcard>> {
    return this.fetchUserProgressEndpoint(`subjects/${subjectId}/flashcards`);
  }
}
