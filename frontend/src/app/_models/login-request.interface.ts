/* eslint-disable camelcase */
export interface LoginRequest {
  username: string;
  password: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  studygroup_token?: string;
  subjecttoken?: string;
}
