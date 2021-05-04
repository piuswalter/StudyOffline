import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription, throwError } from 'rxjs';
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

  private get httpHeaders(): HttpHeaders {
    if (!this.studySmarter.apiToken) return {} as HttpHeaders;
    return new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: `Token ${this.studySmarter.apiToken}`
    });
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
    return this.http
      .get<StudySmarterResponse<T>>(this.getApiUrl(endpoint), {
        headers: this.httpHeaders
      })
      .pipe(retry(1), catchError(handleError));
  }

  private fetchUserProgressEndpoint<T>(
    endpoint: string
  ): Observable<HttpEvent<T[]>> {
    return this.http.request<T[]>(
      new HttpRequest('GET', this.getApiUrl(endpoint), {
        headers: this.httpHeaders,
        reportProgress: true,
        observe: 'events'
      })
    );
  }

  getSubjects(): Observable<StudySmarterResponse<IStudySmarterSubject>> {
    return this.fetchUserEndpoint<IStudySmarterSubject>('subjects');
  }

  getFlashcards(
    subjectId: number
  ): Observable<
    HttpEvent<IStudySmarterFlashcard[]> | HttpResponse<IStudySmarterFlashcard[]>
  > {
    return this.fetchUserProgressEndpoint<IStudySmarterFlashcard>(
      `subjects/${subjectId}/flashcards`
    );
  }
}
