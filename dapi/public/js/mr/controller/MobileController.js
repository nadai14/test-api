/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * MobileController class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: MobileController.js 387 2012-07-02 01:40:49Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-07-02 10:40:49 +0900 (月, 02 7 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.MobileController = ns.Controller.extend({
		/**
		 * typeName of this class
		 */
		typeName:         ns.typeName('MobileController'),
		/**
		 * getDefaultCss
		 */
		getDefaultCss:    function() {
			ns.trace(this.typeName + '#getDefaultCss()');
			return 'css/sp/themes/default-1/style.css?v=20120623';
		},
		/**
		 * isAdPlayingChanged 
		 */
		onAdCurrentTimeChanged: function() {
			ns.trace(this.typeName + '#onAdCurrentTimeChanged()' + this.wait_until);
			if(!this.getIsAdEnded() && !this.getIsAlready()){
				var _left = this.getAdDuration() - Math.floor(this.getAdCurrentTime());
				// this.models.nav.set('html',   '動画の視聴が完了していません<br/>動画を最後まで再生して<br/>アンケートにお答えください。<br/>(残り：' + _left + ' 秒)');
				this.models.nav.set('html',   '動画の視聴が完了していません。');
			}
		},
		/**
		 * isAdPlayingChanged 
		 */
		onIsAdPlayingChanged: function() {
			ns.trace(this.typeName + '#onIsAdPlayingChanged()');
			// http://redmine.sunbi.co.jp/issues/1956
			if(!this.getIsAlready()){
				this.models.nav.set('html', '動画の視聴が完了していません。');
			}
		},
		/**
     * setIsAdEnded()
     */
    setIsAdEnded: function(ended) {
    	ns.trace(this.typeName + '#setIsAdEnded(' + ended + ')');
    	if(this.isAdEnded !== ended) {
    		if(ended === true) {
    			// check current time & duration
    			if(this.getAdCurrentTime() < (this.getAdDuration() - 2)) {
    				return;
    			}
    		}
    		this.isAdEnded = ended;	
    		this.trigger('change:isAdEnded');
    	}
    	return this;
    },
		/**
		 * isAdPlayingChanged 
		 */
		onIsAdEndedChanged: function() {
			ns.trace(this.typeName + '#onIsAdEndedChanged()');
			// keep reference
			var _self = this;
			// 
			if(this.getIsAdEnded() && !this.getIsAlready()){
				// request next page
				this.requestNextPage(function(){
					// start watchtimeout
					_self.startWatchTimeout();
					// update nav
					_self.models.nav.set({
						// "html": _self._page.get('question_cnt') + ' 問中  ' + _self._page.get('questions').at(0).get('num') + ' 問目'
						"html": Math.floor(_self.getDefaultWatchTimeout() / 1000)  + ' 秒以内にスタートしてください。'
					});
					// scrollto
					$('html, body').animate({
						scrollTop: $(".mr-ui-content").offset().top
					}, 1500);
				});
			}
		},
		/**
		 * onIsAdEndedChanged() 
		 */
		onIsAdPausedChanged: function() {
			ns.trace(this.typeName + '#onIsAdPausedChanged()');
			
			if(!this.getIsAdEnded() && !this.getIsAlready()) {
				if(this.getAdCurrentTime() < this.getAdDuration() - 2 /**/) {
					ns.alert('動画を最後まで再生してアンケートにお答えください。(' + this.getAdCurrentTime() + '/' + this.getAdDuration() + ')');
				}
			}
		},
		/**
		 * onTimeout()
		 */
		onTimeout:           function() {
    	ns.trace(this.typeName + '#onTimeout()');
    	this.timeout();
    }
	});
})(mr.controller);