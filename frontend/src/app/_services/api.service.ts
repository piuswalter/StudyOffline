import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs/internal/observable/throwError';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Flashcard, LoginRequest, LoginResponse, StudySmarterResponse, Subject } from '../_models';

@Injectable({ providedIn: 'root' })

export class ApiService {
    private httpOptions = {}
    private token = '';
    private userId = 0;

    constructor(private http: HttpClient) { }

    private updateHeader() {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Authorization': `Token ${this.token}`
            })
        }
    }

    get isLoggedIn(): boolean {
        return !!this.userId;
    }

    login(data: LoginRequest, callback: VoidFunction) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }

        return this.http.post<LoginResponse>(`${environment.apiURL}/login`, data, options)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
            .subscribe((data) => {
                const { token, id } = data;
                this.token = token;
                this.userId = id;
                this.updateHeader();
                callback();
            })
    }

    fetchUserEndpoint<T>(endpoint: string) {
        return this.http.get<StudySmarterResponse<T>>(`${environment.apiURL}/users/${this.userId}/${endpoint}`, this.httpOptions)
            .pipe(
                retry(1),
                catchError(this.handleError)
            )
    }

    getSubjects() {
        return this.fetchUserEndpoint<Subject>('subjects');
    }

    getFlashcards(subjectId: number) {
        return this.fetchUserEndpoint<Flashcard>(`subjects/${subjectId}/flashcards`);
    }

    handleError(error: any) {
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
    }
}
