/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Landing class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Landing.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $
 *
 */
(function(ns){
	ns.Landing = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Landing'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":       'タイトル',
			"description": 'ディスクリプション',
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
