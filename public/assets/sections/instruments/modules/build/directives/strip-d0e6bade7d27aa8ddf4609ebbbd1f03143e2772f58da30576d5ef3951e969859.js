(function(){angular.module("archivist.build").directive("strip",[function(){return{scope:{key:"@"},link:{postLink:function(t,e){return e.text=e.text.replaceAll("ResponseDomain","")}}}}])}).call(this);