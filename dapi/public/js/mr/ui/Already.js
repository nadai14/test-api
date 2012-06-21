/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Already.js 256 2012-06-20 10:04:17Z liminghua772 $
 *
 * Last changed: $LastChangedDate: 2012-06-20 19:04:17 +0900 (Wed, 20 Jun 2012) $ by $Author: liminghua772 $
 *
 */
(function(ns, $){
	ns.Already = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Already'), 
		/**
		 * 
		 */
		tagName: 'div',
		/**
		 * 
		 */
		className: ns.cls('already'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			 
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// render
			$(this.el).html(this.template({
				title:            'すでに動画視聴＆アンケートは完了しています。',
				message:          this.model.has('message') ? this.model.get('message') : '',
				client_url:       this.model.has('client_url') ? (this.model.get('client_url') != '' ? this.model.get('client_url') : '#') : '#',
				go_to_client_url: 'パートナーサイトへ移動する'
			}));
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);