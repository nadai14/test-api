/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Theme view model class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 *
 */
(function(ns){
	ns.Ad = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Ad'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"poster":     null,
			"video":      null,
			"creative":   null,
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
