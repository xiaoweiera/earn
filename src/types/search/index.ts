/**
 * @file 搜索
 * @author svon.me@gmail.com
 */

export interface SearchItem {
  icon?: string;
  name: string;
  id?: string | number;
  children?: SearchItem[];
}
