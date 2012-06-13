/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Controller Base Class
 * 
 * JavaScript (ECMAScript)
 *
 * @author			 Li Minghua
 * @author			 George Lu
 * @author			 Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version			$Id: Controller.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
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
			
			// setup model 
			var _self = this;
			this.model = options.model;
			if(this.model.has('ad')) {
				this.model.get('ad').on('change:playing', function(){
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
				}, this);
			}
			// start history
			Backbone.history.start();
		},
		/**
		 * start
		 */
		start: function() { 
			ns.trace(this.typeName + '#start()');
			
			// @ link http://backbonejs.org/#Router-navigate
			if(this.model.get('parameter').has('mid')) {
				if(this.model.get('parameter').get('already') === 1) {
					this.navigate("already/" + this.model.get('parameter').get('mid'), {trigger: true});
				}else{
					this.navigate("campaign/" + this.model.get('parameter').get('mid'), {trigger: true});	
				}
			}else{
				this.navigate("sorry/100", {trigger: true});
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