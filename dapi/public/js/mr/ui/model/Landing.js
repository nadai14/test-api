/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Landing class
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Landing.js 392 2012-07-02 07:04:48Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-07-02 16:04:48 +0900 (月, 02 7 2012) $
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
			"remarks":     '動画視聴完了後、20 秒以内にアンケート回答をスタートしないとポイントをもらえません。'
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
