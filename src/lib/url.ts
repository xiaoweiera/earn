import { getParam } from "src/utils/router";
/***
 * 根据对象得到url链接
 * @param data 数据源
 * @param baseUrl 页面地址
 * @param urlName 路由的key
 * @param key 路由key的值
 */
export const getUrl = (data: any, baseUrl: string, urlName: string, key: string) => {
  if (!data || data.length === 0) return;
  const query = getParam<object>();
  const list: any = [];
  data.forEach((item: any) => {
    const param: any = { ...query, [urlName]: item[key] };
    const prop: any = { ...item };
    list.push({
      ...prop,
      href: {
        path: baseUrl,
        query: param,
      },
    });
  });
  return list;
};
