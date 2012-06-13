/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 *
 */
(function(ns){
	ns.Next = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('CountDown'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":     '次へ',
			"countdown": null,
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// set default
			this.set({
				"_title": this.get('title'),
				"title" : this.has('countdown') ? this.get('countdown').get('count') + ' 秒' : this.get('title') 
			}, {silent: true});
			//
			if(this.has('countdown')) {
				// count
				this.get('countdown').on('change:count', function(){
					this.set({
						"title": this.get('countdown').get('count') + ' 秒' 
					});
				}, this);
				// 
				this.get('countdown').on('change:finished', function(){
					this.set({
						"title": this.get('_title') 
					});
				}, this);
			}
		},
		/**
		 * 
		 */
		startCountDown: function() {
			if(this.has('countdown')) {
				this.get('countdown').start();
			}
			return this;
		}
	});
})(mr.model);
