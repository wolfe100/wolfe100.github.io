//@ui5-bundle syshub/controls/library-preload.js
/*
 * Copyright (c) NT-ware ES 2008-2023. All Rights Reserved.
 * Internet : https://www.nt-ware.com
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("syshub/controls/Paginator",["jquery.sap.global","sap/ui/core/Control","./library","./PaginatorRenderer"],function(e,t,i,s){"use strict";let a=i.PaginatorEvent;let r=t.extend("syshub.controls.Paginator",{metadata:{library:"syshub.controls",properties:{currentPage:{type:"int",group:"Misc",defaultValue:1},numberOfVisiblePages:{type:"int",group:"Misc",defaultValue:5},entriesAbsolute:{type:"int",group:"Misc",defaultValue:null},entriesPerPage:{type:"int",group:"MISC",defaultValue:100},entriesPerPageSelectionValues:{type:"string",group:"MISC",defaultValue:"10,20,30,40,50,60,70,80,90,100"},entriesPerPageVisible:{type:"boolean",group:"MISC",defaultValue:true},pageHolderWidth:{type:"int",group:"MISC"},showGoto:{type:"boolean",group:"MISC",defaultValue:true},showSpinner:{type:"boolean",group:"Misc",defaultValue:false}},events:{page:{parameters:{srcPage:{type:"int"},targetPage:{type:"int"},offset:{type:"int"},limit:{type:"int"},type:{type:"syshub.controls.PaginatorEvent"}}},entriesPerPageChanged:{parameters:{offset:{type:"int"},limit:{type:"int"}}}}}});r.numberOfPages=null;r.prototype.init=function(){this.bShowAnimation=true;this.busyCount=0};r.prototype.onclick=function(e){this._handleSelect(e)};r.prototype.setCurrentPage=function(e,t){this.setProperty("currentPage",e,t);if(this.getDomRef()){s.updateBackAndForward(this)}return this};r.prototype.triggerPaginatorAnimation=function(){let e=[];let t=[];let i=this.getId();let a=$("#"+i+"-pages").children();let r=this._calculatePagesRange();let n;if(this._oOldRange){n=this._oOldRange}else{n={};let e=a[0].id.split("--");n.firstPage=parseInt(e[e.length-1],10);e=a[a.length-1].id.split("--");n.lastPage=parseInt(e[e.length-1],10)}let g;for(g=r.firstPage;g<=r.lastPage;g++){if(g<n.firstPage||g>n.lastPage){t.push(g)}}let l={firstPage:t[0],lastPage:t[t.length-1]};for(g=n.firstPage;g<=n.lastPage;g++){if(g<r.firstPage||g>r.lastPage){e.push(g)}}this.getDomRef("summary").outerHTML=s.getSummaryHtml(this,this.getCurrentPage());let o=s.getPagesHtml(this.getId(),n,this.getCurrentPage(),true);let u=s.getPagesHtml(this.getId(),l,this.getCurrentPage(),false);if(n.firstPage<l.firstPage){u=o+u}else{u=u+o}let f=document.activeElement;let p=f?f.id:undefined;this.getDomRef("pages").innerHTML=u;if(p){f=$("#"+p)}else{f=$("#testPaginator-a--"+this.getCurrentPage())}$(f).focus();let h=this.getId()+"-li--";this._oOldRange=r;function P(e){let t=$("#"+e);if(t){}}for(g=0;g<e.length;g++){let t=h+e[g];$("#"+t).hide(400,P(this.getId()))}for(g=0;g<t.length;g++){$("#"+h+t[g]).show(400)}};r.prototype._calculatePagesRange=function(){let e=1;let t=this.numberOfPages;let i=this.getCurrentPage();let s;let a;if(Number.isInteger(this.getNumberOfVisiblePages()/2)){s=this.getNumberOfVisiblePages()/2;a=this.getNumberOfVisiblePages()/2-1}else{s=Math.ceil(this.getNumberOfVisiblePages()/2);a=Math.ceil(this.getNumberOfVisiblePages()/2)}if(i<this.getNumberOfVisiblePages()-1){if(t>this.getNumberOfVisiblePages()){t=this.getNumberOfVisiblePages()}}else if(i===t){if(t>=this.getNumberOfVisiblePages()){e=t-this.getNumberOfVisiblePages()+1}}else if(t-i<a){e=t-this.getNumberOfVisiblePages()+1}else{e=i-s;t=i+a}return{firstPage:e,lastPage:t}};r.prototype.onkeydown=function(t){let i=t.getPseudoTypes();if(e.inArray("saptabnext",i)!==-1){this.triggerTabbingNavigation(t,false)}else if(e.inArray("saptabprevious",i)!==-1){this.triggerTabbingNavigation(t,true)}else if(e.inArray("sapincrease",i)!==-1){this.triggerInternalNavigation(t,"next")}else if(e.inArray("sapdecrease",i)!==-1){this.triggerInternalNavigation(t,"previous")}else if(e.inArray("sapenter",i)!==-1){this._handleSelect(t)}};r.prototype.triggerInternalNavigation=function(t,i){let s=e(this.getDomRef()).find(":sapFocusable");let a=e(s).index(t.target);let r,n;if(i==="next"){r=a+1;if(e(t.target).hasClass("cosmosUiPagCurrentPage")){r=r+1}n=s[r];if(n){e(n).focus();t.preventDefault();t.stopPropagation()}}else if(i==="previous"&&s[a-1]){r=a-1;n=s[r];if(n&&e(n).hasClass("cosmosUiPagCurrentPage")){n=s[r-1]}if(n){e(n).focus();t.preventDefault();t.stopPropagation()}}};r.prototype.triggerTabbingNavigation=function(t,i){let s=e(this.getDomRef()).find(":sapFocusable");if(!i){e(s[s.length-1]).focus()}else{let i=e(s).index(t.target);if(i!==0){e(s[0]).focus()}}};r.prototype.getFocusInfo=function(){let e=this.$().find(":focus").attr("id");if(e){return{customId:e}}else{return sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments)}};r.prototype.applyFocusInfo=function(e){if(e&&e.customId){this.$().find("#"+e.customId).focus()}else{sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments)}return this};r.prototype._handleSelect=function(e){if(e&&e.target){e.preventDefault();let t=e.target;if(!t.id){t=t.parentNode}if(t.id&&t.id!==this.getId()+"-pages"){let i=t.id.split("--");if(i.length>1){let s=i[i.length-1];let r=null;let n=this.getCurrentPage();let g=n;if(s.match(/^\d+$/)){r=a.Goto;g=parseInt(s,10)}else if(s==="firstPageLink"){r=a.First;g=1}else if(s==="backLink"){r=a.Previous;g=Math.max(n-1,1)}else if(s==="forwardLink"){r=a.Next;g=Math.min(n+1,this.numberOfPages)}else if(s==="lastPageLink"){r=a.Last;g=this.numberOfPages}else if(s==="gotoPageLink"){r=a.Goto;let e=t.id.replace("gotoPageLink","gotoPageValue");let i=document.getElementById(e).value;g=parseInt(i);if(isNaN(g)||g>this.numberOfPages){return}}else if(s==="gotoPageValue"&&e.keyCode===13){r=a.Goto;let e=t.id.replace("gotoPageLink","gotoPageValue");let i=document.getElementById(e).value;g=parseInt(i);if(isNaN(g)||g>this.numberOfPages){return}}else if(s==="entriesPerPageSelection"){let t=e.target.options.selectedIndex;let i=parseInt(e.target.options[t].value);if(i!==this.getEntriesPerPage()){this.setEntriesPerPage(i);this.fireEntriesPerPageChanged({offset:(g-1)*this.getEntriesPerPage(),limit:this.getEntriesPerPage()})}}if(g!==n){if(this.bShowAnimation){this.setCurrentPage(g,true);this.triggerPaginatorAnimation()}else{this.setCurrentPage(g)}this.firePage({srcPage:n,targetPage:g,offset:(g-1)*this.getEntriesPerPage(),limit:this.getEntriesPerPage(),type:r})}}}}};r.prototype.setShowSpinner=function(e){if(e){$("#"+this.getId()+"--busyIndicator").attr("style","visibility:visible")}else{$("#"+this.getId()+"--busyIndicator").attr("style","visibility:hidden")}};return r},true);
/*
 * Copyright (c) NT-ware ES 2008-2023. All Rights Reserved.
 * Internet : https://www.nt-ware.com
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("syshub/controls/PaginatorRenderer",[],function(){"use strict";let e={};e.render=function(e,t){this.rb=sap.ui.getCore().getLibraryResourceBundle("syshub.controls");e.write("<div ");e.writeControlData(t);e.writeAccessibilityState(t,{role:"toolbar",labelledby:t.getId()+"-accDesc"});e.write(">");this.renderPaginator(e,t)};e.renderPaginator=function(t,i){let s=0;if(i.getEntriesAbsolute()===0){return}else{s=Math.ceil(i.getEntriesAbsolute()/i.getEntriesPerPage())}i.numberOfPages=s;if(i.numberOfPages<1){return}let a=i.getId();let r=i.getCurrentPage();t.write("<div id='"+a+"--busyIndicator' class='UiPagSpinner UiPagLeft' >");t.write("</div>");t.write(e.getSummaryHtml(i,r));t.write("<div id='"+a+"--right' class='UiPagRight' >");let g=r===1?" UiPagNavDisabled":" UiPagNav";if(i.numberOfPages>i.getNumberOfVisiblePages()){t.write("<span id='"+a+"--firstPageLink' title='");t.writeEscaped(this.rb.getText("FIRST_PAGE"));t.write("' class='"+g+"'>");t.write("&#xe1bf");t.write("</span>")}t.write("<span id='"+a+"--backLink' title='");t.writeEscaped(this.rb.getText("PREVIOUS_PAGE"));t.write("' class='"+g+"'>");t.write("&#xe1eb");t.write("</span>");if(i.getPageHolderWidth()>0){t.write("<ul id='"+a+"-pages' style='width: "+i.getPageHolderWidth()+"px' role='presentation'>")}else{t.write("<ul id='"+a+"-pages'  role='presentation'>")}t.write(e.getPagesHtml(a,i._calculatePagesRange(),i.getCurrentPage(),true));t.write("</ul>");let l=r===i.numberOfPages?" UiPagNavDisabled":" UiPagNav";t.write("<span id='"+a+"--forwardLink' title='");t.writeEscaped(this.rb.getText("NEXT_PAGE"));t.write("' class='"+l+"'>");t.write("&#xe066");t.write("</span>");if(i.numberOfPages>i.getNumberOfVisiblePages()){t.write("<span id='"+a+"--lastPageLink' title='");t.writeEscaped(this.rb.getText("LAST_PAGE"));t.write("' class='"+l+"'>");t.write("&#xe1c0");t.write("</span>")}if(i.getShowGoto()===true){t.write(e.getGotoHtml(a,i))}t.write("</div>")};e.getPagesHtml=function(e,t,i,s){let a=[];for(let r=t.firstPage;r<=t.lastPage;r++){a.push("<li id='"+e+"-li--"+r+"' class='UiPagPage");a.push(r===i?" UiPagCurrentPage'":"'");if(!s){a.push(" style='display:none'")}a.push(">");a.push("<span id='"+e+"-span--"+r+"' title='");if(r===i){a.push(this.rb.getText("PAGINATOR_CURRENT_PAGE",[r]))}else{a.push(this.rb.getText("PAGINATOR_OTHER_PAGE",[r]))}a.push("' class='UiPagPage'>"+r+"</span>");a.push("</li>")}return a.join("")};e.getSummaryHtml=function(e,t){let i=1;let s=e.getEntriesPerPage();if(t>1){i=t*s-(s-1);s=s*t}s=s>e.getEntriesAbsolute()?e.getEntriesAbsolute():s;let a=[];a.push("<div id='"+e.getId()+"-summary' class='UiPagLeft'>");a.push("<span>"+this.rb.getText("SUMMARY_INFO",[i,s,e.getEntriesAbsolute()])+"</span>");if(e.getEntriesPerPageVisible()){let t=e.getEntriesPerPage();let i=e.getEntriesPerPageSelectionValues().split(",");a.push("<span> "+this.rb.getText("SUMMARY_INFO1")+"</span>");a.push("<select id='"+e.getId()+"--entriesPerPageSelection'   class='sapMInputBaseContentWrapper UiPagEntrySelect'>");i.forEach(function(e){let i=parseInt(e);if(i===t){a.push("<option selected value='"+i+"'>"+i+"</option>")}else{a.push("<option value='"+i+"'>"+i+"</option>")}});a.push("</select>");a.push("<span>"+this.rb.getText("SUMMARY_INFO2")+"</span>")}a.push("</div>");return a.join("")};e.getGotoHtml=function(e,t){let i=[];i.push("<span id='"+e+"--gotoPageLink' class='UiPagGotoButton'>"+this.rb.getText("GOTO")+"</span>");i.push("<input id='"+e+"--gotoPageValue' type='number'  min='1'  step='1' placeholder='"+t.numberOfPages+"'  class='sapMInputBaseContentWrapper UiPagGotoInput'/>");return i.join("")};e.updateBackAndForward=function(e){let t=e.getCurrentPage();let i=e.getId();let s=t===1;let a=t===e.numberOfPages;$("#"+i+"--firstPageLink").toggleClass("UiPagNav",!s).toggleClass("UiPagNavDisabled",s);$("#"+i+"--backLink").toggleClass("UiPagNav",!s).toggleClass("UiPagNavDisabled",s);$("#"+i+"--forwardLink").toggleClass("UiPagNav",!a).toggleClass("UiPagNavDisabled",a);$("#"+i+"--lastPageLink").toggleClass("UiPagNav",!a).toggleClass("UiPagNavDisabled",a)};return e},true);
/*
 * Copyright (c) NT-ware ES 2008-2023. All Rights Reserved.
 * Internet : https://www.nt-ware.com
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine("syshub/controls/library",["sap/ui/core/library","sap/ui/layout/library","sap/ui/unified/library"],function(){"use strict";let s=sap.ui.getCore().initLibrary({name:"syshub.controls",version:"1.0.0",dependencies:["sap.ui.core","sap.ui.layout","sap.ui.unified"],types:["syshub.controls.PaginatorEvent"],interfaces:[],controls:["syshub.controls.Paginator"],elements:[]});s.PaginatorEvent={First:"First",Previous:"Previous",Goto:"Goto",Next:"Next",Last:"Last"};return s});