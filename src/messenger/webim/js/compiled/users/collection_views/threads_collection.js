/*
 This file is part of Mibew Messenger project.
 http://mibew.org

 Copyright (c) 2005-2011 Mibew Messenger Community
 License: http://mibew.org/license.php
*/
(function(d,h,j){d.Views.ThreadsCollection=d.Views.CompositeBase.extend({template:h.templates.threads_collection,itemView:d.Views.QueuedThread,itemViewContainer:"#threads-container",emptyView:d.Views.NoThreads,className:"threads-collection",collectionEvents:{sort:"renderCollection","sort:field":"createSortField",add:"threadAdded"},itemViewOptions:function(a){return{tagName:d.Objects.Models.page.get("threadTag"),collection:a.get("controls")}},initialize:function(){window.setInterval(j.bind(this.updateTimers,
this),2E3);this.on("itemview:before:render",this.updateStyles,this);this.on("render",this.updateTimers,this)},updateStyles:function(a){var b=this.collection,c=a.model,d=this;if(c.id){var e=this.getQueueCode(c),f=!1,g=!1,b=b.filter(function(a){return d.getQueueCode(a)==e});0<b.length&&(g=b[0].id==c.id,f=b[b.length-1].id==c.id);if(0<a.lastStyles.length){c=0;for(b=a.lastStyles.length;c<b;c++)a.$el.removeClass(a.lastStyles[c]);a.lastStyles=[]}c=(e!=this.QUEUE_BAN?"in":"")+this.queueCodeToString(e);a.lastStyles.push(c);
g&&a.lastStyles.push(c+"-first");f&&a.lastStyles.push(c+"-last");c=0;for(b=a.lastStyles.length;c<b;c++)a.$el.addClass(a.lastStyles[c])}},updateTimers:function(){d.Utils.updateTimers(this.$el,".timesince")},createSortField:function(a,b){var c=this.getQueueCode(a)||"Z";b.field=c.toString()+"_"+a.get("waitingTime").toString()},threadAdded:function(){var a=d.Objects.Models.page.get("webimRoot");a&&d.Utils.playSound(a+"/sounds/new_user.wav");if(d.Objects.Models.page.get("showPopup"))this.once("render",
function(){alert(d.Localization.get("pending.popup_notification"))})},getQueueCode:function(a){var b=a.get("state");return!1!=a.get("ban")&&b!=a.STATE_CHATTING?this.QUEUE_BAN:b==a.STATE_QUEUE||b==a.STATE_LOADING?this.QUEUE_WAITING:b==a.STATE_CLOSED||b==a.STATE_LEFT?this.QUEUE_CLOSED:b==a.STATE_WAITING?this.QUEUE_PRIO:b==a.STATE_CHATTING?this.QUEUE_CHATTING:!1},queueCodeToString:function(a){return a==this.QUEUE_PRIO?"prio":a==this.QUEUE_WAITING?"wait":a==this.QUEUE_CHATTING?"chat":a==this.QUEUE_BAN?
"ban":a==this.QUEUE_CLOSED?"closed":""},QUEUE_PRIO:1,QUEUE_WAITING:2,QUEUE_CHATTING:3,QUEUE_BAN:4,QUEUE_CLOSED:5})})(Mibew,Handlebars,_);
