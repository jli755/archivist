!function(e,r){"use strict";function t(e,t){for(var a in t=t||{},r.forEach(t,function(e,r){delete t[r]}),e)!e.hasOwnProperty(a)||"$"===a.charAt(0)&&"$"===a.charAt(1)||(t[a]=e[a]);return t}var a=r.$$minErr("$resource"),n=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;r.module("ngResource",["ng"]).provider("$resource",function(){var e=/^https?:\/\/[^/]*/,s=this;this.defaults={stripTrailingSlashes:!0,cancellable:!1,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$log","$q","$timeout",function(o,i,u,c){function l(e,r){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,r?"%20":"+")}function p(e,r){this.template=e,this.defaults=m({},s.defaults,r),this.urlParams={}}function f(e,l,b,P){function A(e,t){var s={};return t=m({},l,t),d(t,function(t,o){var i;if(y(t)&&(t=t(e)),t&&t.charAt&&"@"===t.charAt(0)){if(i=e,null==(u=t.substr(1))||""===u||"hasOwnProperty"===u||!n.test("."+u))throw a("badmember",u);for(var u,c=0,l=(u=u.split(".")).length;c<l&&r.isDefined(i);c++){var p=u[c];i=null!==i?i[p]:void 0}}else i=t;s[o]=i}),s}function E(e){return e.resource}function T(e){t(e||{},this)}var R=new p(e,P);return b=m({},s.defaults.actions,b),T.prototype.toJSON=function(){var e=m({},this);return delete e.$promise,delete e.$resolved,delete e.$cancelRequest,e},d(b,function(e,r){var n=/^(POST|PUT|PATCH)$/i.test(e.method),s=e.timeout,l=v(e.cancellable)?e.cancellable:R.defaults.cancellable;s&&!w(s)&&(i.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete e.timeout,s=null),T[r]=function(i,p,f,v){var w,b,P,O={};switch(arguments.length){case 4:P=v,b=f;case 3:case 2:if(!y(p)){O=i,w=p,b=f;break}if(y(i)){b=i,P=p;break}b=p,P=f;case 1:y(i)?b=i:n?w=i:O=i;break;case 0:break;default:throw a("badargs",arguments.length)}var q,x,k=this instanceof T,D=k?w:e.isArray?[]:new T(w),S={},W=e.interceptor&&e.interceptor.response||E,j=e.interceptor&&e.interceptor.responseError||void 0;return d(e,function(e,r){switch(r){default:S[r]=$(e);case"params":case"isArray":case"interceptor":case"cancellable":}}),!k&&l&&(q=u.defer(),S.timeout=q.promise,s&&(x=c(q.resolve,s))),n&&(S.data=w),R.setUrlParams(S,m({},A(w,e.params||{}),O),e.url),(O=o(S).then(function(n){var s=n.data;if(s){if(g(s)!==!!e.isArray)throw a("badcfg",r,e.isArray?"array":"object",g(s)?"array":"object",S.method,S.url);if(e.isArray)D.length=0,d(s,function(e){"object"==typeof e?D.push(new T(e)):D.push(e)});else{var o=D.$promise;t(s,D),D.$promise=o}}return n.resource=D,n},function(e){return(P||h)(e),u.reject(e)}))["finally"](function(){D.$resolved=!0,!k&&l&&(D.$cancelRequest=h,c.cancel(x),q=x=S.timeout=null)}),O=O.then(function(e){var r=W(e);return(b||h)(r,e.headers,e.status,e.statusText),r},j),k?O:(D.$promise=O,D.$resolved=!1,l&&(D.$cancelRequest=q.resolve),D)},T.prototype["$"+r]=function(e,t,a){return y(e)&&(a=t,t=e,e={}),(e=T[r].call(this,e,this,t,a)).$promise||e}}),T.bind=function(r){return r=m({},l,r),f(e,r,b,P)},T}var h=r.noop,d=r.forEach,m=r.extend,$=r.copy,g=r.isArray,v=r.isDefined,y=r.isFunction,w=r.isNumber;return p.prototype={setUrlParams:function(r,t,n){var s,o,i=this,u=n||i.template,c="",p=i.urlParams={};d(u.split(/\W/),function(e){if("hasOwnProperty"===e)throw a("badname");!/^\d+$/.test(e)&&e&&new RegExp("(^|[^\\\\]):"+e+"(\\W|$)").test(u)&&(p[e]={isQueryParamValue:new RegExp("\\?.*=:"+e+"(?:\\W|$)").test(u)})}),u=(u=u.replace(/\\:/g,":")).replace(e,function(e){return c=e,""}),t=t||{},d(i.urlParams,function(e,r){s=t.hasOwnProperty(r)?t[r]:i.defaults[r],v(s)&&null!==s?(o=e.isQueryParamValue?l(s,!0):l(s,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),u=u.replace(new RegExp(":"+r+"(\\W|$)","g"),function(e,r){return o+r})):u=u.replace(new RegExp("(/?):"+r+"(\\W|$)","g"),function(e,r,t){return"/"===t.charAt(0)?t:r+t})}),i.defaults.stripTrailingSlashes&&(u=u.replace(/\/+$/,"")||"/"),u=u.replace(/\/\.(?=\w+($|\?))/,"."),r.url=c+u.replace(/\/\\\./,"/."),d(t,function(e,t){i.urlParams[t]||(r.params=r.params||{},r.params[t]=e)})}},f}]})}(window,window.angular);