/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Controller Base Class
 * 
 * JavaScript (ECMAScript)
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Controller.js 228 2012-06-15 14:13:17Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-15 23:13:17 +0900 (金, 15 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
	ns.Controller = Backbone.Router.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Controller'), 
		/**
		 * Routing rules
		 */
		routes: {	
			"":                      "start",
			"campaign/:id":          "campaign",
			"already/:id":           "already",
			"sorry/:id":             "sorry",
		},
		/**
		 * initialize
		 *
		 * @see http://backbonejs.org/#Collection-constructor 
		 */
		initialize: function(options) {
			ns.trace(this.typeName + '#initialize()');
			
			this.model = options.model;
			
			// setup model 
			var _self = this;
			
			/**
			 * error handler
			 */
			ns.root.handleError = function(message) {
				ns.trace(ns.namespace + '#handleError("' + message + '")');
				
				_self.message = message;
				_self.navigate("sorry/404", {trigger: true});
			}
			
			if(this.model.has('ad')) {
				this.model.get('ad').on('change:playing', function(){
					
					if(ns.face === 'PC') {
						
						var _campaign = this.model.get('campaign');
						var _page     = this.model.get('page');
						// starting countdown
						this.model.get('countdown').set({
							count: (_page || _campaign).get('wait_until')
						}).start().on('change', function(){
							if(this.model.get('countdown').get('finished')) {
								this.model.updatePageToNext();
							}
						}, this);
							
					}else{
						this.model.get('ad').on('change:ended', function(){
							this.model.updatePageToNext();
						}, this);
					}
					
				}, this);
			}
			// start history
			Backbone.history.start();
			// this.start();
		},
		/**
		 * start
		 */
		start: function() { 
			ns.trace(this.typeName + '#start()');
			
			// @ link http://backbonejs.org/#Router-navigate
			if(this.model.get('parameter').has('mid')) {
				if(this.model.get('parameter').get('already') === 1) {
					this.navigate("already/" + this.model.get('parameter').get('mid'),  { trigger: true, replace: true });
				}else{
					this.navigate("campaign/" + this.model.get('parameter').get('mid'), { trigger: true, replace: true });	
				}
			}else{
				this.navigate("sorry", {trigger: true, replace: true});
			}
		},
		/**
		 * campaign route
		 */
		campaign: function(id) {
			ns.trace(this.typeName + '#campaign("' + id + '")');
			
			// pre check model
			var _self = this;
			
			// fetch data
			(new ns.root.model.Campaign({ uuid: id })).fetch({
				/**
				 * success
				 */
				success: function(campaign, response) {
					
					// update view model
					// this fires 'chenge' event
					_self.model.set({
						"sorry":      null,
						"thankyou":   null,
						"complete":   null,
						"conversion": null,  
						"campaign":   campaign
					});
				},
				/**
	       * 
	 			 * @param {Object} xhr
	 			 * @param {Object} textStatus
	 			 * 
	 			 * @see http://redmine.sunbi.co.jp/issues/1770
	       */
	      error:  function(xhr, textStatus){
	      	var _message = 'データ取得時にエラーが発生しました';
	  			switch(xhr.status) {
	  				case 401:
	  					// 認可されていない UnauthorizedException 401
	  				case 403:
	  					// 状態が入稿前 ForbiddenException 403
							// 状態が終了 ForbiddenException 403
	  				case 404:
	  					// アンケートIDが存在しない NotFoundException 404
							// ページIDが存在しない NotFoundException 404
							// アンケートIDとページIDが矛盾している NotFoundException 404
							// アンケートページと回答の設問番号が矛盾している NotFoundException 404
	  					var _data    = { message:   _message };
	  					try { _data = $.parseJSON(xhr.responseText); }catch(ex){}
	  					try { _message = ('undefined' !== typeof(_data)) ? _data.message : _message; }catch(ex){}
	  					break;
	  			}
	  			var _handler = (ns.handleError || ns.root.handleError || function(mesasge) {  ns.alert(message); });
	  			_handler(_message);
				}
			});
		},
		/**
		 * sorry
		 */
		sorry:   function(id) {
			ns.trace(this.typeName + '#sorry()');
			
			var _url = location.href;
			_url     = (-1 < _url.indexOf('#')) ? _url.substring(0, _url.indexOf('#')) : _url;
			this.model.set({
				"sorry": new Backbone.Model({
				         	message: this.message,
				         	back:    _url
				         })
			});
		},
		/**
		 * already 
		 */
		already: function(id) {
			ns.trace(this.typeName + '#already("' + id + '")');
      
      // same as campaign
      this.campaign(id);
    }
	}); 
})(mr.controller);