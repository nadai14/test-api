/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already view-model class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: CountDown.js 146 2012-06-11 08:17:50Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-11 17:17:50 +0900 (月, 11 6 2012) $
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