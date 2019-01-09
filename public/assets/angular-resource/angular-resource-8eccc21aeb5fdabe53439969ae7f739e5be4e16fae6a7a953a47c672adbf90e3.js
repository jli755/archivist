!function(e,r){"use strict";function t(e){return null!=e&&""!==e&&"hasOwnProperty"!==e&&o.test("."+e)}function a(e,a){if(!t(a))throw s("badmember",'Dotted member path "@{0}" is invalid.',a);for(var n=a.split("."),o=0,i=n.length;o<i&&r.isDefined(e);o++){var u=n[o];e=null!==e?e[u]:undefined}return e}function n(e,t){for(var a in t=t||{},r.forEach(t,function(e,r){delete t[r]}),e)!e.hasOwnProperty(a)||"$"===a.charAt(0)&&"$"===a.charAt(1)||(t[a]=e[a]);return t}var s=r.$$minErr("$resource"),o=/^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;r.module("ngResource",["ng"]).provider("$resource",function(){var e=/^https?:\/\/[^/]*/,t=this;this.defaults={stripTrailingSlashes:!0,cancellable:!1,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$log","$q","$timeout",function(o,i,u,c){function l(e){return p(e,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function p(e,r){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,r?"%20":"+")}function f(e,r){this.template=e,this.defaults=g({},t.defaults,r),this.urlParams={}}function d(e,r,l,p){function E(e,t){var n={};return t=g({},r,t),m(t,function(r,t){w(r)&&(r=r(e)),n[t]=r&&r.charAt&&"@"===r.charAt(0)?a(e,r.substr(1)):r}),n}function P(e){return e.resource}function A(e){n(e||{},this)}var R=new f(e,p);return l=g({},t.defaults.actions,l),A.prototype.toJSON=function(){var e=g({},this);return delete e.$promise,delete e.$resolved,delete e.$cancelRequest,e},m(l,function(e,r){var t=/^(POST|PUT|PATCH)$/i.test(e.method),a=e.timeout,l=b(e.cancellable)?e.cancellable:R.defaults.cancellable;a&&!y(a)&&(i.debug("ngResource:\n  Only numeric values are allowed as `timeout`.\n  Promises are not supported in $resource, because the same value would be used for multiple requests. If you are looking for a way to cancel requests, you should use the `cancellable` option."),delete e.timeout,a=null),A[r]=function(i,p,f,d){var b,y,T,x={};switch(arguments.length){case 4:T=d,y=f;case 3:case 2:if(!w(p)){x=i,b=p,y=f;break}if(w(i)){y=i,T=p;break}y=p,T=f;case 1:w(i)?y=i:t?b=i:x=i;break;case 0:break;default:throw s("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var O,q,k=this instanceof A,D=k?b:e.isArray?[]:new A(b),S={},W=e.interceptor&&e.interceptor.response||P,j=e.interceptor&&e.interceptor.responseError||undefined;m(e,function(e,r){switch(r){default:S[r]=$(e);break;case"params":case"isArray":case"interceptor":case"cancellable":}}),!k&&l&&(O=u.defer(),S.timeout=O.promise,a&&(q=c(O.resolve,a))),t&&(S.data=b),R.setUrlParams(S,g({},E(b,e.params||{}),x),e.url);var U=o(S).then(function(t){var a=t.data;if(a){if(v(a)!==!!e.isArray)throw s("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2} (Request: {3} {4})",r,e.isArray?"array":"object",v(a)?"array":"object",S.method,S.url);if(e.isArray)D.length=0,m(a,function(e){"object"==typeof e?D.push(new A(e)):D.push(e)});else{var o=D.$promise;n(a,D),D.$promise=o}}return t.resource=D,t},function(e){return(T||h)(e),u.reject(e)});return U["finally"](function(){D.$resolved=!0,!k&&l&&(D.$cancelRequest=h,c.cancel(q),O=q=S.timeout=null)}),U=U.then(function(e){var r=W(e);return(y||h)(r,e.headers,e.status,e.statusText),r},j),k?U:(D.$promise=U,D.$resolved=!1,l&&(D.$cancelRequest=O.resolve),D)},A.prototype["$"+r]=function(e,t,a){w(e)&&(a=t,t=e,e={});var n=A[r].call(this,e,this,t,a);return n.$promise||n}}),A.bind=function(t){var a=g({},r,t);return d(e,a,l,p)},A}var h=r.noop,m=r.forEach,g=r.extend,$=r.copy,v=r.isArray,b=r.isDefined,w=r.isFunction,y=r.isNumber;return f.prototype={setUrlParams:function(r,t,a){var n,o,i=this,u=a||i.template,c="",f=i.urlParams={};m(u.split(/\W/),function(e){if("hasOwnProperty"===e)throw s("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(e)&&e&&new RegExp("(^|[^\\\\]):"+e+"(\\W|$)").test(u)&&(f[e]={isQueryParamValue:new RegExp("\\?.*=:"+e+"(?:\\W|$)").test(u)})}),u=(u=u.replace(/\\:/g,":")).replace(e,function(e){return c=e,""}),t=t||{},m(i.urlParams,function(e,r){n=t.hasOwnProperty(r)?t[r]:i.defaults[r],b(n)&&null!==n?(o=e.isQueryParamValue?p(n,!0):l(n),u=u.replace(new RegExp(":"+r+"(\\W|$)","g"),function(e,r){return o+r})):u=u.replace(new RegExp("(/?):"+r+"(\\W|$)","g"),function(e,r,t){return"/"===t.charAt(0)?t:r+t})}),i.defaults.stripTrailingSlashes&&(u=u.replace(/\/+$/,"")||"/"),u=u.replace(/\/\.(?=\w+($|\?))/,"."),r.url=c+u.replace(/\/\\\./,"/."),m(t,function(e,t){i.urlParams[t]||(r.params=r.params||{},r.params[t]=e)})}},d}]})}(window,window.angular);