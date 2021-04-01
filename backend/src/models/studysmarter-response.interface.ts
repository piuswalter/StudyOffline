export interface StudySmarterResponse<T> {
  count: number,
  next: string | undefined, // link
  previous: string | undefined, // link
  results: T[]
}
