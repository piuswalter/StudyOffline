import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Flashcard,
  LoginRequest,
  LoginResponse,
  StudySmarterResponse,
  Subject
} from '../_models';

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
  private token = '';
  private userId = 0;

  constructor(private http: HttpClient) {}

  private get httpOptions(): { headers: HttpHeaders } | any {
    if (!this.token) return {};
    return {
      headers: new HttpHeaders({
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Token ${this.token}`
      })
    };
  }

  get isLoggedIn(): boolean {
    return !!this.userId;
  }

  login(
    data: LoginRequest,
    save: boolean,
    callback: VoidFunction
  ): Subscription {
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
        this.saveCredentials(loginData);
        callback();
      });
  }

  private saveCredentials(loginData: { token: string; id: number }) {
    const { token, id } = loginData;
    this.token = token;
    this.userId = id;
    localStorage.setItem('StudySmarterToken', token);
    localStorage.setItem('StudySmarterUserId', id.toString());
  }

  loadCredentials(): void {
    const token = localStorage.getItem('StudySmarterToken');
    const userId = Number(localStorage.getItem('StudySmarterUserId'));
    if (token && userId) {
      this.token = token;
      this.userId = userId;
    }
  }

  private fetchUserEndpoint<T>(
    endpoint: string
  ): Observable<StudySmarterResponse<T>> {
    return ((this.http.get(
      `${environment.apiURL}/users/${this.userId}/${endpoint}`,
      this.httpOptions
    ) as unknown) as Observable<StudySmarterResponse<T>>).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  getSubjects(): Observable<StudySmarterResponse<Subject>> {
    return this.fetchUserEndpoint<Subject>('subjects');
  }

  getFlashcards(
    subjectId: number
  ): Observable<StudySmarterResponse<Flashcard>> {
    return this.fetchUserEndpoint<Flashcard>(
      `subjects/${subjectId}/flashcards`
    );
  }
}
