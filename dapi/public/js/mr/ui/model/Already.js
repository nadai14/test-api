/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already view-model class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Already.js 385 2012-06-29 14:28:31Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 23:28:31 +0900 (金, 29 6 2012) $
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