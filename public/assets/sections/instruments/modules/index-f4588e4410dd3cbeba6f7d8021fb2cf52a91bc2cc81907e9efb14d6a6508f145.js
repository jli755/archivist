(function(){angular.module("archivist.build",["templates","ngRoute","archivist.flash","archivist.data_manager","archivist.realtime"]).config(["$routeProvider","treeConfig",function(e,t){return e.when("/instruments/:id/build",{templateUrl:"partials/build/index.html",controller:"BuildMenuController"}).when("/instruments/:id/build/code_lists/:code_list_id?",{templateUrl:"partials/build/editor.html",controller:"BuildCodeListsController"}).when("/instruments/:id/build/response_domains/:response_domain_type?/:response_domain_id?",{templateUrl:"partials/build/editor.html",controller:"BuildResponseDomainsController"}).when("/instruments/:id/build/questions/:question_type?/:question_id?",{templateUrl:"partials/build/editor.html",controller:"BuildQuestionsController"}).when("/instruments/:id/build/constructs",{templateUrl:"partials/build/editor.html",controller:"BuildConstructsController",reloadOnSearch:!1}),t.placeholderClass="a-tree-placeholder a-construct list-group-item",t.hiddenClass="a-tree-hidden",t.dragClass="a-tree-drag"}])}).call(this),function(){angular.module("archivist.build").controller("BaseBuildController",["$scope","$routeParams","$location","$timeout","Flash","DataManager","RealTimeListener","RealTimeLocking",function(e,t,n,r,i,s,o,u){return e.page.title=e.title,e.underscored=e.title.toLowerCase().replaceAll(" ","_"),e.main_panel="partials/build/"+e.underscored+".html",e.url_path_args=n.path().split("/"),e.newMode="new"===e.url_path_args.slice(0).pop(),"function"==typeof e.before_instrument_loaded&&e.before_instrument_loaded(),e.instrument=s.getInstrument(t.id,e.instrument_options,function(){return e.page.title=e.instrument.prefix+" | "+e.title,e.reset(),e.breadcrumbs=[{label:"Instruments",link:"/instruments",active:!1},{label:e.instrument.prefix,link:"/instruments/"+e.instrument.id.toString(),active:!1},{label:"Build",link:"/instruments/"+e.instrument.id.toString()+"/build",active:!1},{label:e.title,link:!1,active:!0}],r(function(){return jQuery(".first-field").first().focus()},0),"function"==typeof e.after_instrument_loaded&&e.after_instrument_loaded(),console.log(e)}),null==e.cancel&&(e.cancel=function(){return console.log("cancel called"),e.newMode?e.editMode=e.newMode=!1:e.reset(),null}),null==e.edit_path&&(e.edit_path=function(t){var n;return n=["instruments",e.instrument.id,"build"],e.extra_url_parameters&&(n=n.concat(e.extra_url_parameters)),null!=t&&(null!=t.type&&n.push(t.type.replace(/([A-Z])/g,function(e,t){return"_"+t.toLowerCase()}).replace(/^_/,"")+"s"),n.push(t.id)),n.join("/")}),null==e.startEditMode&&(e.startEditMode=function(){return e.editMode=!0,console.log(e.current),u.lock({type:e.current.type,id:e.current.id}),null}),null==e.change_panel&&(e.change_panel=function(t){return localStorage.setItem("sidebar_scroll",jQuery(".sidebar").scrollTop()),n.url(e.edit_path(t))}),e.listener=o(function(){if(!e.editMode)return e.reset()})}])}.call(this),function(){var e=[].slice;angular.module("archivist.build").controller("BuildCodeListsController",["$controller","$scope","$routeParams","$location","$filter","$timeout","Flash","DataManager","RealTimeListener","RealTimeLocking",function(t,n,r,i,s,o,u,l,a,c){return console.log("called code_list controller"),n.load_sidebar=function(){var e,t;return e=function(e){return e.count=e.used_by.length,e},n.sidebar_objs=function(){var r,i,s,o;for(o=[],r=0,i=(s=n.instrument.CodeLists).length;r<i;r++)t=s[r],o.push(e(t));return o}().sort_by_property(),o(function(){var e;if(null!==(e=localStorage.getItem("sidebar_scroll")))return console.log(e),jQuery(".sidebar").scrollTop(e),localStorage.removeItem("sidebar_scroll")},0)},n["delete"]=function(){var e;if(null!=(e=n.instrument.CodeLists.get_index_by_id(parseInt(r.code_list_id))))return n.instrument.CodeLists[e].$delete({},function(){return n.instrument.CodeLists.splice(e,1),n.load_sidebar(),o(function(){return n.instrument.CodeLists.length>0?n.change_panel(n.instrument.CodeLists[0]):n.change_panel({type:"CodeList",id:"new"})},0)})},n.save=function(){var e;return console.log(n.current),"new"===r.code_list_id?(n.instrument.CodeLists.push(n.current),e=n.instrument.CodeLists.length-1,n.instrument.CodeLists[e].instrument_id=r.id):(angular.copy(n.current,n.instrument.CodeLists.select_resource_by_id(parseInt(r.code_list_id))),e=n.instrument.CodeLists.get_index_by_id(parseInt(r.code_list_id))),n.instrument.CodeLists[e].save({},function(e){return e.instrument_id=n.instrument.id,u.add("success","Code list updated successfully!"),n.reset(),n.load_sidebar(),l.Data.Codes.Categories=l.Codes.Categories.requery({instrument_id:n.instrument.id}),l.Data.ResponseDomains.Codes=l.ResponseDomains.Codes.requery({instrument_id:n.instrument.id}),l.Data.Codes.Categories.$promise.then(function(){return n.categories=l.Data.Codes.Categories}),l.Data.ResponseDomains.Codes.$promise.then(function(){return l.groupResponseDomains()})},function(){return console.log("error")}),l.Data.ResponseDomains[r.id]=null},n.title="Code Lists",n.instrument_options={codes:!0},n.reset=function(){if(console.log("reset called"),null==l.CodeResolver&&l.resolveCodes(),isNaN(r.code_list_id)||(n.current=angular.copy(n.instrument.CodeLists.select_resource_by_id(parseInt(r.code_list_id))),n.editMode=!1,null!=n.current&&c.unlock({type:n.current.type,id:n.current.id})),"new"===r.code_list_id)return n.editMode=!0,n.current=new l.Codes.CodeLists.resource({codes:[]})},n["new"]=function(){return n.change_panel({type:"CodeList",id:"new"})},n.removeCode=function(e){var t,r,i;for(r in n.current.codes=function(){var r,i,s,o;for(o=[],r=0,i=(s=n.current.codes).length;r<i;r++)(t=s[r]).$$hashKey!==e.$$hashKey&&o.push(t);return o}(),n.current.codes.sort(function(e,t){return e.order-t.order}),i=[],n.current.codes)i.push(n.current.codes[r].order=r);return i},n.moveUp=function(e){return n.moveCode(e,-1)},n.moveDown=function(e){return n.moveCode(e,1)},n.moveCode=function(t,r){var i,s,o,u,l;if((o=n.current.codes.findIndex(function(e){return e.$$hashKey===t.$$hashKey}))+r<0||o+r>=n.current.codes.length)return!1;for(s in i=n.current.codes.splice(o,1),(u=n.current.codes).splice.apply(u,[o+r,0].concat(e.call(i))),l=[],n.current.codes)l.push(n.current.codes[s].order=s);return l},n.after_instrument_loaded=function(){return n.categories=l.Data.Codes.Categories,console.log(n.sidebar_objs),n.load_sidebar(),n.$watch("current.newValue",function(e,t,r){if(console.log(e,t,r),e!==t&&null!=e)return r.current.codes.push({id:null,value:e,category:null,order:n.current.codes.length}),n.current.newValue=null,o(function(){var e;return jQuery(".code-value").last().focus(),e=2*jQuery(".code-value").last().val().length,jQuery(".code-value").last()[0].setSelectionRange(e,e)},0)})},t("BaseBuildController",{$scope:n,$routeParams:r,$location:i,Flash:u,DataManager:l,RealTimeListener:a,RealTimeLocking:c})}])}.call(this),function(){angular.module("archivist.build").controller("BuildConstructsController",["$controller","$scope","$routeParams","$location","$filter","$http","$timeout","bsLoadingOverlayService","Flash","DataManager","RealTimeListener","RealTimeLocking",function(e,t,n,r,i,s,o,u,l,a,c,d){return console.time("end to end"),t.title="Constructs",t.details_bar=!0,t.hide_edit_buttons=!0,t.extra_url_parameters=["constructs"],t.instrument_options={constructs:!0,questions:!0,rus:!0},t.index={},t.details_path=function(){return"partials/build/details/"+n.construct_type+".html"},t.setIndex=function(e,n,r){return null==r&&(r=null),null!=e?(t.index.parent_id=e,t.index.parent_type=n):(t.index.parent_id=t.instrument.topsequence.id,t.index.parent_type="sequence"),t.index.branch=r},t.$on("$routeUpdate",function(){return t.reset()}),t.change_panel=function(e){return r.search({construct_type:e.type,construct_id:e.id}),t.editMode=null!=e.type&&null!=e.id},t.treeOptions={dropped:function(){var e;return u.start(),t.updates=[],(e=function(n){var r,i,s,o,u,l,a;for(a=[],u=o=0,l=(r=["children","fchildren"]).length;o<l;u=++o)s=r[u],null!=n[s]?a.push(function(){var r;for(i in r=[],n[s])n[s].hasOwnProperty(i)?((n[s][i].position!==parseInt(i)+1||n[s][i].parent!==n.id||n[s][i].branch!==u&&Number.isInteger(n[s][i].branch))&&(t.updates.push({id:n[s][i].id,type:n[s][i].type,position:parseInt(i)+1,parent:{id:n.id,type:n.type},branch:u}),n[s][i].position=t.updates[t.updates.length-1].position,n[s][i].parent=t.updates[t.updates.length-1].parent),r.push(e(n[s][i]))):r.push(void 0);return r}()):a.push(void 0);return a})(t.instrument.topsequence),s.post("/instruments/"+t.instrument.id.toString()+"/reorder_ccs.json",{updates:t.updates})["finally"](function(){return u.stop()})}},t.toggle=function(e){return e.toggle()},t["delete"]=function(){var e,r;if(e=t.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"],null!=(r=e.get_index_by_id(parseInt(n.construct_id))))return e[r].$delete({},function(){var n,i;return n=e[r].$$hashKey,e.splice(r,1),(i=function(e,t){var n,s,o,u,l,a,c;if(void 0!==e.children){for(a=e.children,r=s=0,u=a.length;s<u;r=++s){if((n=a[r]).$$hashKey===t)return e.children.splice(r,1),!0;if(i(n,t))return!0}if(void 0!==e.fchildren)for(c=e.fchildren,r=o=0,l=c.length;o<l;r=++o){if((n=c[r]).$$hashKey===t)return e.fchildren.splice(r,1),!0;if(i(n,t))return!0}}return!1})(t.instrument.topsequence,n),o(function(){return t.change_panel({type:null,id:null})},0)})},t.save=function(){var e,r;return e=t.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"],"new"===n.construct_id?(e.push(t.current),r=e.length-1,e[r].instrument_id=n.id):(angular.copy(t.current,e.select_resource_by_id(parseInt(n.construct_id))),r=e.get_index_by_id(parseInt(n.construct_id))),e[r].save({},function(i){var s;return i.instrument_id=t.instrument.id,i.type=n.construct_type,l.add("success","Construct updated successfully!"),"new"===n.construct_id&&(s=a.Data.Instrument.Constructs[t.index.parent_type.capitalizeFirstLetter()+"s"].select_resource_by_id(t.index.parent_id),0===t.index.branch||null===t.index.branch?s.children.push(e[r]):s.fchildren.push(e[r]),t.change_panel(e[r])),t.change_panel({type:null,id:null}),t.reset()},function(){return l.add("danger","Construct failed to update"),console.error("Construct failed to update")})},t.reset=function(){var e,r,i,s;if(null!=n.construct_type&&!isNaN(parseInt(n.construct_id)))for(r=0,i=(s=t.instrument.Constructs[n.construct_type.capitalizeFirstLetter()+"s"]).length;r<i;r++)if((e=s[r]).type.pascal_case_to_underscore()===n.construct_type&&e.id.toString()===n.construct_id.toString()){t.current=angular.copy(e);break}return null},t.build_ru_options=function(){var e,n,r,i,s;for(t.details.ru_options=[],i=[],e=0,n=(r=t.instrument.ResponseUnits).length;e<n;e++)s=r[e],i.push(t.details.ru_options.push({value:s.id,label:s.label}));return i},t.after_instrument_loaded=function(){var e,n;return console.time("after instrument"),e=function(e,t){return e.position>t.position},t.instrument.topsequence.resolved||(a.resolveConstructs(),a.resolveQuestions(),(n=function(t){var r,i,s,o,u,l,a,c;if(null!=t.children){for(t.children.sort(e),i=0,o=(l=t.children).length;i<o;i++)r=l[i],n(r);if(null!=t.fchildren){for(t.fchildren.sort(e),c=[],s=0,u=(a=t.fchildren).length;s<u;s++)r=a[s],c.push(n(r));return c}}})(t.instrument.topsequence)),t.details={},t.details.options=a.getQuestionIDs(),t.build_ru_options(),console.timeEnd("after instrument"),console.timeEnd("end to end")},t.save_ru=function(e){return a.Data.ResponseUnits.push(new a.ResponseUnits.resource({label:e.label,instrument_id:n.id})),a.Data.ResponseUnits[a.Data.ResponseUnits.length-1].save({},function(e){return e.instrument_id=t.instrument.id,t.build_ru_options()})},t["new"]=function(e){var n;return n="question"===e?a.Constructs.Questions.cc.resource:a.Constructs[e.capitalizeFirstLetter()+"s"].resource,t.current=new n({type:e,parent:{id:t.index.parent_id,type:t.index.parent_type},branch:t.index.branch}),r.search({construct_type:e,construct_id:"new"}),t.reset(),t.editMode=!0},console.time("load base"),e("BaseBuildController",{$scope:t,$routeParams:n,$location:r,Flash:l,DataManager:a,RealTimeListener:c,RealTimeLocking:d}),console.timeEnd("load base")}]),angular.module("archivist.build").controller("BuildConstructsFirstBranchController",["$scope",function(e){return e.branch="condition"===e.obj.type?0:null}]),angular.module("archivist.build").controller("BuildConstructsSecondBranchController",["$scope",function(e){return e.branch=1}])}.call(this),function(){angular.module("archivist.build").controller("BuildMenuController",["$scope","$routeParams","DataManager",function(e,t,n){return e.code_lists_url="/instruments/"+t.id+"/build/code_lists",e.response_domains_url="/instruments/"+t.id+"/build/response_domains",e.questions_url="/instruments/"+t.id+"/build/questions",e.constructs_url="/instruments/"+t.id+"/build/constructs",e.summary_url=function(e){return"/instruments/"+t.id+"/summary/"+e},e.instrument=n.getInstrumentStats(t.id,function(){return e.stats=e.instrument.stats,e.breadcrumbs=[{label:"Instruments",link:"/instruments",active:!1},{label:e.instrument.prefix,link:"/instruments/"+t.id,active:!1},{label:"Build",link:!1,active:!0}]})}])}.call(this),function(){angular.module("archivist.build").controller("BuildQuestionsController",["$controller","$scope","$routeParams","$location","$timeout","Flash","DataManager","RealTimeListener","RealTimeLocking",function(e,t,n,r,i,s,o,u,l){return t.load_sidebar=function(){return t.sidebar_objs=t.instrument.Questions.Items.concat(t.instrument.Questions.Grids).sort_by_property()},t.add_rd=function(e){return"question_items"===n.question_type?(null==t.current.rds&&(t.current.rds=[]),t.current.rds.push(e)):(t.current_grid_column.rd=e,jQuery("#add-rd").modal("hide"),!0)},t.remove_rd=function(e){var r;return"question_items"===n.question_type?(r=t.current.rds.indexOf(e),t.current.rds.splice(r,1)):e.rd=null},t["delete"]=function(){var e,r;if(null!=(r="question_items"===n.question_type?"Items":"Grids")&&null!=(e=t.instrument.Questions[r].get_index_by_id(parseInt(n.question_id))))return t.instrument.Questions[r][e].$delete({},function(){return t.instrument.Questions[r].splice(e,1),t.load_sidebar(),i(function(){return t.instrument.Questions[r].length>0?t.change_panel(t.instrument.Questions[r][0]):t.change_panel({type:n.question_type,id:"new"})},0)})},t.select_x_axis=function(){return t.current.cols=angular.copy(t.instrument.CodeLists.select_resource_by_id(t.current.horizontal_code_list_id).codes)},t.set_grid_column=function(e){return t.current_grid_column=e},t.save=function(){var e,r;if(null!=(r="question_items"===n.question_type?"Items":"Grids"))return"new"===n.question_id?(t.instrument.Questions[r].push(t.current),e=t.instrument.Questions[r].length-1,t.instrument.Questions[r][e].instrument_id=n.id):(angular.copy(t.current,t.instrument.Questions[r].select_resource_by_id(parseInt(n.question_id))),e=t.instrument.Questions[r].get_index_by_id(parseInt(n.question_id))),t.instrument.Questions[r][e].save({},function(e){return e.instrument_id=t.instrument.id,s.add("success","Question updated successfully!"),t.reset(),t.load_sidebar()},function(){return console.log("error")})},t.title="Questions",t.extra_url_parameters=["questions"],t.instrument_options={questions:!0,rds:!0,codes:!0},t.reset=function(){return console.log("reset called"),null!=n.question_type&&("question_items"===n.question_type?(t.current=angular.copy(t.instrument.Questions.Items.select_resource_by_id(parseInt(n.question_id))),t.title="Question Item"):(t.current=angular.copy(t.instrument.Questions.Grids.select_resource_by_id(parseInt(n.question_id))),t.title="Question Grid"),t.editMode=!1,null!=t.current&&l.unlock({type:t.current.type,id:t.current.id}),"new"===n.question_id&&(t.editMode=!0,"question_items"===n.question_type?(t.current=new o.Constructs.Questions.item.resource({}),t.current.type="QuestionItem"):"question_grids"===n.question_type&&(t.current=new o.Constructs.Questions.grid.resource({}),t.current.type="QuestionGrid"))),null},t["new"]=function(e){return null==e&&(e=!1),!1===e?jQuery("#new-question").modal("show"):i(function(){return t.change_panel({type:e,id:"new"})},0),null},t.after_instrument_loaded=function(){return t.load_sidebar(),o.resolveCodes(),console.log(t.sidebar_objs)},e("BaseBuildController",{$scope:t,$routeParams:n,$location:r,$timeout:i,Flash:s,DataManager:o,RealTimeListener:u,RealTimeLocking:l})}])}.call(this),function(){angular.module("archivist.build").controller("BuildResponseDomainsController",["$controller","$scope","$routeParams","$location","$filter","$timeout","Flash","DataManager","Map","RealTimeListener","RealTimeLocking",function(e,t,n,r,i,s,o,u,l,a,c){return t.load_sidebar=function(){return t.sidebar_objs=i("excludeRDC")(t.instrument.ResponseDomains).sort_by_property()},t.title="Response Domains",t.extra_url_parameters=["response_domains"],t.instrument_options={rds:!0},t["delete"]=function(){var e,r;switch(n.response_domain_type){case"response_domain_texts":r="ResponseDomainText";break;case"response_domain_datetimes":r="ResponseDomainDatetime";break;case"response_domain_numerics":r="ResponseDomainNumeric";break;default:r=!1}if(null!=r&&null!=(e=t.instrument.ResponseDomains.get_index_by_id_and_type(parseInt(n.response_domain_id),r)))return t.instrument.ResponseDomains[e].$delete({},function(){return t.instrument.ResponseDomains.splice(e,1),t.load_sidebar(),s(function(){return t.instrument.ResponseDomains.length>0?t.change_panel(t.instrument.ResponseDomains[0]):t.change_panel({type:r,id:"new"})},0)})},t.save=function(){var e,r,i,s,a;switch(n.response_domain_type){case"response_domain_texts":s="ResponseDomainText";break;case"response_domain_datetimes":s="ResponseDomainDatetime";break;case"response_domain_numerics":s="ResponseDomainNumeric";break;case"new":s="new";break;default:s=!1}if(s){if("new"===s){for(i in a=l.find(u,t.current.type),e=l.find(u.Data,t.current.type),console.log(e),e.push(new a.resource),r=e.length-1,t.current)e[r][i]=t.current[i];e[r].instrument_id=n.id}else r=(e=t.instrument.ResponseDomains).get_index_by_id_and_type(parseInt(n.response_domain_id),s),angular.copy(t.current,e[r]);return e[r].save({},function(e){return e.instrument_id=t.instrument.id,o.add("success","Response Domain updated successfully!"),u.groupResponseDomains(),t.reset(),t.load_sidebar()},function(){return console.log("error")})}},t.reset=function(){var e,r,i,s;if(null!=n.response_domain_type&&null!=n.response_domain_id)for(e=0,r=(s=t.instrument.ResponseDomains).length;e<r;e++)if((i=s[e]).type.pascal_case_to_underscore()+"s"===n.response_domain_type&&i.id.toString()===n.response_domain_id){t.current=angular.copy(i),t.editMode=!1,null!=t.current&&c.unlock({type:t.current.type,id:t.current.id});break}return"new"===n.response_domain_type&&(t.editMode=!0,t.current={}),null},t["new"]=function(){return s(function(){return t.change_panel({type:null,id:"new"})},0),null},t.after_instrument_loaded=function(){return t.load_sidebar()},e("BaseBuildController",{$scope:t,$routeParams:n,$location:r,$timeout:s,Flash:o,DataManager:u,RealTimeListener:a,RealTimeLocking:c})}])}.call(this),function(){angular.module("archivist.build").directive("resumeScroll",["$timeout",function(e){return{scope:{key:"@"},link:{postLink:function(t,n){return e(function(){return console.log(t),n.scrollTop=localStorage.getItem("sidebar-scroll-top"),localStorage.removeItem("sidebar-scroll-top")}),t.$on("$destroy",function(){return localStorage.setItem("sidebar-scroll-top",n.scrollTop)})}}}}])}.call(this),function(){angular.module("archivist.build").directive("strip",[function(){return{scope:{key:"@"},link:{postLink:function(e,t){return t.text=t.text.replaceAll("ResponseDomain","")}}}}])}.call(this),function(){angular.module("archivist.build").filter("excludeRDC",function(){return function(e){var t;return t=[],angular.forEach(e,function(e){if("ResponseDomainCode"!==e.type)return t.push(e)}),t}})}.call(this),function(){angular.module("archivist.build").filter("stripRD",function(){return function(e){return e.replace("ResponseDomain","")}})}.call(this),function(){angular.module("archivist.summary",["templates","ngRoute"]).config(["$routeProvider",function(e){return e.when("/instruments/:id/summary",{templateUrl:"partials/summary/index.html",controller:"SummaryIndexController"}).when("/instruments/:id/summary/:object_type",{templateUrl:"partials/summary/show.html",controller:"SummaryShowController"})}])}.call(this),function(){angular.module("archivist.summary").controller("SummaryShowController",["$scope","$routeParams","$filter","DataManager","Map","RealTimeListener",function(e,t,n,r,i){var s,o,u;for(s in e.object_type=t.object_type.underscore_to_pascal_case(),o=Object.lower_everything(i.map[e.object_type]))u=o[s],o[s]={},o[s][u]=!0;return o.topsequence=!1,e.instrument=r.getInstrument(t.id,o,function(){var t,n,s,o,u,l,a,c,d;for(t=["id","label","literal","base_label","response_unit_label","logic"],n=i.find(r.Data,e.object_type),e.data=[],o=u=0,a=n.length;u<a;o=++u){for(s in c={},d=n[o])-1!==t.indexOf(s)&&(c[s]=d[s]);e.data.push(c)}return e.cols=function(){var t;for(l in t=[],e.data[0])t.push(l);return t}(),e.breadcrumbs=[{label:"Instruments",link:"/instruments",active:!1},{label:e.instrument.prefix,link:"/instruments/"+e.instrument.prefix,active:!1},{label:"Summary",link:!1,active:!1},{label:e.object_type,link:!1,active:!0}],console.log(e)})}])}.call(this),function(){}.call(this);