/* eslint-disable camelcase */
export interface IStudySmarterSubject {
  id: number;
  name: string;
  /* eslint-disable @typescript-eslint/naming-convention */
  user_count: number;
  last_used: Date;
  /* eslint-enable @typescript-eslint/naming-convention */
  flashcards: number;
  archived: boolean;
}
