/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Creative class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Creative.js 335 2012-06-23 11:35:55Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-23 20:35:55 +0900 (Sat, 23 Jun 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Creative = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Creative'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('creative'),
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
				"creative": (this.model.has('creative')) ? this.model.get('creative') : '' 	 
			}));
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);