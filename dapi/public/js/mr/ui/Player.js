/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Player class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Player.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Player = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Player'), 
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
		initialize: function(){
			
			var _self = this;
			
			// setup attributes
			$(this.el)
				.attr('preload',   'auto')
				.attr('controls',  'controls')
				// .attr('poster', 'images/poster-pc.jpg')
				.addClass('video-js')
				.addClass('vjs-default-skin');
			
			// video.js
			
			var _player = _V_(this.el)
				.ready(function() {
					_self.el     = this.tag.parentElement;
					_self.player = this;
					if(_self.onReady) {
						_self.onReady();
					}
				});
			_player.addEvent('play', function(e) {
					_self.model.get('ad').set({
						"playing": true
					});
			});
			_player.addEvent('error', function(e) {
					ns.trace(e);
					ns.trace(e.type.detail);		
					for(p in e.type) {
						ns.trace(p);
					}
				});
			
			// set event handler if model exists
			if(this.model) {
				this.model.on('change:campaign', this.render, this);
			}
		},
		/**
		 * render
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// remove template
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// render
			if(this.model.has('campaign')) {
				var _campaign = this.model.get('campaign');
				$('video', this.el)
					.attr('poster', _campaign.has('thumbnail') ? _campaign.get('thumbnail') : null);
					
				if('undefiend' !== typeof(this.player) ) {
					this.player.src(_campaign.has('movie')     ? _campaign.get('movie')     : null);
				}
			}
			
			return this;
		}
	});
	
})(mr.ui, mr.$);