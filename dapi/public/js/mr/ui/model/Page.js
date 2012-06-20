/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: CountDown.js 146 2012-06-11 08:17:50Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-11 17:17:50 +0900 (月, 11 6 2012) $
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
