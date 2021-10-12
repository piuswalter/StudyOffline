import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import config from '../config';
import {
  Flashcard,
  LoginRequest,
  LoginResponse,
  StudySmarterResponse,
  Subject,
  TagContainer
} from '../models';

const { url } = config.studysmarter;
const defaultHeaders = { 'content-type': 'application/json' };

async function request<T = any>(
  method: string, endpoint: string, data = {}, headers: any = defaultHeaders,
): Promise<AxiosResponse<T>> {
  return Axios({
    method,
    url: `${url}/${endpoint}`,
    data,
    headers,
  } as AxiosRequestConfig);
}

export async function login(data: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
  return request<LoginResponse>('post', 'api-token-auth/', data);
}

export async function getSubjects(userId: string, apiToken: string) {
  return request<StudySmarterResponse<Subject>>('get', `users/${userId}/subjects/`, null, { authorization: `Token ${apiToken}` });
}

export async function getFlashcards(userId: string, subjectId: string, apiToken: string) {
  return request<StudySmarterResponse<Flashcard>>('get', `users/${userId}/course-subjects/${subjectId}/flashcards/?quantity=9999&s_bad=true&s_medium=true&s_good=true&s_trash=true&s_unseen=true&order=anti-chronological`, null, { authorization: `Token ${apiToken}` });
}
// &created_by=

export async function getTags(userId: string, subjectId: string, apiToken: string) {
  return request<TagContainer>('get', `users/${userId}/course-subjects/${subjectId}/tags/`, null, { authorization: `Token ${apiToken}` });
}
