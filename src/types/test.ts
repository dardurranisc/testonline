import { QuestionBase } from './question';

export type TestBase = {
  id: number;
  title: string;
  owner: string;
  is_published: boolean;
};

export type TestRetrieve = {
  id: number;
  title: string;
  owner: string;
  is_published: boolean;
  questions: QuestionBase[];
};

export type PaginationMetadata = {
  current_page: number;
  per_page: number;
  next_page: number | null;
  prev_page: number | null;
  total_pages: number;
  total_count: number;
};

export type PaginatedTestBase = {
  paginations: PaginationMetadata;
  results: TestBase[];
};

export type PaginationParametersQuery = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_direction?: 'asc' | 'desc';
  sort_field?: 'created_at';
};
