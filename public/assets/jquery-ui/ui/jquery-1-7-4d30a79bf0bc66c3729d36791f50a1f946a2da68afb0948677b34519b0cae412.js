/*!
 * jQuery UI Support for jQuery core 1.7.x 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery","./version"],t):t(jQuery)}(function(t){"1.7"===t.fn.jquery.substring(0,3)&&(t.each(["Width","Height"],function(n,i){function e(n,i,e,h){return t.each(r,function(){i-=parseFloat(t.css(n,"padding"+this))||0,e&&(i-=parseFloat(t.css(n,"border"+this+"Width"))||0),h&&(i-=parseFloat(t.css(n,"margin"+this))||0)}),i}var r="Width"===i?["Left","Right"]:["Top","Bottom"],h=i.toLowerCase(),s={innerWidth:t.fn.innerWidth,innerHeight:t.fn.innerHeight,outerWidth:t.fn.outerWidth,outerHeight:t.fn.outerHeight};t.fn["inner"+i]=function(n){return n===undefined?s["inner"+i].call(this):this.each(function(){t(this).css(h,e(this,n)+"px")})},t.fn["outer"+i]=function(n,r){return"number"!=typeof n?s["outer"+i].call(this,n):this.each(function(){t(this).css(h,e(this,n,!0,r)+"px")})}}),t.fn.addBack=function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))})});