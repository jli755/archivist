!function(n,t){"use strict";function e(n,t,e){if(!n)throw G("areq",t||"?",e||"required");return n}function a(n,t){return n||t?n?t?(E(n)&&(n=n.join(" ")),E(t)&&(t=t.join(" ")),n+" "+t):n:t:""}function r(n){var t={};return n&&(n.to||n.from)&&(t.to=n.to,t.from=n.from),t}function i(n,t,e){var a="";return n=E(n)?n:n&&K(n)&&n.length?n.split(/\s+/):[],M(n,function(n,r){n&&0<n.length&&(a+=0<r?" ":"",a+=e?t+n:n+t)}),a}function o(n){if(n instanceof J)switch(n.length){case 0:return n;case 1:if(1===n[0].nodeType)return n;break;default:return J(s(n))}if(1===n.nodeType)return J(n)}function s(n){if(!n[0])return n;for(var t=0;t<n.length;t++){var e=n[t];if(1===e.nodeType)return e}}function u(n,t,e){M(t,function(t){n.addClass(t,e)})}function l(n,t,e){M(t,function(t){n.removeClass(t,e)})}function c(n){return function(t,e){e.addClass&&(u(n,t,e.addClass),e.addClass=null),e.removeClass&&(l(n,t,e.removeClass),e.removeClass=null)}}function f(n){if(!(n=n||{}).$$prepared){var t=n.domOperation||Q;n.domOperation=function(){n.$$domOperationFired=!0,t(),t=Q},n.$$prepared=!0}return n}function m(n,t){d(n,t),p(n,t)}function d(n,t){t.from&&(n.css(t.from),t.from=null)}function p(n,t){t.to&&(n.css(t.to),t.to=null)}function v(n,t,e){var a=t.options||{};e=e.options||{};var r=(a.addClass||"")+" "+(e.addClass||""),i=(a.removeClass||"")+" "+(e.removeClass||"");return n=h(n.attr("class"),r,i),e.preparationClasses&&(a.preparationClasses=A(e.preparationClasses,a.preparationClasses),delete e.preparationClasses),r=a.domOperation!==Q?a.domOperation:null,R(a,e),r&&(a.domOperation=r),a.addClass=n.addClass?n.addClass:null,a.removeClass=n.removeClass?n.removeClass:null,t.addClass=a.addClass,t.removeClass=a.removeClass,a}function h(n,t,e){function a(n){K(n)&&(n=n.split(" "));var t={};return M(n,function(n){n.length&&(t[n]=!0)}),t}var r={};n=a(n),t=a(t),M(t,function(n,t){r[t]=1}),e=a(e),M(e,function(n,t){r[t]=1===r[t]?null:-1});var i={addClass:"",removeClass:""};return M(r,function(t,e){var a,r;1===t?(a="addClass",r=!n[e]||n[e+"-remove"]):-1===t&&(a="removeClass",r=n[e]||n[e+"-add"]),r&&(i[a].length&&(i[a]+=" "),i[a]+=e)}),i}function $(n){return n instanceof J?n[0]:n}function g(n,t,e){var a="";t&&(a=i(t,"ng-",!0)),e.addClass&&(a=A(a,i(e.addClass,"-add"))),e.removeClass&&(a=A(a,i(e.removeClass,"-remove"))),a.length&&(e.preparationClasses=a,n.addClass(a))}function C(n,t){var e=t?"-"+t+"s":"";return D(n,[V,e]),[V,e]}function y(n,t){var e=t?"paused":"",a=P+"PlayState";return D(n,[a,e]),[a,e]}function D(n,t){n.style[t[0]]=t[1]}function A(n,t){return n?t?n+" "+t:n:t}function b(n,t,e){var a=Object.create(null),r=n.getComputedStyle(t)||{};return M(e,function(n,t){var e=r[n];if(e){var i=e.charAt(0);("-"===i||"+"===i||0<=i)&&(e=k(e)),0===e&&(e=null),a[t]=e}}),a}function k(n){var t=0;return n=n.split(/\s*,\s*/),M(n,function(n){"s"===n.charAt(n.length-1)&&(n=n.substring(0,n.length-1)),n=parseFloat(n)||0,t=t?Math.max(n,t):n}),t}function w(n){return 0===n||null!=n}function T(n,t){var e=x,a=n+"s";return t?e+="Duration":a+=" linear all",[e,a]}function S(){var n=Object.create(null);return{flush:function(){n=Object.create(null)},count:function(t){return(t=n[t])?t.total:0},get:function(t){return(t=n[t])&&t.value},put:function(t,e){n[t]?n[t].total++:n[t]={total:1,value:e}}}}function j(n,t,e){M(e,function(e){n[e]=I(n[e])?n[e]:t.style.getPropertyValue(e)})}var x,O,P,N;void 0===n.ontransitionend&&void 0!==n.onwebkittransitionend?(x="WebkitTransition",O="webkitTransitionEnd transitionend"):(x="transition",O="transitionend"),void 0===n.onanimationend&&void 0!==n.onwebkitanimationend?(P="WebkitAnimation",N="webkitAnimationEnd animationend"):(P="animation",N="animationend");var F,R,M,E,I,q,L,H,K,B,J,Q,U=P+"Delay",W=P+"Duration",V=x+"Delay",z=x+"Duration",G=t.$$minErr("ng"),X={transitionDuration:z,transitionDelay:V,transitionProperty:x+"Property",animationDuration:W,animationDelay:U,animationIterationCount:P+"IterationCount"},Y={transitionDuration:z,transitionDelay:V,animationDuration:W,animationDelay:U};t.module("ngAnimate",[],function(){Q=t.noop,F=t.copy,R=t.extend,J=t.element,M=t.forEach,E=t.isArray,K=t.isString,H=t.isObject,B=t.isUndefined,I=t.isDefined,L=t.isFunction,q=t.isElement}).directive("ngAnimateSwap",["$animate","$rootScope",function(n){return{restrict:"A",transclude:"element",terminal:!0,priority:600,link:function(t,e,a,r,i){var o,s;t.$watchCollection(a.ngAnimateSwap||a["for"],function(a){o&&n.leave(o),s&&(s.$destroy(),s=null),(a||0===a)&&(s=t.$new(),i(s,function(t){o=t,n.enter(t,null,e)}))})}}}]).directive("ngAnimateChildren",["$interpolate",function(n){return{link:function(t,e,a){function r(n){e.data("$$ngAnimateChildren","on"===n||"true"===n)}var i=a.ngAnimateChildren;K(i)&&0===i.length?e.data("$$ngAnimateChildren",!0):(r(n(i)(t)),a.$observe("ngAnimateChildren",r))}}}]).factory("$$rAFScheduler",["$$rAF",function(n){function t(n){a=a.concat(n),e()}function e(){if(a.length){for(var t=a.shift(),i=0;i<t.length;i++)t[i]();r||n(function(){r||e()})}}var a,r;return a=t.queue=[],t.waitUntilQuiet=function(t){r&&r(),r=n(function(){r=null,t(),e()})},t}]).provider("$$animateQueue",["$animateProvider",function(t){function a(n){if(!n)return null;n=n.split(" ");var t=Object.create(null);return M(n,function(n){t[n]=!0}),t}function r(n,t){if(n&&t){var e=a(t);return n.split(" ").some(function(n){return e[n]})}}function i(n,t,e,a){return l[n].some(function(n){return n(t,e,a)})}function u(n,t){var e=0<(n.addClass||"").length,a=0<(n.removeClass||"").length;return t?e&&a:e||a}var l=this.rules={skip:[],cancel:[],join:[]};l.join.push(function(n,t){return!t.structural&&u(t)}),l.skip.push(function(n,t){return!t.structural&&!u(t)}),l.skip.push(function(n,t,e){return"leave"===e.event&&t.structural}),l.skip.push(function(n,t,e){return e.structural&&2===e.state&&!t.structural}),l.cancel.push(function(n,t,e){return e.structural&&t.structural}),l.cancel.push(function(n,t,e){return 2===e.state&&t.structural}),l.cancel.push(function(n,t,e){if(e.structural)return!1;n=t.addClass,t=t.removeClass;var a=e.addClass;return e=e.removeClass,!(B(n)&&B(t)||B(a)&&B(e))&&(r(n,e)||r(t,a))}),this.$get=["$$rAF","$rootScope","$rootElement","$document","$$HashMap","$$animation","$$AnimateRunner","$templateRequest","$$jqLite","$$forceReflow",function(a,r,l,d,p,h,C,y,D){function A(){var n=!1;return function(t){n?t():r.$$postDigest(function(){n=!0,t()})}}function b(n,t,e){var a=$(t),r=$(n),i=[];return(n=U[e])&&M(n,function(n){G.call(n.node,a)?i.push(n.callback):"leave"===e&&G.call(n.node,r)&&i.push(n.callback)}),i}function k(n,t,e){var a=s(t);return n.filter(function(n){return!(n.node===a&&(!e||n.callback===e))})}function w(n,t,e){function s(t,e,r,i){k(function(){var t=b(p,n,e);t.length?a(function(){M(t,function(t){t(n,r,i)}),"close"!==r||n[0].parentNode||X.off(n)}):"close"!==r||n[0].parentNode||X.off(n)}),t.progress(e,r,i)}function l(t){var e=n,a=y;a.preparationClasses&&(e.removeClass(a.preparationClasses),a.preparationClasses=null),a.activeClasses&&(e.removeClass(a.activeClasses),a.activeClasses=null),z(n,y),m(n,y),y.domOperation(),D.complete(!t)}var c,p,y=F(e);(n=o(n))&&(c=$(n),p=n.parent());y=f(y);var D=new C,k=A();if(E(y.addClass)&&(y.addClass=y.addClass.join(" ")),y.addClass&&!K(y.addClass)&&(y.addClass=null),E(y.removeClass)&&(y.removeClass=y.removeClass.join(" ")),y.removeClass&&!K(y.removeClass)&&(y.removeClass=null),y.from&&!H(y.from)&&(y.from=null),y.to&&!H(y.to)&&(y.to=null),!c)return l(),D;if(e=[c.className,y.addClass,y.removeClass].join(" "),!V(e))return l(),D;var w=0<=["enter","move","leave"].indexOf(t),j=d[0].hidden,R=!L||j||N.get(c),I=!!(e=!R&&P.get(c)||{}).state;if(R||I&&1===e.state||(R=!x(n,p,t)),R)return j&&s(D,t,"start"),l(),j&&s(D,t,"close"),D;if(w&&T(n),j={structural:w,element:n,event:t,addClass:y.addClass,removeClass:y.removeClass,close:l,options:y,runner:D},I){if(i("skip",n,j,e))return 2===e.state?(l(),D):(v(n,e,j),e.runner);if(i("cancel",n,j,e))if(2===e.state)e.runner.end();else{if(!e.structural)return v(n,e,j),e.runner;e.close()}else if(i("join",n,j,e)){if(2!==e.state)return g(n,w?t:null,y),t=j.event=e.event,y=v(n,e,j),e.runner;v(n,j,{})}}else v(n,j,{});if((I=j.structural)||(I="animate"===j.event&&0<Object.keys(j.options.to||{}).length||u(j)),!I)return l(),S(n),D;var q=(e.counter||0)+1;return j.counter=q,O(n,1,j),r.$$postDigest(function(){var e=!(a=P.get(c)),a=a||{},r=0<(n.parent()||[]).length&&("animate"===a.event||a.structural||u(a));e||a.counter!==q||!r?(e&&(z(n,y),m(n,y)),(e||w&&a.event!==t)&&(y.domOperation(),D.end()),r||S(n)):(t=!a.structural&&u(a,!0)?"setClass":a.event,O(n,2),a=h(n,t,a.options),D.setHost(a),s(D,t,"start",{}),a.done(function(e){l(!e),(e=P.get(c))&&e.counter===q&&S($(n)),s(D,t,"close",{})}))}),D}function T(n){n=$(n).querySelectorAll("[data-ng-animate]"),M(n,function(n){var t=parseInt(n.getAttribute("data-ng-animate"),10),e=P.get(n);if(e)switch(t){case 2:e.runner.end();case 1:P.remove(n)}})}function S(n){(n=$(n)).removeAttribute("data-ng-animate"),P.remove(n)}function j(n,t){return $(n)===$(t)}function x(n,t,e){var a,r=j(n,e=J(d[0].body))||"HTML"===n[0].nodeName,i=j(n,l),o=!1,s=N.get($(n));for((n=J.data(n[0],"$ngAnimatePin"))&&(t=n),t=$(t);t&&(i||(i=j(t,l)),1===t.nodeType);){if(n=P.get(t)||{},!o){var u=N.get(t);if(!0===u&&!1!==s){s=!0;break}!1===u&&(s=!1),o=n.structural}if((B(a)||!0===a)&&(n=J.data(t,"$$ngAnimateChildren"),I(n)&&(a=n)),o&&!1===a)break;if(r||(r=j(t,e)),r&&i)break;t=i||!(n=J.data(t,"$ngAnimatePin"))?t.parentNode:$(n)}return(!o||a)&&!0!==s&&i&&r}function O(n,t,e){(e=e||{}).state=t,(n=$(n)).setAttribute("data-ng-animate",t),e=(t=P.get(n))?R(t,e):e,P.put(n,e)}var P=new p,N=new p,L=null,Q=r.$watch(function(){return 0===y.totalPendingRequests},function(n){n&&(Q(),r.$$postDigest(function(){r.$$postDigest(function(){null===L&&(L=!0)})}))}),U=Object.create(null),W=t.classNameFilter(),V=W?function(n){return W.test(n)}:function(){return!0},z=c(D),G=n.Node.prototype.contains||function(n){return this===n||!!(16&this.compareDocumentPosition(n))},X={on:function(n,t,e){var a=s(t);U[n]=U[n]||[],U[n].push({node:a,callback:e}),J(t).on("$destroy",function(){P.get(a)||X.off(n,t,e)})},off:function(n,t,e){if(1!==arguments.length||K(arguments[0])){var a=U[n];a&&(U[n]=1===arguments.length?null:k(a,t,e))}else for(a in t=arguments[0],U)U[a]=k(U[a],t)},pin:function(n,t){e(q(n),"element","not an element"),e(q(t),"parentElement","not an element"),n.data("$ngAnimatePin",t)},push:function(n,t,e,a){return(e=e||{}).domOperation=a,w(n,t,e)},enabled:function(n,t){var e=arguments.length;if(0===e)t=!!L;else if(q(n)){var a=$(n);1===e?t=!N.get(a):N.put(a,!t)}else t=L=!!n;return t}};return X}]}]).provider("$$animation",["$animateProvider",function(){var n=this.drivers=[];this.$get=["$$jqLite","$rootScope","$injector","$$AnimateRunner","$$HashMap","$$rAFScheduler",function(t,e,r,i,o,s){function u(n){function t(n){if(n.processed)return n;n.processed=!0;var e,i=n.domNode,o=i.parentNode;for(r.put(i,n);o;){if(e=r.get(o)){e.processed||(e=t(e));break}o=o.parentNode}return(e||a).children.push(n),n}var e,a={children:[]},r=new o;for(e=0;e<n.length;e++){var i=n[e];r.put(i.domNode,n[e]={domNode:i.domNode,fn:i.fn,children:[]})}for(e=0;e<n.length;e++)t(n[e]);return function(n){var t,e=[],a=[];for(t=0;t<n.children.length;t++)a.push(n.children[t]);n=a.length;var r=0,i=[];for(t=0;t<a.length;t++){var o=a[t];0>=n&&(n=r,r=0,e.push(i),i=[]),i.push(o.fn),o.children.forEach(function(n){r++,a.push(n)}),n--}return i.length&&e.push(i),e}(a)}var l=[],d=c(t);return function(o,c,p){function v(n){n=n.hasAttribute("ng-animate-ref")?[n]:n.querySelectorAll("[ng-animate-ref]");var t=[];return M(n,function(n){var e=n.getAttribute("ng-animate-ref");e&&e.length&&t.push(n)}),t}function h(n){var t=[],e={};M(n,function(n,a){var r=$(n.element),i=0<=["enter","move"].indexOf(n.event);if((r=n.structural?v(r):[]).length){var o=i?"to":"from";M(r,function(n){var t=n.getAttribute("ng-animate-ref");e[t]=e[t]||{},e[t][o]={animationID:a,element:J(n)}})}else t.push(n)});var a={},r={};return M(e,function(e){var i=e.from,o=e.to;if(i&&o){var s=n[i.animationID],u=n[o.animationID],l=i.animationID.toString();if(!r[l]){var c=r[l]={structural:!0,beforeStart:function(){s.beforeStart(),u.beforeStart()},close:function(){s.close(),u.close()},classes:g(s.classes,u.classes),from:s,to:u,anchors:[]};c.classes.length?t.push(c):(t.push(s),t.push(u))}r[l].anchors.push({out:i.element,"in":o.element})}else o=(i=i?i.animationID:o.animationID).toString(),a[o]||(a[o]=!0,t.push(n[i]))}),t}function g(n,t){n=n.split(" "),t=t.split(" ");for(var e=[],a=0;a<n.length;a++){var r=n[a];if("ng-"!==r.substring(0,3))for(var i=0;i<t.length;i++)if(r===t[i]){e.push(r);break}}return e.join(" ")}function C(t){for(var e=n.length-1;0<=e;e--){var a=r.get(n[e])(t);if(a)return a}}function y(n,t){function e(n){(n=n.data("$$animationRunner"))&&n.setHost(t)}n.from&&n.to?(e(n.from.element),e(n.to.element)):e(n.element)}function D(){var n=o.data("$$animationRunner");!n||"leave"===c&&p.$$domOperationFired||n.end()}function A(n){o.off("$destroy",D),o.removeData("$$animationRunner"),d(o,p),m(o,p),p.domOperation(),S&&t.removeClass(o,S),o.removeClass("ng-animate"),k.complete(!n)}p=f(p);var b=0<=["enter","move","leave"].indexOf(c),k=new i({end:function(){A()},cancel:function(){A(!0)}});if(!n.length)return A(),k;o.data("$$animationRunner",k);var w,T=a(o.attr("class"),a(p.addClass,p.removeClass)),S=p.tempClasses;return S&&(T+=" "+S,p.tempClasses=null),b&&(w="ng-"+c+"-prepare",t.addClass(o,w)),l.push({element:o,classes:T,event:c,structural:b,options:p,beforeStart:function(){o.addClass("ng-animate"),S&&t.addClass(o,S),w&&(t.removeClass(o,w),w=null)},close:A}),o.on("$destroy",D),1<l.length?k:(e.$$postDigest(function(){var n=[];M(l,function(t){t.element.data("$$animationRunner")?n.push(t):t.close()}),l.length=0;var t=h(n),e=[];M(t,function(n){e.push({domNode:$(n.from?n.from.element:n.element),fn:function(){n.beforeStart();var t,e=n.close;if((n.anchors?n.from.element||n.to.element:n.element).data("$$animationRunner")){var a=C(n);a&&(t=a.start)}t?((t=t()).done(function(n){e(!n)}),y(n,t)):e()}})}),s(u(e))}),k)}}]}]).provider("$animateCss",["$animateProvider",function(){var n=S(),t=S();this.$get=["$window","$$jqLite","$$AnimateRunner","$timeout","$$forceReflow","$sniffer","$$rAFScheduler","$$animateQueue",function(e,a,o,s,u,l,v,h){function g(n,t){var e=n.parentNode;return(e.$$ngAnimateParentKey||(e.$$ngAnimateParentKey=++I))+"-"+n.getAttribute("class")+"-"+t}function A(r,o,s,u){var l;return 0<n.count(s)&&((l=t.get(s))||(o=i(o,"-stagger"),a.addClass(r,o),(l=b(e,r,u)).animationDuration=Math.max(l.animationDuration,0),l.transitionDuration=Math.max(l.transitionDuration,0),a.removeClass(r,o),t.put(s,l))),l||{}}function k(e){q.push(e),v.waitUntilQuiet(function(){n.flush(),t.flush();for(var e=u(),a=0;a<q.length;a++)q[a](e);q.length=0})}function S(t,a,r){return(a=n.get(r))||"infinite"===(a=b(e,t,X)).animationIterationCount&&(a.animationIterationCount=1),n.put(r,a),r=(t=a).animationDelay,a=t.transitionDelay,t.maxDelay=r&&a?Math.max(r,a):r||a,t.maxDuration=Math.max(t.animationDuration*t.animationIterationCount,t.transitionDuration),t}var R=c(a),I=0,q=[];return function(t,e){function u(){v()}function c(){v(!0)}function v(n){if(!(J||G&&z)){J=!0,z=!1,H.$$skipPreparationClasses||a.removeClass(t,pn),a.removeClass(t,hn),y(B,!1),C(B,!1),M(rn,function(n){B.style[n[0]]=""}),R(t,H),m(t,H),Object.keys(K).length&&M(K,function(n,t){n?B.style.setProperty(t,n):B.style.removeProperty(t)}),H.onDone&&H.onDone(),un&&un.length&&t.off(un.join(" "),q);var e=t.data("$$animateCss");e&&(s.cancel(e[0].timer),t.removeData("$$animateCss")),X&&X.complete(!n)}}function b(n){Dn.blockTransition&&C(B,n),Dn.blockKeyframeAnimation&&y(B,!!n)}function I(){return X=new o({end:u,cancel:c}),k(Q),v(),{$$willAnimate:!1,start:function(){return X},end:u}}function q(n){n.stopPropagation();var t=n.originalEvent||n;n=t.$manualTimeStamp||Date.now(),t=parseFloat(t.elapsedTime.toFixed(3)),Math.max(n-an,0)>=nn&&t>=tn&&(G=!0,v())}function L(){function n(){if(!J){if(b(!1),M(rn,function(n){B.style[n[0]]=n[1]}),R(t,H),a.addClass(t,hn),Dn.recalculateTimingStyles){if(vn=B.className+" "+pn,mn=g(B,vn),gn=S(B,vn,mn),Cn=gn.maxDelay,_=Math.max(Cn,0),0===(tn=gn.maxDuration))return void v();Dn.hasTransitions=0<gn.transitionDuration,Dn.hasAnimations=0<gn.animationDuration}if(Dn.applyAnimationDelay&&(Cn="boolean"!=typeof H.delay&&w(H.delay)?parseFloat(H.delay):Cn,_=Math.max(Cn,0),gn.animationDelay=Cn,yn=[U,Cn+"s"],rn.push(yn),B.style[yn[0]]=yn[1]),nn=1e3*_,en=1e3*tn,H.easing){var n,r=H.easing;Dn.hasTransitions&&(n=x+"TimingFunction",rn.push([n,r]),B.style[n]=r),Dn.hasAnimations&&(n=P+"TimingFunction",rn.push([n,r]),B.style[n]=r)}gn.transitionDuration&&un.push(O),gn.animationDuration&&un.push(N),an=Date.now();var i=nn+1.5*en;n=an+i;var o=!0;if((r=t.data("$$animateCss")||[]).length){var u=r[0];(o=n>u.expectedEndTime)?s.cancel(u.timer):r.push(v)}o&&(i=s(e,i,!1),r[0]={timer:i,expectedEndTime:n},r.push(v),t.data("$$animateCss",r)),un.length&&t.on(un.join(" "),q),H.to&&(H.cleanupStyles&&j(K,B,Object.keys(H.to)),p(t,H))}}function e(){var n=t.data("$$animateCss");if(n){for(var e=1;e<n.length;e++)n[e]();t.removeData("$$animateCss")}}if(!J)if(B.parentNode){var r=function(n){if(G)z&&n&&(z=!1,v());else if(z=!n,gn.animationDuration)if(n=y(B,z),z)rn.push(n);else{var t=rn,e=t.indexOf(n);0<=n&&t.splice(e,1)}},i=0<$n&&(gn.transitionDuration&&0===dn.transitionDuration||gn.animationDuration&&0===dn.animationDuration)&&Math.max(dn.animationDelay,dn.transitionDelay);i?s(n,Math.floor(i*$n*1e3),!1):n(),Z.resume=function(){r(!0)},Z.pause=function(){r(!1)}}else v()}var H=e||{};H.$$prepared||(H=f(F(H)));var K={},B=$(t);if(!B||!B.parentNode||!h.enabled())return I();var J,z,G,X,Z,_,nn,tn,en,an,rn=[],on=t.attr("class"),sn=r(H),un=[];if(0===H.duration||!l.animations&&!l.transitions)return I();var ln=H.event&&E(H.event)?H.event.join(" "):H.event,cn="",fn="";ln&&H.structural?cn=i(ln,"ng-",!0):ln&&(cn=ln),H.addClass&&(fn+=i(H.addClass,"-add")),H.removeClass&&(fn.length&&(fn+=" "),fn+=i(H.removeClass,"-remove")),H.applyClassesEarly&&fn.length&&R(t,H);var mn,dn,pn=[cn,fn].join(" ").trim(),vn=on+" "+pn,hn=i(pn,"-active");on=sn.to&&0<Object.keys(sn.to).length;if(!(0<(H.keyframeStyle||"").length||on||pn))return I();0<H.stagger?(sn=parseFloat(H.stagger),dn={transitionDelay:sn,animationDelay:sn,transitionDuration:0,animationDuration:0}):(mn=g(B,vn),dn=A(B,pn,mn,Y)),H.$$skipPreparationClasses||a.addClass(t,pn),H.transitionStyle&&(sn=[x,H.transitionStyle],D(B,sn),rn.push(sn)),0<=H.duration&&(sn=0<B.style[x].length,sn=T(H.duration,sn),D(B,sn),rn.push(sn)),H.keyframeStyle&&(sn=[P,H.keyframeStyle],D(B,sn),rn.push(sn));var $n=dn?0<=H.staggerIndex?H.staggerIndex:n.count(mn):0;(ln=0===$n)&&!H.skipBlocking&&C(B,9999);var gn=S(B,vn,mn),Cn=gn.maxDelay;_=Math.max(Cn,0),tn=gn.maxDuration;var yn,Dn={};if(Dn.hasTransitions=0<gn.transitionDuration,Dn.hasAnimations=0<gn.animationDuration,Dn.hasTransitionAll=Dn.hasTransitions&&"all"===gn.transitionProperty,Dn.applyTransitionDuration=on&&(Dn.hasTransitions&&!Dn.hasTransitionAll||Dn.hasAnimations&&!Dn.hasTransitions),Dn.applyAnimationDuration=H.duration&&Dn.hasAnimations,Dn.applyTransitionDelay=w(H.delay)&&(Dn.applyTransitionDuration||Dn.hasTransitions),Dn.applyAnimationDelay=w(H.delay)&&Dn.hasAnimations,Dn.recalculateTimingStyles=0<fn.length,(Dn.applyTransitionDuration||Dn.applyAnimationDuration)&&(tn=H.duration?parseFloat(H.duration):tn,Dn.applyTransitionDuration&&(Dn.hasTransitions=!0,gn.transitionDuration=tn,sn=0<B.style[x+"Property"].length,rn.push(T(tn,sn))),Dn.applyAnimationDuration&&(Dn.hasAnimations=!0,gn.animationDuration=tn,rn.push([W,tn+"s"]))),0===tn&&!Dn.recalculateTimingStyles)return I();null!=H.delay&&("boolean"!=typeof H.delay&&(yn=parseFloat(H.delay),_=Math.max(yn,0)),Dn.applyTransitionDelay&&rn.push([V,yn+"s"]),Dn.applyAnimationDelay&&rn.push([U,yn+"s"]));return null==H.duration&&0<gn.transitionDuration&&(Dn.recalculateTimingStyles=Dn.recalculateTimingStyles||ln),nn=1e3*_,en=1e3*tn,H.skipBlocking||(Dn.blockTransition=0<gn.transitionDuration,Dn.blockKeyframeAnimation=0<gn.animationDuration&&0<dn.animationDelay&&0===dn.animationDuration),H.from&&(H.cleanupStyles&&j(K,B,Object.keys(H.from)),d(t,H)),Dn.blockTransition||Dn.blockKeyframeAnimation?b(tn):H.skipBlocking||C(B,!1),{$$willAnimate:!0,end:u,start:function(){if(!J)return X=new o(Z={end:u,cancel:c,resume:null,pause:null}),k(L),X}}}}]}]).provider("$$animateCssDriver",["$$animationProvider",function(n){n.drivers.push("$$animateCssDriver"),this.$get=["$animateCss","$rootScope","$$AnimateRunner","$rootElement","$sniffer","$$jqLite","$document",function(n,t,e,a,r,i,o){function s(n){return n.replace(/\bng-\S+\b/g,"")}function u(n,t){return K(n)&&(n=n.split(" ")),K(t)&&(t=t.split(" ")),n.filter(function(n){return-1===t.indexOf(n)}).join(" ")}function l(t,a,r){function i(n){var t={},e=$(n).getBoundingClientRect();return M(["width","height","top","left"],function(n){var a=e[n];switch(n){case"top":a+=m.scrollTop;break;case"left":a+=m.scrollLeft}t[n]=Math.floor(a)+"px"}),t}function o(){var t=u(e=s(r.attr("class")||""),p),e=u(p,e);return(t=n(f,{to:i(r),addClass:"ng-anchor-in "+t,removeClass:"ng-anchor-out "+e,delay:!0})).$$willAnimate?t:null}function l(){f.remove(),a.removeClass("ng-animate-shim"),r.removeClass("ng-animate-shim")}var c,f=J($(a).cloneNode(!0)),p=s(f.attr("class")||"");if(a.addClass("ng-animate-shim"),r.addClass("ng-animate-shim"),f.addClass("ng-anchor"),d.append(f),!(t=function(){var t=n(f,{addClass:"ng-anchor-out",delay:!0,from:i(a)});return t.$$willAnimate?t:null}())&&!(c=o()))return l();var v=t||c;return{start:function(){function n(){a&&a.end()}var t,a=v.start();return a.done(function(){if(a=null,!c&&(c=o()))return(a=c.start()).done(function(){a=null,l(),t.complete()}),a;l(),t.complete()}),t=new e({end:n,cancel:n})}}}function c(n,t,a,r){var i=f(n,Q),o=f(t,Q),s=[];if(M(r,function(n){(n=l(a,n.out,n["in"]))&&s.push(n)}),i||o||0!==s.length)return{start:function(){function n(){M(t,function(n){n.end()})}var t=[];i&&t.push(i.start()),o&&t.push(o.start()),M(s,function(n){t.push(n.start())});var a=new e({end:n,cancel:n});return e.all(t,function(n){a.complete(n)}),a}}}function f(t){var e=t.element,a=t.options||{};return t.structural&&(a.event=t.event,a.structural=!0,a.applyClassesEarly=!0,"leave"===t.event&&(a.onDone=a.domOperation)),a.preparationClasses&&(a.event=A(a.event,a.preparationClasses)),(t=n(e,a)).$$willAnimate?t:null}if(!r.animations&&!r.transitions)return Q;var m=o[0].body;t=$(a);var d=J(t.parentNode&&11===t.parentNode.nodeType||m.contains(t)?t:m);return function(n){return n.from&&n.to?c(n.from,n.to,n.classes,n.anchors):f(n)}}]}]).provider("$$animateJs",["$animateProvider",function(n){this.$get=["$injector","$$AnimateRunner","$$jqLite",function(t,e,a){function r(e){e=E(e)?e:e.split(" ");for(var a=[],r={},i=0;i<e.length;i++){var o=e[i],s=n.$$registeredAnimations[o];s&&!r[o]&&(a.push(t.get(s)),r[o]=!0)}return a}var i=c(a);return function(n,t,a,o){function s(){o.domOperation(),i(n,o)}function u(n,t,a,r,i){switch(a){case"animate":t=[t,r.from,r.to,i];break;case"setClass":t=[t,C,y,i];break;case"addClass":t=[t,C,i];break;case"removeClass":t=[t,y,i];break;default:t=[t,i]}if(t.push(r),n=n.apply(n,t))if(L(n.start)&&(n=n.start()),n instanceof e)n.done(i);else if(L(n))return n;return Q}function l(n,t,a,r,i){var o=[];return M(r,function(r){var s=r[i];s&&o.push(function(){var r,i,o=!1,l=function(n){o||(o=!0,(i||Q)(n),r.complete(!n))};return r=new e({end:function(){l()},cancel:function(){l(!0)}}),i=u(s,n,t,a,function(n){l(!1===n)}),r})}),o}function c(n,t,a,r,i){var o,s,u=l(n,t,a,r,i);0===u.length&&("beforeSetClass"===i?(o=l(n,"removeClass",a,r,"beforeRemoveClass"),s=l(n,"addClass",a,r,"beforeAddClass")):"setClass"===i&&(o=l(n,"removeClass",a,r,"removeClass"),s=l(n,"addClass",a,r,"addClass")),o&&(u=u.concat(o)),s&&(u=u.concat(s)));if(0!==u.length)return function(n){var t=[];return u.length&&M(u,function(n){t.push(n())}),t.length?e.all(t,n):n(),function(n){M(t,function(t){n?t.cancel():t.end()})}}}var d=!1;3===arguments.length&&H(a)&&(o=a,a=null),o=f(o),a||(a=n.attr("class")||"",o.addClass&&(a+=" "+o.addClass),o.removeClass&&(a+=" "+o.removeClass));var p,v,h,$,g,C=o.addClass,y=o.removeClass,D=r(a);D.length&&("leave"===t?($="leave",h="afterLeave"):($="before"+t.charAt(0).toUpperCase()+t.substr(1),h=t),"enter"!==t&&"move"!==t&&(p=c(n,t,o,D,$)),v=c(n,t,o,D,h));if(p||v)return{$$willAnimate:!0,end:function(){return g?g.end():(d=!0,s(),m(n,o),(g=new e).complete(!0)),g},start:function(){function t(t){d=!0,s(),m(n,o),g.complete(t)}if(g)return g;g=new e;var a,r=[];return p&&r.push(function(n){a=p(n)}),r.length?r.push(function(n){s(),n(!0)}):s(),v&&r.push(function(n){a=v(n)}),g.setHost({end:function(){d||((a||Q)(void 0),t(void 0))},cancel:function(){d||((a||Q)(!0),t(!0))}}),e.chain(r,t),g}}}}]}]).provider("$$animateJsDriver",["$$animationProvider",function(n){n.drivers.push("$$animateJsDriver"),this.$get=["$$animateJs","$$AnimateRunner",function(n,t){function e(t){return n(t.element,t.event,t.classes,t.options)}return function(n){if(!n.from||!n.to)return e(n);var a=e(n.from),r=e(n.to);return a||r?{start:function(){function n(){return function(){M(e,function(n){n.end()})}}var e=[];a&&e.push(a.start()),r&&e.push(r.start()),t.all(e,function(n){i.complete(n)});var i=new t({end:n(),cancel:n()});return i}}:void 0}}]}])}(window,window.angular);