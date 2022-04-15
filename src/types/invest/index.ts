export interface investmentModel {
  id?: string | number;
  keyword: string | null | undefined;
  project_category: string;
  stage: string;
  sort_field: string;
  sort_type: string;
  page?: number;
  page_size?: number;
}
export interface detailModel {
  id: string | number;
  name: string;
  logo: string;
  website: string;
  last_invested_at: string;
  email: string;
  twitter_url: string;
  founded_year: string | number;
  description: string;
  project_count: number;
  investment_count: number;
  project_categories: string[];
  investment_stages: string[];
}
export interface filterModel {
  project_category: string;
  stage: string;
  has_symbol: string;
  keyword: string;
}
