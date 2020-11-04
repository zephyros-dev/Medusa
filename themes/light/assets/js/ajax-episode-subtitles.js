const startAjaxEpisodeSubtitles=function(){let e,t;const s=[".epSubtitlesSearch",".epSubtitlesSearchPP",".epRedownloadSubtitle",".epSearch",".epRetry",".epManualSearch"],i=$("#manualSubtitleSearchModal"),{subtitlesMulti:l}=MEDUSA.config.general,a="images/loading32"+MEDUSA.config.layout.themeSpinner+".gif";function n(){$.each(s,((e,t)=>{$(t).css({"pointer-events":"none"})}))}function o(){$.each(s,((e,t)=>{$(t).css({"pointer-events":"auto"})}))}function c(e,t,s,i,l,a){!0===a&&e.find("img").remove(),e.append($("<img/>").prop({src:t,alt:s,title:i,width:16,height:l}))}i.on("hidden.bs.modal",(()=>{o()})),$.ajaxEpSubtitlesSearch=function(){function s(){n(),c(t,a,"loading","loading",16,!0);let e=t.prop("href");return e=e.replace("searchEpisodeSubtitles","manual_search_subtitles"),$.getJSON(e,(e=>{const s=$("#subtitle_results tr").length;if(s>1)for(let e=s-1;e>0;e--)$("#subtitle_results tr").eq(e).remove();$("h4#manualSubtitleSearchModalTitle.modal-title").text(e.release),"success"===e.result&&$.each(e.subtitles,((e,t)=>{const s='<img src="images/subtitles/'+t.provider+'.png" width="16" height="16" style="vertical-align:middle;"/>',l='<img src="images/subtitles/flags/'+t.lang+'.png" width="16" height="11"/>';let a="";for(let e=0;e<t.missing_guess.length;e++){let s=t.missing_guess[e];a&&(a+=", "),s=s.charAt(0).toUpperCase()+s.slice(1),a+=s.replace(/(_[a-z])/g,(e=>e.toUpperCase().replace("_"," ")))}let n=t.score;const o=t.filename.slice(0,99);t.sub_score>=t.max_score&&(a="");let c="",r="";t.hearing_impaired&&(c="hearing impaired ",r='<img src="images/hearing_impaired.png" width="16" height="16"/> ');let u="";t.sub_score>=t.min_score&&(u=' <img src="images/save.png" width="16" height="16"/>');const d='<a href="#" id="pickSub" title="Download '+c+"subtitle: "+t.filename+'" subtitleID="subtitleid-'+t.id+'">'+r+o+u+"</a>";n>10?n=10:n<0&&(n=0);const g='<tr style="font-size: 95%;"><td style="white-space:nowrap;">'+s+" "+t.provider+"</td><td>"+l+'</td><td title="'+t.sub_score+"/"+t.min_score+'"> '+n+'</td><td class="tvShow"> '+d+"</td><td>"+a+"</td></tr>";$("#subtitle_results").append(g),$(".modal-content").resizable({alsoResize:".modal-body"}),$(".modal-dialog").draggable({cancel:".text"}),i.modal("show")})),c(t,"images/closed_captioning.png","Search subtitles","Search subtitles",16,!0),o()})),!1}$(".epSubtitlesSearch").on("click",(function(s){s.preventDefault(),t=$(this),e=t.parent().siblings(".col-subtitles"),$("#askmanualSubtitleSearchModal").modal("show")})),$(".epSubtitlesSearchPP").on("click",(function(i){i.preventDefault(),t=$(this),e=t.parent().siblings(".col-search"),s()})),$(document).on("click","#pickSub",(function(s){s.preventDefault();const n=$(this);c(n,a,"loading","loading",16,!0);let o=n.attr("subtitleID");o=o.replace("subtitleid-","");let r=t.prop("href");r=r.replace("searchEpisodeSubtitles","manual_search_subtitles"),r+="&picked_id="+encodeURIComponent(o),$.getJSON(r,(s=>{if(!1===i.is(":visible")&&i.modal("show"),"success"===s.result){const i=s.subtitles;if(c(n,"images/yes16.png","subtitle saved","subtitle saved",16,!0),$("table#releasesPP").length>0)t.parent().parent().remove();else if(!0===l){let t=!1;const s=i;e.children().children().each((function(){-1!==$(this).attr("alt").indexOf(s)&&(t=!0)})),!1===t&&c(e,"images/subtitles/flags/"+i+".png",i,i,11,!1)}else c(e,"images/subtitles/flags/unknown.png",i,i,11,!1)}else c(n,"images/no16.png","subtitle not saved","subtitle not saved",16,!0)}))})),$("#askmanualSubtitleSearchModal .btn-medusa").on("click",(function(){"manual"===$(this).text().toLowerCase()?s():function(){n(),c(t,a,"loading","loading",16,!0);const s=t.prop("href");$.getJSON(s,(s=>{if("success"===s.result.toLowerCase()){const t=s.subtitles.split(",");e.empty(),$.each(t,((s,i)=>{""!==i&&(s!==t.length-1?c(e,"",i,i,11,!0):c(e,"images/subtitles/flags/"+i+".png",i,i,11,!0))}))}c(t,"images/closed_captioning.png","Search subtitles","Search subtitles",16,!0),o()}))}()}))},$.fn.ajaxEpMergeSubtitles=function(){$(".epMergeSubtitles").on("click",(function(){const e=$(this);return c(e,a,"loading","loading",16,!0),$.getJSON($(this).attr("href"),(()=>{e.remove()})),!1}))},$.ajaxEpRedownloadSubtitle=function(){$(".epRedownloadSubtitle").on("click",(function(e){e.preventDefault(),t=$(this),$("#confirmSubtitleReDownloadModal").modal("show")})),$("#confirmSubtitleReDownloadModal .btn-medusa.btn-success").on("click",(()=>{!function(){n();const e=t.prop("href"),s="Re-downloading subtitle",i="Re-downloaded subtitle failed",l="Re-downloaded subtitle succeeded";c(t,a,s,s,16,!0),$.getJSON(e,(e=>{"success"===e.result.toLowerCase()&&e.new_subtitles.length>0?c(t,"images/save.png",l,l,16,!0):c(t,"images/no16.png",i,i,16,!0)})),o()}()}))}};