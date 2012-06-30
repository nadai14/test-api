/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Timeout class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Timeout.js 381 2012-06-29 10:39:16Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 19:39:16 +0900 (金, 29 6 2012) $
 *
 */
(function(ns){
	ns.Timeout = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('Timeout'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"title":       '制限時間内にアンケートの回答がありませんでした。',
			"description": 'もう一度CMをみて10秒以内にアンケートをスタートして下さい。',
			"back":        'javascript:location.reload();'
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