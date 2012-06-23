/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Next class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Next.js 331 2012-06-22 09:36:26Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:36:26 +0900 (金, 22 6 2012) $
 *
 */
(function(ns){
	ns.Next = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Next'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":     '次へ'
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
