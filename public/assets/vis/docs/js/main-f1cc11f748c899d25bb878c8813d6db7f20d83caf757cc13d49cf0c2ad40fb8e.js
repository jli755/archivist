function checkInput(){if(document.getElementById("tipue_search_input").value.length>3)clearTimeout(vis.typingTimeout),vis.typingTimeout=setTimeout(function(){vis.initSiteSearch(!0)},200);else{var e=document.title.replace(/(\(.+\) )/g,"");document.title=e,document.getElementById("search-results-wrapper").style.display="none"}}$(document).ready(function(){vis.createBreadcrumbs($(".container.full").first()),vis.initSiteSearch(),vis.initKeywords(),$("#tipue_search_input").keyup(checkInput),vis.typingTimeout=0});var vis={createBreadcrumbs:function(e){var t=location.pathname.split("/"),i=t.length-1,r=$.map(t,function(e){if(e){if(i--,/\.html$/.test(e))return"<span>"+e.replace(/\.html$/,"")+"</span>";for(var t=e+"/",r=0;r<i;r++,t="../"+t);return"<a href='"+t+"'>"+e+"</a>"}}).join("")||"Home";$(e).prepend('<div id="breadcrumbs">'+r+"</div>")},initSiteSearch:function(e){if($("#tipue_search_input").tipuesearch({mode:"live",show:3},e),$("#tipue_search_content").children().length>0){"none"===$("#search-results-wrapper").css("display")&&$("#search-results-wrapper").css("display","block");var t=$("#tipue_search_input").val().replace(/\s/g,",");$(".tipue_search_content_url a, .tipue_search_content_title a").each(function(){$(this).attr("href",$(this).attr("href")+"?keywords="+t)})}else $("#search-results-wrapper").css("display","none")},initKeywords:function(){var e=url("?keywords");if(e){e=e.split(",");for(var t=0;t<e.length;t++)$("body").highlight(e[t]);$("[role=presentation][targetnode=fullOptions]").click(),$("tr.toggle:not(collapsible)").click(),$("#keyword-info").css("display","block"),$("#keyword-count").text($(".highlight").length),$("#keyword-jumper-button").on("click",function(e){e.preventDefault();var t=$(".highlight:visible").first();t.length&&$("html, body").animate({scrollTop:$(t).offset().top},2e3)})}}};