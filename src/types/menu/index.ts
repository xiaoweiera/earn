/**
 * @file 菜单
 * @author svon.me@gmail.com
 */

export interface MenuItem {
  id?: string; // 唯一ID
  name?: string; // 名称
  label?: string;
  href?: string; // 链接地址
  icon?: string; // 图标
  font?: string; // 标题后面的图标
  // 是否在大屏模式下展示
  header?: boolean;
  // 导航末尾展示组件名称
  expand?: string;
  more?: boolean; // 是否在更多菜单中展示
  newTip?: boolean; // 是否在菜单右上角展示小红点
  sideNewTip?: boolean; //左侧导航的new
  active?: boolean; // 是否为选中状态
  message?: number; // 消息数量
  layout?: boolean; // 布局方式
  children?: MenuItem[]; // 子菜单
  blank?: boolean; // 是否为新开窗口
  coming?: boolean; // 是否为开发中
  group?: boolean; // 是否属于分组样式
  [key: string]: any;
}
