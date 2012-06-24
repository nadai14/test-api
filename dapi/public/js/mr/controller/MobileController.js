/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * MobileController class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: MobileController.js 344 2012-06-24 07:17:27Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-24 16:17:27 +0900 (日, 24 6 2012) $ by $Author: tsuru $
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
		 * isAdPlayingChanged 
		 */
		onIsAdEndedChanged: function() {
			ns.trace(this.typeName + '#onIsAdEndedChanged()');
			// keep reference
			var _self = this;
			// 
			if(this.getIsAdEnded() && !this.getIsAlready()){
				this.requestNextPage(function(){
					// update nav
					_self.models.nav.set({
						"html": _self._page.get('questions').at(0).get('num') + ' / ' +  _self._page.get('question_cnt')
						});
					// scrollto
					$('html, body').animate({
						crollTop: $(".mr-ui-content").offset().top
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
					ns.alert('動画を最後まで再生してアンケートにお答えください');
					// mediaElement.play();
				}
			}
		}
	});
})(mr.controller);