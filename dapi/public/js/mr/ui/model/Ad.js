/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Theme view model class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Ad.js 387 2012-07-02 01:40:49Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-07-02 10:40:49 +0900 (月, 02 7 2012) $
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
			"movie":      null,
			"movies":     null,
			"creative":   null,
			"timeout":    null
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
