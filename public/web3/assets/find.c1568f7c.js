import{$ as t,bm as r,bn as n}from"./app.c3012526.js";var e=function(){function t(t,r){this.xf=r,this.f=t,this.found=!1}return t.prototype["@@transducer/init"]=r.init,t.prototype["@@transducer/result"]=function(t){return this.found||(t=this.xf["@@transducer/step"](t,void 0)),this.xf["@@transducer/result"](t)},t.prototype["@@transducer/step"]=function(t,r){var n;return this.f(r)&&(this.found=!0,t=(n=this.xf["@@transducer/step"](t,r))&&n["@@transducer/reduced"]?n:{"@@transducer/value":n,"@@transducer/reduced":!0}),t},t}(),s=t(n(["find"],t((function(t,r){return new e(t,r)})),(function(t,r){for(var n=0,e=r.length;n<e;){if(t(r[n]))return r[n];n+=1}})));export{s as f};
