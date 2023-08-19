export type TSearchParams = {
  filename?: string;
  author_id?: string;
  duration: string; // 10-80
  tags: string; // a,b,c,d
};

export type TVideoItem = {
  filename?: string;
  authorId?: string;
  duration: number; // 10-80
  tags: string[]; // a,b,c,d
};
