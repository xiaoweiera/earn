export interface groupModel {
  position: string;
  chain: string;
}
export interface dappListModel {
  category?: string;
  chain: string;
  group_id?: number | string;
  interval: string;
  sort_field: string;
  sort_type: string;
  query: string;
  page?: number;
  page_size?: number;
}
