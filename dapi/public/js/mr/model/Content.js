/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 * This class is ViewModel
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Content.js 160 2012-06-12 14:30:09Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-12 23:30:09 +0900 (火, 12 6 2012) $
 *
 */
(function(ns){
	ns.Content = Backbone.Model.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Content'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"parameter": new ns.Parameter(),
			"campaign":  null,
			"page":      null,
			"ad":        new Backbone.Model({
				"playing": false,
				"ended":   false
			}),
			"countdown":  new ns.CountDown({
				
			})
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			_.bindAll(this, "updatePageToNext");
			
		},
		/**
		 * 
		 */
		updatePageToNext: function(callback){
			var _self         = this;
			var _enq_id       = null;
			var _uuid         = null;
			if(this.has('page')) {
				var _page       = this.get('page');
				if(_page.has('next_page_id')) {
					
					_enq_id       = _page.get('enq_id');
					_uuid         = _page.get('next_page_id');
					
				}else{
					this.set({
						"complete": new Backbone.Model({
						            	"client_url": this.get('campaign').get('client_url')
						            })
					});
					return this;
				}
			}else{
				var _campaign   = this.get('campaign');
				_enq_id         = _campaign.get('enq_id');
				_uuid           = _campaign.get('first_page_id');
			}
			
			//	get page
			(new ns.root.model.Page({ 
				enq_id:         _enq_id,
				uuid:           _uuid
			})).fetch({
				/**
				 * success
				 */
				success: function(model, response) {
					_self.set({
						page: model 
					});
				},
				/**
				 * error
				 */
				error:   function() {
					// @TODO handle error
				}
			});
			return this;
		}
	});
})(mr.model);
