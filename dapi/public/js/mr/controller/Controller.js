/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Controller Base Class
 * 
 * JavaScript (ECMAScript)
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Controller.js 177 2012-06-14 06:12:48Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-14 15:12:48 +0900 (木, 14 6 2012) $ by $Author: tsuru $
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
				_self.navigate("sorry", {trigger: true});
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
						"thankyou": null,
						"complete": null,
						"campaign": campaign
					});
				},
				/**
				 * error
				 */
				error:  function() {
					this.navigate("sorry/" + id, {trigger: true});
				}
			});
		},
		/**
		 * 
		 */
		sorry:   function(id) {
			this.model.set({
				"sorry": new Backbone.Model()
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