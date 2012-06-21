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
				// $(this.el).attr('poster', this.model.get('poster'));
			}
			// video
			if(this.model.has('video')) {
				
				ns.trace(this.typeName + '#_render():' + this.model.get('video'));
				// set source
				var _$source = $('<source>').attr('src', this.model.get('video'));
				$(this.el).attr('src', this.model.get('video'));
				if(0 <= this.model.get('video').indexOf('m3u8')) {
					_$source.attr('type', 'application/x-mpegURL');
				}
				_$source.appendTo($(this.el));
				
				$('<object>')
					.attr('width',  _$source.attr('width'))
					.attr('height', _$source.attr('height'))
					.attr('type',   'application/x-shockwave-flash')
					.attr('data',   'flashmediaelement.swf?v=3')
					// .attr('data',   'js/libs/flvplayer.swf')
					.append($('<param>').attr('name', 'movie').attr('value', 'flashmediaelement.swf?v=3'))
					// .append($('<param>').attr('name', 'movie').attr('value', 'js/libs/flvplayer.swf'))
					.append($('<param>').attr('name', 'flashvars').attr('value', 'controls=true&amp;file=' + this.model.get('video')))
					.append($('<param>').attr('name', 'allowfullscreen').attr('value', 'true'))
					.appendTo(_$source);
							
				// mediaelement
				var _player = $(this.el).mediaelementplayer({
				// var _player = new MediaElement(this.el, {
					// flashName:                '../flvplayer.swf',
					flashName:                'flashmediaelement.swf?v=3',
					features:                 ['playpause', 'current', 'duration', 'fullscreen'],
					loop:                     false,
					alwaysShowControls:       true,
					usePluginFullScreen:      true,
					enablePluginDebug:        false,
					// alwaysShowControls:       false,
  				// AndroidUseNativeControls: false,
					success:                  function (mediaElement, domObject) {
						if(0 < this.model.get('video').indexOf('flv')) {
							$('.mejs-overlay-play').css('display', 'nonde');
						}
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
							// mediaElement.setVideoSize($(document).width(), $(document).height());
							// mediaElement.enterFullScreen();
							if(ua.OS === 'Android') {
							}
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
							// end
							_self.controller.setIsAdEnded(true);
							// exit fullscreen
							if(ua.OS === "iPhone/iPod" || ua.OS === 'Android'){
								$(domObject).get(0).webkitExitFullscreen();
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