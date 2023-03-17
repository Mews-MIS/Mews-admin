export type Article = {
  id: number;
  title: string;
  content: string;

  imgUrls: string[];

  createAt: number[];
  modifiedAt: number[];

  like_count: number;
  type: string;

  pageCount: number;
};
