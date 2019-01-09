"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="treeControl"),function(e){"use strict";function n(e){return function(){for(var n,o=[],t=e;t&&t.node!==e.synteticRoot;)n!==t.node&&o.push(t.node),n=t.node,t=t.$parent;return o}}function o(e,n,o){e.hasOwnProperty(n)||(e[n]=o)}function t(e,n){return!e[n.options.nodeChildren]||0===e[n.options.nodeChildren].length}function s(n,o){if(e.isArray(n)){o=o||[];for(var t=0;t<n.length;t++)o[t]=n[t]}else if(e.isObject(n))for(var s in o=o||{},n)!hasOwnProperty.call(n,s)||"$"===s.charAt(0)&&"$"===s.charAt(1)||(o[s]=n[s]);return o||n}function d(n,o,t){return!(!n||!o)&&((n=s(n))[t.options.nodeChildren]=[],(o=s(o))[t.options.nodeChildren]=[],e.equals(n,o))}function i(){return!0}function l(e){o(e.options,"multiSelection",!1),o(e.options,"nodeChildren","children"),o(e.options,"dirSelectable","true"),o(e.options,"injectClasses",{}),o(e.options.injectClasses,"ul",""),o(e.options.injectClasses,"li",""),o(e.options.injectClasses,"liSelected",""),o(e.options.injectClasses,"iExpanded",""),o(e.options.injectClasses,"iCollapsed",""),o(e.options.injectClasses,"iLeaf",""),o(e.options.injectClasses,"label",""),o(e.options.injectClasses,"labelSelected",""),o(e.options,"equality",d),o(e.options,"isLeaf",t),o(e.options,"allowDeselect",!0),o(e.options,"isSelectable",i)}e.module("treeControl",[]).constant("treeConfig",{templateUrl:null}).directive("treecontrol",["$compile",function(o){function t(e,n){return e?n?'class="'+e+'"':e:""}return{restrict:"EA",require:"treecontrol",transclude:!0,scope:{treeModel:"=",selectedNode:"=?",selectedNodes:"=?",expandedNodes:"=?",onSelection:"&",onNodeToggle:"&",options:"=?",orderBy:"=?",reverseOrder:"@",filterExpression:"=?",filterComparator:"=?"},controller:["$scope","$templateCache","$interpolate","treeConfig",function(e,s,d,i){function r(n){if(!e.options.multiSelection&&e.options.equality(n,e.selectedNode,e))return!0;if(e.options.multiSelection&&e.selectedNodes){for(var o=0;o<e.selectedNodes.length;o++)if(e.options.equality(n,e.selectedNodes[o],e))return!0;return!1}}e.options=e.options||{},l(e),e.selectedNodes=e.selectedNodes||[],e.expandedNodes=e.expandedNodes||[],e.expandedNodesMap={};for(var a=0;a<e.expandedNodes.length;a++)e.expandedNodesMap["a"+a]=e.expandedNodes[a];e.parentScopeOfTree=e.$parent,e.headClass=function(n){var o=t(e.options.injectClasses.liSelected,!1),s="";return o&&r(n)&&(s=" "+o),e.options.isLeaf(n,e)?"tree-leaf"+s:e.expandedNodesMap[this.$id]?"tree-expanded"+s:"tree-collapsed"+s},e.iBranchClass=function(){return e.expandedNodesMap[this.$id]?t(e.options.injectClasses.iExpanded):t(e.options.injectClasses.iCollapsed)},e.nodeExpanded=function(){return!!e.expandedNodesMap[this.$id]},e.selectNodeHead=function(){var o=this,t=e.expandedNodesMap[o.$id]===undefined;if(e.expandedNodesMap[o.$id]=t?o.node:undefined,t)e.expandedNodes.push(o.node);else{for(var s,d=0;d<e.expandedNodes.length&&!s;d++)e.options.equality(e.expandedNodes[d],o.node,e)&&(s=d);s!==undefined&&e.expandedNodes.splice(s,1)}if(e.onNodeToggle){var i=o.$parent.node===o.synteticRoot?null:o.$parent.node,l=n(o);e.onNodeToggle({node:o.node,$parentNode:i,$path:l,$index:o.$index,$first:o.$first,$middle:o.$middle,$last:o.$last,$odd:o.$odd,$even:o.$even,expanded:t})}},e.selectNodeLabel=function(o){var t=this;if(e.options.isLeaf(o,e)||e.options.dirSelectable&&e.options.isSelectable(o)){if(e.options.isLeaf(o,e)&&!e.options.isSelectable(o))return;var s=!1;if(e.options.multiSelection){for(var d=-1,i=0;i<e.selectedNodes.length;i++)if(e.options.equality(o,e.selectedNodes[i],e)){d=i;break}-1===d?(e.selectedNodes.push(o),s=!0):e.selectedNodes.splice(d,1)}else e.options.equality(o,e.selectedNode,e)&&e.options.allowDeselect?e.selectedNode=undefined:(e.selectedNode=o,s=!0);if(e.onSelection){var l=t.$parent.node===t.synteticRoot?null:t.$parent.node,r=n(t);e.onSelection({node:o,selected:s,$parentNode:l,$path:r,$index:t.$index,$first:t.$first,$middle:t.$middle,$last:t.$last,$odd:t.$odd,$even:t.$even})}}else this.selectNodeHead()},e.selectedClass=function(){var n=r(this.node),o=t(e.options.injectClasses.labelSelected,!1),s="";return o&&n&&(s=" "+o),n?"tree-selected"+s:""},e.unselectableClass=function(){var n=!e.options.isSelectable(this.node),o=t(e.options.injectClasses.labelUnselectable,!1);return n?"tree-unselectable "+o:""},e.isReverse=function(){return!("false"===e.reverseOrder||"False"===e.reverseOrder||""===e.reverseOrder||!1===e.reverseOrder)},e.orderByFunc=function(){return e.orderBy};var c,p={orderBy:e.orderBy?" | orderBy:orderByFunc():isReverse()":"",ulClass:t(e.options.injectClasses.ul,!0),nodeChildren:e.options.nodeChildren,liClass:t(e.options.injectClasses.li,!0),iLeafClass:t(e.options.injectClasses.iLeaf,!1),labelClass:t(e.options.injectClasses.label,!1)},u=e.options.templateUrl||i.templateUrl;u&&(c=s.get(u)),c||(c='<ul {{options.ulClass}} ><li ng-repeat="node in node.{{options.nodeChildren}} | filter:filterExpression:filterComparator {{options.orderBy}}" ng-class="headClass(node)" {{options.liClass}}set-node-to-data><i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i><i class="tree-leaf-head {{options.iLeafClass}}"></i><div class="tree-label {{options.labelClass}}" ng-class="[selectedClass(), unselectableClass()]" ng-click="selectNodeLabel(node)" tree-transclude></div><treeitem ng-if="nodeExpanded()"></treeitem></li></ul>'),this.template=o(d(c)({options:p}))}],compile:function(n,o,t){return function(n,o,s,d){n.$watch("treeModel",function(o){if(e.isArray(o)){if(e.isDefined(n.node)&&e.equals(n.node[n.options.nodeChildren],o))return;n.node={},n.synteticRoot=n.node,n.node[n.options.nodeChildren]=o}else{if(e.equals(n.node,o))return;n.node=o}}),n.$watchCollection("expandedNodes",function(t){var s=0,d={},i=o.find("li"),l=[];e.forEach(i,function(n){var o=e.element(n),t={$id:o.data("scope-id"),node:o.data("node")};l.push(t)}),e.forEach(t,function(e){for(var o=!1,t=0;t<l.length&&!o;t++){var i=l[t];n.options.equality(e,i.node,n)&&(d[i.$id]=i.node,o=!0)}o||(d["a"+s++]=e)}),n.expandedNodesMap=d}),d.template(n,function(e){o.html("").append(e)}),n.$treeTransclude=t}}}}]).directive("setNodeToData",["$parse",function(){return{restrict:"A",link:function(e,n){n.data("node",e.node),n.data("scope-id",e.$id)}}}]).directive("treeitem",function(){return{restrict:"E",require:"^treecontrol",link:function(e,n,o,t){t.template(e,function(e){n.html("").append(e)})}}}).directive("treeTransclude",function(){return{controller:["$scope",function(e){l(e)}],link:function(o,t){if(o.options.isLeaf(o.node,o)||e.forEach(o.expandedNodesMap,function(e,n){o.options.equality(e,o.node,o)&&(o.expandedNodesMap[o.$id]=o.node,o.expandedNodesMap[n]=undefined)}),!o.options.multiSelection&&o.options.equality(o.node,o.selectedNode,o))o.selectedNode=o.node;else if(o.options.multiSelection){for(var s=[],d=0;d<o.selectedNodes.length;d++)o.options.equality(o.node,o.selectedNodes[d],o)&&s.push(o.node);o.selectedNodes=s}o.transcludeScope=o.parentScopeOfTree.$new(),o.transcludeScope.node=o.node,o.transcludeScope.$path=n(o),o.transcludeScope.$parentNode=o.$parent.node===o.synteticRoot?null:o.$parent.node,o.transcludeScope.$index=o.$index,o.transcludeScope.$first=o.$first,o.transcludeScope.$middle=o.$middle,o.transcludeScope.$last=o.$last,o.transcludeScope.$odd=o.$odd,o.transcludeScope.$even=o.$even,o.$on("$destroy",function(){o.transcludeScope.$destroy()}),o.$treeTransclude(o.transcludeScope,function(e){t.empty(),t.append(e)})}}})}(angular);