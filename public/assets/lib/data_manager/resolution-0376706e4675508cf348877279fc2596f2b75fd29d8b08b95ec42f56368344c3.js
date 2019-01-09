(function(){var e=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};angular.module("archivist.data_manager.resolution",[]).factory("ResolutionService",["$timeout","$rootScope",function(t,n){var s;return(s={}).ConstructResolver=function(){function s(e){this.constructs=e}return s.prototype.map={CcCondition:"Conditions",CcLoop:"Loops",CcQuestion:"Questions",CcSequence:"Sequences",CcStatement:"Statements"},s.prototype.queue=[],s.prototype.added_to_queue=0,s.prototype.resolve_children=function(e){var s,r,i,o,u,l,c,h,d;for(console.log(e.children),c=e.children.slice().reverse(),i=r=0,u=c.length;r<u;i=++r)null!=(s=c[i]).type&&s.type in this.map&&(e.children[e.children.length-1-i]=this.constructs[this.map[s.type]].select_resource_by_id(s.id)),null!=e.children[e.children.length-1-i].children&&(this.queue.unshift(e.children[e.children.length-1-i]),this.added_to_queue=this.added_to_queue+1);if(null!=e.fchildren)for(h=e.fchildren.slice().reverse(),i=o=0,l=h.length;o<l;i=++o)null!=(s=h[i]).type&&s.type in this.map&&(e.fchildren[e.fchildren.length-1-i]=this.constructs[this.map[s.type]].select_resource_by_id(s.id)),null!=e.fchildren[e.fchildren.length-1-i].children&&(this.queue.unshift(e.fchildren[e.fchildren.length-1-i]),this.added_to_queue=this.added_to_queue+1);return e.resolved=!0,d=this,this.queue.length>0?(console.log("Scheduled resolution"),t(function(e){return i="resolving:"+e.label,console.time(i),d.resolve_children(e),console.timeEnd(i)},0,!1,d.queue.shift())):(console.log("call digest"),n.$digest())},s.prototype.broken_resolve=function(){var e,n;return e=this,this.queue.unshift(function(){var e,t,s,r;for(r=[],e=0,t=(s=this.constructs.Sequences).length;e<t;e++)(n=s[e]).top&&r.push(n);return r}.call(this)[0]),this.added_to_queue=this.added_to_queue+1,t(function(){return e.resolve_children(e.queue.shift())},0)},s.prototype.resolve=function(t,n){var s,r,i,o,u,l,c;for(u in null==t&&(t=["Conditions","Loops","Sequences"]),null==n&&(n=["Conditions","Loops","Questions","Sequences","Statements"]),c=[],l=this.constructs)r=l[u],e.call(t,u)>=0?c.push(function(){var e,t,n,u,l,c,h,d,p;for(p=[],e=0,u=r.length;e<u;e++){for(h=(i=r[e]).children,o=t=0,l=h.length;t<l;o=++t)null!=(s=h[o]).type&&s.type in this.map&&(i.children[o]=this.constructs[this.map[s.type]].select_resource_by_id(s.id));if(null!=i.fchildren)for(d=i.fchildren,o=n=0,c=d.length;n<c;o=++n)null!=(s=d[o]).type&&s.type in this.map&&(i.fchildren[o]=this.constructs[this.map[s.type]].select_resource_by_id(s.id));p.push(i.resolved=!0)}return p}.call(this)):c.push(void 0);return c},s}(),s.QuestionResolver=function(){function e(e){this.questions=e}return e.prototype.map={QuestionItem:"Items",QuestionGrid:"Grids"},e.prototype.resolve=function(e){var t,n,s,r,i,o;for(o=[],r=s=0,i=e.length;s<i;r=++s)n=e[r],o.push(null!=(t=e[r]).base?t.base:t.base=this.questions[this.map[n.question_type]].select_resource_by_id(n.question_id));return o},e}(),s.CodeResolver=function(){function e(e,t){this.code_lists=e,this.categories=t}return e.prototype.category=function(e){return this.categories.select_resource_by_id(e.category_id)},e.prototype.resolve=function(){var e,t,n,s,r,i,o;for(o=[],n=0,r=(i=this.code_lists).length;n<r;n++)t=i[n],o.push(function(){var n,r,i,o;for(i=t.codes,o=[],s=n=0,r=i.length;n<r;s=++n)e=i[s],o.push(t.codes[s].label=this.category(e).label);return o}.call(this));return o},e}(),s.GroupResolver=function(){function e(e,t){this.groups=e,this.users=t}return e.prototype.resolve=function(){var e,t,n,s,r,i,o,u;for(r=this.groups,i=[],t=n=0,s=r.length;n<s;t=++n)e=r[t],this.groups[t].users=[],i.push(function(){var n,s,r,i;for(r=this.users,i=[],u=n=0,s=r.length;n<s;u=++n)o=r[u],e.id===o.group_id?(this.users[u].group=e.label,i.push(this.groups[t].users.push(o))):i.push(void 0);return i}.call(this));return i},e}(),s}])}).call(this);