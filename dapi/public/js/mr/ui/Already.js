/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Already class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Already.js 385 2012-06-29 14:28:31Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 23:28:31 +0900 (金, 29 6 2012) $ by $Author: tsuru $
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
			this.model.on('change', this.render, this);
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
				title:            this.model.get('title'),
				social:           this.model.get('social'),
				client_url:       this.model.get('client_url'),
				button_title:     this.model.has('button_title') ? this.model.get('button_title') : 'CMのサイトを開く'
			}));
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);