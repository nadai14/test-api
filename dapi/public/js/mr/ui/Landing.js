/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Landing class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Landing.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Landing = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Landing'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('landing'),
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
			if($(this.el).hasClass(ns.cls('hidden'))) {
				$(this.el).removeClass(ns.cls('hidden'));
			}
			
			// render
			$(this.el).html(this.template({
				title:       this.model.get('title'),
				description: this.model.get('description')
			}));
			// return this
			return this;
		}
	});
	
})(mr.ui, mr.$);