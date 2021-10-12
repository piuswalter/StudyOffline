/* eslint-disable camelcase */
export interface Tag {
  id: number;
  name: string;
  colour: number;
  subject: number;
  creator: number;
}

export interface TagContainer {
  all_parent_tags: Tag[];
  subject_tags: Tag[];
}
