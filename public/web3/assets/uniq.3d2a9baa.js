import{be as t,bf as e,af as i}from"./app.46fe480c.js";function n(t){return t}var s=t(n);function a(t,i,n){var s,a=typeof t;switch(a){case"string":case"number":return 0===t&&1/t==-1/0?!!n._items["-0"]||(i&&(n._items["-0"]=!0),!1):null!==n._nativeSet?i?(s=n._nativeSet.size,n._nativeSet.add(t),n._nativeSet.size===s):n._nativeSet.has(t):a in n._items?t in n._items[a]||(i&&(n._items[a][t]=!0),!1):(i&&(n._items[a]={},n._items[a][t]=!0),!1);case"boolean":if(a in n._items){var r=t?1:0;return!!n._items[a][r]||(i&&(n._items[a][r]=!0),!1)}return i&&(n._items[a]=t?[!1,!0]:[!0,!1]),!1;case"function":return null!==n._nativeSet?i?(s=n._nativeSet.size,n._nativeSet.add(t),n._nativeSet.size===s):n._nativeSet.has(t):a in n._items?!!e(t,n._items[a])||(i&&n._items[a].push(t),!1):(i&&(n._items[a]=[t]),!1);case"undefined":return!!n._items[a]||(i&&(n._items[a]=!0),!1);case"object":if(null===t)return!!n._items.null||(i&&(n._items.null=!0),!1);default:return(a=Object.prototype.toString.call(t))in n._items?!!e(t,n._items[a])||(i&&n._items[a].push(t),!1):(i&&(n._items[a]=[t]),!1)}}var r=function(){function t(){this._nativeSet="function"==typeof Set?new Set:null,this._items={}}return t.prototype.add=function(t){return!a(t,!0,this)},t.prototype.has=function(t){return a(t,!1,this)},t}(),_=i((function(t,e){for(var i,n,s=new r,a=[],_=0;_<e.length;)i=t(n=e[_]),s.add(i)&&a.push(n),_+=1;return a}))(s);export{r as _,_ as u};
