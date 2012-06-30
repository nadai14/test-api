/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Thankyou class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Thankyou.js 385 2012-06-29 14:28:31Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 23:28:31 +0900 (金, 29 6 2012) $
 *
 */
(function(ns){
	ns.Thankyou = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Thankyou'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":        null,
			"description":  null,
			"social":       null,
			"client_url":   null,
			"button_title": null
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
		}
	});
})(mr.ui.model);
