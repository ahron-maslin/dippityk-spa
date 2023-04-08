export interface COMMENT {
  id: number;
  author: string;
  title: string;
  message: string;
}

export const Comments: COMMENT[] = [
  {id: 1, author: 'test1', title: 'im testing carousel', message: 'test message'},
  {id: 2, author: 'test2', title: 'im testing carousel', message: 'test message'},
  {id: 3, author: 'test3', title: 'im testing carousel', message: 'test message'}
]