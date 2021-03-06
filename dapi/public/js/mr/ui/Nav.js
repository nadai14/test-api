/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Nav class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Nav.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Nav = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Nav'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('nav'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// set controller
			this.controller = options.controller;
			// setup template
			this.template = _.template($(this.el).html());
			// bind events
			this.model.on('change', this.render, this);
		},
		/**
		 * render method
		 */
		render:      function(){
			ns.trace(this.typeName + '#render()');
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			// render
			$(this.el).html(this.template({ 
				html : this.model.get('html')
			}));
			// return
			return this;
		}
	});
})(mr.ui, mr.$);