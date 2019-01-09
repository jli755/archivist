/*!
 * jQuery UI Slider 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
!function(e){"function"==typeof define&&define.amd?define(["jquery","./mouse","../keycode","../version","../widget"],e):e(jQuery)}(function(e){return e.widget("ui.slider",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all","ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,change:null,slide:null,start:null,stop:null},numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,a=this.element.find(".ui-slider-handle"),n="<span tabindex='0'></span>",h=[];for(i=s.values&&s.values.length||1,a.length>i&&(a.slice(i).remove(),a=a.slice(0,i)),t=a.length;t<i;t++)h.push(n);this.handles=a.add(e(h.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t).attr("tabIndex",0)})},_createRange:function(){var t=this.options;t.range?(!0===t.range&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),this.range.css({left:"",bottom:""})):(this.range=e("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),"min"!==t.range&&"max"!==t.range||this._addClass(this.range,"ui-slider-range-"+t.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(t){var i,s,a,n,h,l,u,r=this,o=this.options;return!o.disabled&&(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),a=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-r.values(t));(a>i||a===i&&(t===r._lastChangedValue||r.values(t)===o.min))&&(a=i,n=e(this),h=t)}),!1!==this._start(t,h)&&(this._mouseSliding=!0,this._handleIndex=h,this._addClass(n,null,"ui-state-active"),n.trigger("focus"),l=n.offset(),u=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=u?{left:0,top:0}:{left:t.pageX-l.left-n.width()/2,top:t.pageY-l.top-n.height()/2-(parseInt(n.css("borderTopWidth"),10)||0)-(parseInt(n.css("borderBottomWidth"),10)||0)+(parseInt(n.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,h,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,a,n;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),(s=i/t)>1&&(s=1),s<0&&(s=0),"vertical"===this.orientation&&(s=1-s),a=this._valueMax()-this._valueMin(),n=this._valueMin()+s*a,this._trimAlignValue(n)},_uiHash:function(e,t,i){var s={handle:this.handles[e],handleIndex:e,value:t!==undefined?t:this.value()};return this._hasMultipleValues()&&(s.value=t!==undefined?t:this.values(e),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(e,t){return this._trigger("start",e,this._uiHash(t))},_slide:function(e,t,i){var s,a=this.value(),n=this.values();this._hasMultipleValues()&&(s=this.values(t?0:1),a=this.values(t),2===this.options.values.length&&!0===this.options.range&&(i=0===t?Math.min(s,i):Math.max(s,i)),n[t]=i),i!==a&&!1!==this._trigger("slide",e,this._uiHash(t,i,n))&&(this._hasMultipleValues()?this.values(t,i):this.value(i))},_stop:function(e,t){this._trigger("stop",e,this._uiHash(t))},_change:function(e,t){this._keySliding||this._mouseSliding||(this._lastChangedValue=t,this._trigger("change",e,this._uiHash(t)))},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),void this._change(null,0)):this._value()},values:function(t,i){var s,a,n;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),void this._change(null,t);if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this._hasMultipleValues()?this._values(t):this.value();for(s=this.options.values,a=arguments[0],n=0;n<s.length;n+=1)s[n]=this._trimAlignValue(a[n]),this._change(null,n);this._refreshValue()},_setOption:function(t,i){var s,a=0;switch("range"===t&&!0===this.options.range&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(a=this.options.values.length),this._super(t,i),t){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":for(this._animateOff=!0,this._refreshValue(),s=a-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(e){this._super(e),this._toggleClass(null,"ui-state-disabled",!!e)},_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this._hasMultipleValues()){for(i=this.options.values.slice(),s=0;s<i.length;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step;(e=Math.round((e-t)/i)*i+t)>this.options.max&&(e-=i),this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(e){"vertical"===e&&this.range.css({width:"",left:""}),"horizontal"===e&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var t,i,s,a,n,h=this.options.range,l=this.options,u=this,r=!this._animateOff&&l.animate,o={};this._hasMultipleValues()?this.handles.each(function(s){i=(u.values(s)-u._valueMin())/(u._valueMax()-u._valueMin())*100,o["horizontal"===u.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[r?"animate":"css"](o,l.animate),!0===u.options.range&&("horizontal"===u.orientation?(0===s&&u.range.stop(1,1)[r?"animate":"css"]({left:i+"%"},l.animate),1===s&&u.range[r?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:l.animate})):(0===s&&u.range.stop(1,1)[r?"animate":"css"]({bottom:i+"%"},l.animate),1===s&&u.range[r?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:l.animate}))),t=i}):(s=this.value(),a=this._valueMin(),n=this._valueMax(),i=n!==a?(s-a)/(n-a)*100:0,o["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[r?"animate":"css"](o,l.animate),"min"===h&&"horizontal"===this.orientation&&this.range.stop(1,1)[r?"animate":"css"]({width:i+"%"},l.animate),"max"===h&&"horizontal"===this.orientation&&this.range.stop(1,1)[r?"animate":"css"]({width:100-i+"%"},l.animate),"min"===h&&"vertical"===this.orientation&&this.range.stop(1,1)[r?"animate":"css"]({height:i+"%"},l.animate),"max"===h&&"vertical"===this.orientation&&this.range.stop(1,1)[r?"animate":"css"]({height:100-i+"%"},l.animate))},_handleEvents:{keydown:function(t){var i,s,a,n=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(e(t.target),null,"ui-state-active"),!1===this._start(t,n)))return}switch(a=this.options.step,i=s=this._hasMultipleValues()?this.values(n):this.value(),t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+a);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-a)}this._slide(t,n,s)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),this._removeClass(e(t.target),null,"ui-state-active"))}}})});