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
