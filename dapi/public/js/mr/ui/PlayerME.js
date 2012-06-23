/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: PlayerME.js 338 2012-06-23 14:58:51Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-23 23:58:51 +0900 (土, 23 6 2012) $ by $Author: tsuru $
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
					
			// set event handler if model exists
			if(this.model) {
				this.model.on('change', this.render, this);
			}
		},
		/**
		 * render
		 */
		render: function(success){
			ns.trace(this.typeName + '#render()');
			// keep reference
			var _self = this;
			// remove template
			if($(_self.el).hasClass(ns.cls('template'))) {
				$(_self.el).removeClass(ns.cls('template'));
			}
			// set source
			var _$video = $(this.el);
			// video
			if(this.model.has('movie')) {
				var _movie    = this.model.get('movie');
				var _movies   = this.model.get('movies');
				var _poster   = this.model.has('poster') ? this.model.get('poster') : '';
				var _features = []; // ['playpause', 'fullscreen']; // ['playpause', 'current', 'duration', 'fullscreen'];
				// set source (main)
				_$video
					.attr('type', _movie.type)
					.attr('src', _movie.src)
					.attr('poster', _poster);
				// fallback sources
				for(var m = 0; m < _movies.length; ++m) {
					var _movie   = _movies[m];
					var _$source = $('<source>')
						.attr('type', _movie.type)
						.attr('src', _movie.src)
						.appendTo(_$video);	
				}	
				// determine features
				if(ua.OS !== 'iPhone/iPod' && ua.OS !== 'iPad' && ua.OS !== 'Android') {
					_features = ['playpause'];
				}
				// debug out put
				ns.trace(_$video.parent().html());
				// mediaelement
				var _player = $(this.el).mediaelementplayer({
					flashName:                'mr-player.swf?v=201206232346',
					features:                 _features,
					loop:                     false,
					alwaysShowControls:       false,
					usePluginFullScreen:      true,
					enablePluginDebug:        false,
					enableAutosize:           true,  // @see  http://redmine.sunbi.co.jp/issues/1947
  				// AndroidUseNativeControls: false,
					success:                  function (mediaElement, domObject) {
						if(0 < _self.model.get('movie').src.indexOf('flv')) {
							$('.mejs-mediaelement').css('z-index', '999999');
						}else{
							$('.mejs-poster', self.el).click(function(){
								mediaElement.play();
							});
						}
						mediaElement.addEventListener('progress', function(e) {
							ns.trace('progress');
						}, false);
						mediaElement.addEventListener('loadedmetadata', function(e) {
							ns.trace('loadedmetadata');
							_self.controller.setAdDuration(mediaElement.duration);
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
							_self.controller.setIsAdPaused(true);
						}, false);
						mediaElement.addEventListener('seeking', function(e) {
							ns.trace('seeking');
						}, false);
						mediaElement.addEventListener('seeked', function(e) {
							ns.trace('seeked');
						}, false);
						mediaElement.addEventListener('ended', function(e) {
							ns.trace('ended');
							// end
							_self.controller.setIsAdEnded(true);
							// exit fullscreen
							if(ua.OS === "iPhone/iPod"){
								$(domObject).get(0).webkitExitFullscreen();
							}else if(ua.OS === 'Android'){
								mediaElement.exitFullScreen(); // this doesnt work....
							}
						}, false);
						
						success(_self);
	        }
	    	});
			}
			return this;
		}
	});
})(mr.ui, mr.$, mr.ua);