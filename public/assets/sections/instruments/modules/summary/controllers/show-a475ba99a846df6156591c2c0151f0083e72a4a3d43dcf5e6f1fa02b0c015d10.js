(function(){angular.module("archivist.summary").controller("SummaryShowController",["$scope","$routeParams","$filter","DataManager","Map","RealTimeListener",function(e,t,n,a,r){var l,i,o;for(l in e.object_type=t.object_type.underscore_to_pascal_case(),i=Object.lower_everything(r.map[e.object_type]))o=i[l],i[l]={},i[l][o]=!0;return i.topsequence=!1,e.instrument=a.getInstrument(t.id,i,function(){var t,n,l,i,o,s,c,u,m;for(t=["id","label","literal","base_label","response_unit_label","logic"],n=r.find(a.Data,e.object_type),e.data=[],i=o=0,c=n.length;o<c;i=++o){for(l in u={},m=n[i])-1!==t.indexOf(l)&&(u[l]=m[l]);e.data.push(u)}return e.cols=function(){var t;for(s in t=[],e.data[0])t.push(s);return t}(),e.breadcrumbs=[{label:"Instruments",link:"/instruments",active:!1},{label:e.instrument.prefix,link:"/instruments/"+e.instrument.prefix,active:!1},{label:"Summary",link:!1,active:!1},{label:e.object_type,link:!1,active:!0}],console.log(e)})}])}).call(this);