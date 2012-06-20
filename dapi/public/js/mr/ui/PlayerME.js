/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Player.js 225 2012-06-15 11:57:34Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-15 20:57:34 +0900 (金, 15 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $, ua){
	ns.PlayerME = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('PlayerME'), 
		/**
		 * default tag name of this view
		 */
		tagName:    'video',
		/**
		 * 
		 */
		className:  ns.cls('player'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "hide", "show", "render");
			
			// 
			this.controller = options.controller;
			
			// keep this
			var _self = this;
					
			// set event handler if model exists
			if(this.model) {
				this.model.on('change:campaign', this.render, this);
			}
		},
		/**
		 * render
		 */
		render: function(success){
			ns.trace(this.typeName + '#render()');
			var _self = this;
			// remove template
			if($(_self.el).hasClass(ns.cls('template'))) {
				$(_self.el).removeClass(ns.cls('template'));
			}
			// poster
			if(this.model.has('poster')) {
				$(this.el).attr('poster', this.model.get('poster'));
			}
			// video
			if(this.model.has('video')) {
				ns.trace(this.typeName + '#_render():' + this.model.get('video'));
				// set source
				$(this.el).attr('src', this.model.get('video'));
				if(0 <= this.model.get('video').indexOf('m3u8')) {
					$(this.el).attr('type', 'application/x-mpegURL');
				}
				
				// mediaelement
				$(this.el).mediaelementplayer({
					features:                 ['playpause', 'current', 'duration'],
					loop:                     false,
  				AndroidUseNativeControls: false,
					success:                  function (mediaElement, domObject) { 
						mediaElement.addEventListener('progress', function(e) {
							ns.trace('progress');
						}, false);
						mediaElement.addEventListener('loadedmetadata', function(e) {
							ns.trace('loadedmetadata');
						}, false);
						mediaElement.addEventListener('canplay', function(e) {
							ns.trace('canplay');
						}, false);
						mediaElement.addEventListener('timeupdate', function(e) {
							ns.trace('timeupdate');
							_self.controller.setAdCurrentTime(mediaElement.currentTime);
						}, false);
						mediaElement.addEventListener('play', function(e) {
							ns.trace('play');
						}, false);
						mediaElement.addEventListener('playing', function(e) {
							ns.trace('playing');
							_self.controller.setIsAdPlaying(true);
						}, false);
						mediaElement.addEventListener('pause', function(e) {
							ns.trace('pause');
							if(!_self.controller.getIsAdEnded()) {
								if(mediaElement.currentTime < mediaElement.duration ) {
									ns.alert('動画を最後まで再生してアンケートにお答えください');
									mediaElement.play();
								}
							}
						}, false);
						mediaElement.addEventListener('seeking', function(e) {
							ns.trace('seeking');
						}, false);
						mediaElement.addEventListener('seeked', function(e) {
							ns.trace('seeked');
						}, false);
						mediaElement.addEventListener('ended', function(e) {
							ns.trace('ended');
							// exit fullscreen
							if(ua.OS === "iPhone/iPod"){
								$(domObject).get(0).webkitExitFullscreen();
							}
							// end
							_self.controller.setIsAdEnded(true);
						}, false);
						
						success(_self);
	        }
	    	});
			}
			return this;
		}
	});
})(mr.ui, mr.$, mr.ua);