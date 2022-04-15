/**
 * @file
 * @author zhangkun@163.com
 */

export interface InvestItem {
  id: number | string;
  name: string;
  logo: string;
  website: string;
  email: string;
  twitter_url: string;
  founded_year: string;
  description: string;
  project_count: number;
  top_projects: InvestProjects[];
}

export interface InvestProjects {
  id: number | string;
  name: string;
  logo: string;
  categories: string;
  symbol: string;
}
