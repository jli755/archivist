(function(){angular.module("archivist.flash",["ngMessages"]).factory("Flash",["$interval",function(){var t,e,n,s,r;return t="notices",n=JSON.parse(localStorage.getItem(t))||[],s=null,r=function(){return localStorage.setItem(t,JSON.stringify(n))},e=function(){return n=[],r()},{add:function(e,i){if(n.push({type:e,message:i}),r(),document.getElementsByTagName(t))return this.publish(s)},publish:function(t){return t.notices=n,e()},set_scope:function(t){return s=t},listen:function(){},clear:this.clear,store:this.store}}])}).call(this);