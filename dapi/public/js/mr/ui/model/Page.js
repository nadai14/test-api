/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 329 2012-06-22 09:32:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:32:46 +0900 (金, 22 6 2012) $
 *
 */
(function(ns){
	ns.Page = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Page'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"page":    null,
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
