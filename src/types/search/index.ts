/**
 * @file 搜索
 * @author svon.me@gmail.com
 */

export interface SearchItem {
  logo?: string;
  name: string;
  id?: string | number;
  key?: string;
  url?: string;
  children?: SearchItem[];
  [key: string]: any;
}
