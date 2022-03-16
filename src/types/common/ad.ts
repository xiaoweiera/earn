/**
 * @file 广告数据结构
 * @author svon.me@gmail.com
 */

export interface Ad {
  id: string | number; // 数据ID
  position: number;
  display_location: number;
  image: string;
  url: string;
  flag: boolean;
  image_app: string;
}
