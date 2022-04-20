export interface CommentModel {
  project_id: string | number;
  page: number;
  page_size: number;
}
export interface pushCommentModel {
  project_id: number;
  content: string;
  uploads: Array<string>;
}
export interface ReplyCommentModel {
  target_id: number;
  content: string;
  uploads: Array<string>;
}
export interface suggestModel {
  metrics_type: string; // 反馈类型
  content?: string; // 反馈意见内容
  wechat?: string; // 联系方式
}
