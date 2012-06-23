/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * MobileController class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: MobileController.js 334 2012-06-23 08:44:55Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-23 17:44:55 +0900 (Sat, 23 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.MobileController = ns.Controller.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('MobileController'), 
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
    	//
    	var _self = this;
    	// 
    	if(this.getIsAdEnded() && !this.getIsAlready()){
    		this.requestNextPage(function(){
    			_self.models.nav.set({
    				"html": _self._page.get('questions').at(0).get('num') + ' / ' +  _self._page.get('question_cnt')
    			});
    		});
    	}
    },
    /**
     * onIsAdEndedChanged() 
     */
    onIsAdPausedChanged: function() {
    	ns.trace(this.typeName + '#onIsAdPausedChanged()');
    	if(!this.getIsAdEnded() && !this.getIsAlready()) {
				if(this.getAdCurrentTime() < this.getAdDuration()) {
					ns.alert('動画を最後まで再生してアンケートにお答えください');
					// mediaElement.play();
				}
			}
    }
	});
})(mr.controller);