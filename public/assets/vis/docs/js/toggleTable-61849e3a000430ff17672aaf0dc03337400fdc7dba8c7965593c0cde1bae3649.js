function toggleTable(e,a,t){for(var l,c,s=document.getElementById(e),r=!1,i=0;l=s.rows[i];i++)l.getAttribute("parent")===a&&(-1!==l.className.indexOf("hidden")?(l.className=l.className.replace(" hidden","").replace("hidden",""),l.className+=" visible"):(l.className=l.className.replace(" visible","").replace("visible",""),l.className+=" hidden",r=!0));!0===r?(c=document.getElementsByClassName("caret"),t.className+=" collapsible"):(c=document.getElementsByClassName("right-caret"),t.className=t.className.replace(" collapsible","").replace("collapsible",""));for(i=0;i<c.length;i++)c[i].getAttribute("parent")===a&&(c[i].className=!0===r?"right-caret":"caret")}function toggleTab(e){for(var a=e.parentNode,t=(e.className.indexOf("active"),0);t<a.children.length;t++){var l=a.children[t];if(l.getAttribute("targetNode")){var c=document.getElementById(l.getAttribute("targetNode"));c.className=c.className.replace(" hidden","").replace("hidden","")+" hidden"}l.className=l.className.replace(" active","").replace("active","")}e.className+=" active";var s=e.getAttribute("targetNode");if(s){var r=document.getElementById(s);r.className=r.className.replace(" hidden","").replace("hidden","")}}