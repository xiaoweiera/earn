

import { useRoute } from 'vue-router';
import * as R from 'ramda'
// 拼接url
export const changeUrl = function(data:Object, router:Object,ids:string) {
  const routerUrl = router;
  const query = router.query;
  let queryUrl:Object ={};
  R.forEach((item:any) => {
    queryUrl={
      ...query,
    }
    queryUrl[ids]=item[ids]
    let href=''
    R.forEach((items:any)=>{
      href+=`${items}=${queryUrl[items]}&`
    },Object.keys(queryUrl))
    item.href=(`${router.path}?${href}`).substring(0,(`${router.path}?${href}`).length-1)
  },data);
  return queryUrl;
}