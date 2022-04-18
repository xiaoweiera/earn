/**
 * @file
 * @author zhangkun@163.com
 */

export interface InvestItem {
  id: number | string; // 项目ID
  name: string; //机构名称
  logo: string; //
  website: string; //
  email: string; //
  twitter_url: string; //
  founded_year: number | string; //
  description: string; //
  project_count: number; //
  top_projects: InvestProjects[]; //
}

export interface ProjectItem {
  stage_name: string; // 投资阶段
  amount: number | string; // 投资总额
  invested_at: number | string; // 投资日期
  project: ProjectRound[]; //
  investors: ProjectInvestors[]; // 投资机构列表
}

export interface ProjectRound {
  id: number | string; // 投资项目ID
  name: string; // 投资项目ID
  logo: string; // 投资项目ID
  categories: string[]; // 投资项目ID
  symbol: number | string; // 投资项目ID
}

export interface ProjectInvestors {
  id: number | string; // 投资机构ID
  name: string; // 投资机构名称
  logo: string; // 投资机构LOGO
  website: string; // 投资机构官网
  email: string; // 投资机构邮箱
  twitter_url: string; //投资机构推特
  founded_year: string; //投资机构成立年份
  description: string; //投资机构描述
  project_count: number; //投资机构投资项目数
}
export interface InvestProjects {
  id: number | string;
  name: string;
  logo: string;
  categories: string[];
  symbol: string;
}

export interface FundsQuery {
  page: number | string;
  page_size: number | string;
  keyword: string;
  stage?: string;
}
