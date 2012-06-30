/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: PlayerPC.js 379 2012-06-29 08:36:16Z liminghua772 $
 *
 * Last changed: $LastChangedDate: 2012-06-29 17:36:16 +0900 (金, 29 6 2012) $ by $Author: liminghua772 $
 *
 */
(function(ns, $, ua){
	ns.PlayerPC = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('PlayerPC'), 
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
				var _mode     = 'auto'; // (ua.OS === 'Android' && ns.isFlashAvailable()) ? 'shim' : 'auto';
				var _features = []; // ['playpause', 'fullscreen']; // ['playpause', 'current', 'duration', 'fullscreen'];
				// set source (main)
				_$video
					.attr('type',   _movie.mime_type)
					.attr('src',    _movie.src)
					.attr('poster', _poster);/*
					.attr('preload', "auto");*/
				// fallback sources
				for(var m = 0; m < _movies.length; ++m) {
					var _movie   = _movies[m];
					var _$source = $('<source>')
						.attr('type', _movie.mime_type)
						.attr('src', _movie.src)
						.appendTo(_$video);	
				}	
				// determine features
				if(ua.OS !== 'iPhone/iPod' && ua.OS !== 'iPad' && ua.OS !== 'Android') {
					// _features = ['playpause'];
				}
				// debug out put
				ns.trace(this.typeName + '#render():' + _$video.parent().html());
				// mediaelement
				var _player = $(this.el).mediaelementplayer({
					flashName:                'mr-player.swf?v=201206251139',
					mode:                     _mode,
					features:                 _features,
					loop:                     false,
					alwaysShowControls:       false,
					// usePluginFullScreen:      true,
					enablePluginDebug:        false,
					enableAutosize:           true,  // @see  http://redmine.sunbi.co.jp/issues/1947
					enablePluginSmoothing:    true,
  				// AndroidUseNativeControls: false,
					success:                  function (mediaElement, domObject) {
						// 
						_self.el = $(domObject).closest('.mejs-container').get(0);
						
						
						mediaElement.addEventListener('progress', function(e) {
							ns.trace('progress');
						}, false);
						mediaElement.addEventListener('loadedmetadata', function(e) {
							ns.trace('loadedmetadata:mediaElement.duration:' + mediaElement.duration);
							// _self.controller.setAdDuration(mediaElement.duration);
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
						}, false);
						
						success(_self);
	        }
	    	});
			}
			return this;
		}
	});
})(mr.ui, mr.$, mr.ua);