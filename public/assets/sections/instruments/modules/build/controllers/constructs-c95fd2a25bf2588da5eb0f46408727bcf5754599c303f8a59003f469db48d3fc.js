(function(){angular.module("archivist.build").controller("BuildConstructsController",["$controller","$scope","$routeParams","$location","$filter","$http","$timeout","bsLoadingOverlayService","Flash","DataManager","RealTimeListener","RealTimeLocking",function(t,e,n,r,i,s,u,o,c,a,l,d){return console.time("end to end"),e.title="Constructs",e.details_bar=!0,e.hide_edit_buttons=!0,e.extra_url_parameters=["constructs"],e.instrument_options={constructs:!0,questions:!0,rus:!0},e.index={},e.details_path=function(){return"partials/build/details/"+n.construct_type+".html"},e.setIndex=function(t,n,r){return null==r&&(r=null),null!=t?(e.index.parent_id=t,e.index.parent_type=n):(e.index.parent_id=e.instrument.topsequence.id,e.index.parent_type="sequence"),e.index.branch=r},e.$on("$routeUpdate",function(){return e.reset()}),e.change_panel=function(t){return r.search({construct_type:t.type,construct_id:t.id}),e.editMode=null!=t.type&&null!=t.id},e.treeOptions={dropped:function(){var t;return o.start(),e.updates=[],(t=function(n){var r,i,s,u,o,c,a;for(a=[],o=u=0,c=(r=["children","fchildren"]).length;u<c;o=++u)s=r[o],null!=n[s]?a.push(function(){var r;for(i in r=[],n[s])n[s].hasOwnProperty(i)?((n[s][i].position!==parseInt(i)+1||n[s][i].parent!==n.id||n[s][i].branch!==o&&Number.isInteger(n[s][i].branch))&&(e.updates.push({id:n[s][i].id,type:n[s][i].type,position:parseInt(i)+1,parent:{id:n.id,type:n.type},branch:o}),n[s][i].position=e.updates[e.updates.length-1].position,n[s][i].parent=e.updates[e.updates.length-1].parent),r.push(t(n[s][i]))):r.push(void 0);return r}()):a.push(void 0);return a})(e.instrument.topsequence),s.post("/instruments/"+e.instrument.id.toString()+"/reorder_ccs.json",{updates:e.updates})["finally"](function(){return o.stop()})}},e.toggle=function(t){return t.toggle()},e["delete"]=function(){var t,r;if(t=e.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"],null!=(r=t.get_index_by_id(parseInt(n.construct_id))))return t[r].$delete({},function(){var n,i;return n=t[r].$$hashKey,t.splice(r,1),(i=function(t,e){var n,s,u,o,c,a,l;if(void 0!==t.children){for(a=t.children,r=s=0,o=a.length;s<o;r=++s){if((n=a[r]).$$hashKey===e)return t.children.splice(r,1),!0;if(i(n,e))return!0}if(void 0!==t.fchildren)for(l=t.fchildren,r=u=0,c=l.length;u<c;r=++u){if((n=l[r]).$$hashKey===e)return t.fchildren.splice(r,1),!0;if(i(n,e))return!0}}return!1})(e.instrument.topsequence,n),u(function(){return e.change_panel({type:null,id:null})},0)})},e.save=function(){var t,r;return t=e.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"],"new"===n.construct_id?(t.push(e.current),r=t.length-1,t[r].instrument_id=n.id):(angular.copy(e.current,t.select_resource_by_id(parseInt(n.construct_id))),r=t.get_index_by_id(parseInt(n.construct_id))),t[r].save({},function(i){var s;return i.instrument_id=e.instrument.id,i.type=n.construct_type,c.add("success","Construct updated successfully!"),"new"===n.construct_id&&(s=a.Data.Instrument.Constructs[e.index.parent_type.capitalizeFirstLetter()+"s"].select_resource_by_id(e.index.parent_id),0===e.index.branch||null===e.index.branch?s.children.push(t[r]):s.fchildren.push(t[r]),e.change_panel(t[r])),e.change_panel({type:null,id:null}),e.reset()},function(){return c.add("danger","Construct failed to update"),console.error("Construct failed to update")})},e.reset=function(){var t,r,i,s;if(null!=n.construct_type&&!isNaN(parseInt(n.construct_id)))for(r=0,i=(s=e.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"]).length;r<i;r++)if((t=s[r]).type.pascal_case_to_underscore()===n.construct_type&&t.id.toString()===n.construct_id.toString()){e.current=angular.copy(t);break}return null},e.build_ru_options=function(){var t,n,r,i,s;for(e.details.ru_options=[],i=[],t=0,n=(r=e.instrument.ResponseUnits).length;t<n;t++)s=r[t],i.push(e.details.ru_options.push({value:s.id,label:s.label}));return i},e.after_instrument_loaded=function(){var t,n;return console.time("after instrument"),t=function(t,e){return t.position>e.position},e.instrument.topsequence.resolved||(a.resolveConstructs(),a.resolveQuestions(),(n=function(e){var r,i,s,u,o,c,a,l;if(null!=e.children){for(e.children.sort(t),i=0,u=(c=e.children).length;i<u;i++)r=c[i],n(r);if(null!=e.fchildren){for(e.fchildren.sort(t),l=[],s=0,o=(a=e.fchildren).length;s<o;s++)r=a[s],l.push(n(r));return l}}})(e.instrument.topsequence)),e.details={},e.details.options=a.getQuestionIDs(),e.build_ru_options(),console.timeEnd("after instrument"),console.timeEnd("end to end")},e.save_ru=function(t){return a.Data.ResponseUnits.push(new a.ResponseUnits.resource({label:t.label,instrument_id:n.id})),a.Data.ResponseUnits[a.Data.ResponseUnits.length-1].save({},function(t){return t.instrument_id=e.instrument.id,e.build_ru_options()})},e["new"]=function(t){var n;return n="question"===t?a.Constructs.Questions.cc.resource:a.Constructs[t.capitalizeFirstLetter()+"s"].resource,e.current=new n({type:t,parent:{id:e.index.parent_id,type:e.index.parent_type},branch:e.index.branch}),r.search({construct_type:t,construct_id:"new"}),e.reset(),e.editMode=!0},console.time("load base"),t("BaseBuildController",{$scope:e,$routeParams:n,$location:r,Flash:c,DataManager:a,RealTimeListener:l,RealTimeLocking:d}),console.timeEnd("load base")}]),angular.module("archivist.build").controller("BuildConstructsFirstBranchController",["$scope",function(t){return t.branch="condition"===t.obj.type?0:null}]),angular.module("archivist.build").controller("BuildConstructsSecondBranchController",["$scope",function(t){return t.branch=1}])}).call(this);