import safeGet from "@fengqiaogang/safe-get";
/***
 * 根据对象得到url链接
 * @param data 数据源
 * @param baseUrl 页面地址
 * @param urlName 路由的key
 * @param key 路由key的值
 */
export const getUrl = (data: any, baseUrl: string, urlName: string, key: string, routerQuery?: object) => {
  if (!data || data.length === 0) return;
  const list: any = [];
  const query = routerQuery ? routerQuery : {};
  data.forEach((item: any) => {
    const param: any = { ...query, [urlName]: safeGet(item, key) };
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
