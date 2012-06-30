/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Complete.js 381 2012-06-29 10:39:16Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 19:39:16 +0900 (金, 29 6 2012) $
 *
 */
(function(ns){
	ns.Complete = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Complete'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"conversion_tag":  null,
			"client_url":      null,
			"button_title":    '',
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
