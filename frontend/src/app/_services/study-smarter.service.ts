import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../_models';

@Injectable({ providedIn: 'root' })
export class StudySmarterService {
  // StudySmarter User ID
  private id = 0;
  // StudySMarter API Token
  private token = '';

  constructor(private http: HttpClient) {}

  get isLoggedIn(): boolean {
    return !!this.id;
  }

  get userId(): number {
    return this.id;
  }
  get apiToken(): string {
    return this.token;
  }

  /**
   * Saves the current login data to study smarter service
   *
   * @param loginData - The login data, containing userId and password
   * @param save - Whether to store data in localStorage
   */
  saveCredentials(loginData: LoginResponse, save: boolean): void {
    const { token, id } = loginData;
    this.token = token;
    this.id = id;
    if (save) {
      localStorage.setItem('StudySmarterToken', token);
      localStorage.setItem('StudySmarterUserId', id.toString());
    }
  }

  loadCredentials(): void {
    const token = localStorage.getItem('StudySmarterToken');
    const userId = Number(localStorage.getItem('StudySmarterUserId'));
    if (token && userId) {
      this.token = token;
      this.id = userId;
    }
  }
}
