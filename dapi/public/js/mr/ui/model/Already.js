/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already view-model class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Already.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $
 *
 */
(function(ns){
	ns.Already = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName:  ns.typeName('Already'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults:  {
			"title":       'タイトル',
			"social":      'ソーシャルタグ',
			"client_url":  'URL',
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