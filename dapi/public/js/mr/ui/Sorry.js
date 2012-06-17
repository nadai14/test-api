/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Sorry class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 *
 */
(function(ns, $){
	ns.Sorry = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Sorry'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('sorry'),
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
				"title":     this.model.has('title') ? this.model.get('title') : '申し訳ございません',
				"message":   this.model.has('message') ? this.model.get('message') : '',
				"back":      this.model.has('back') ? this.model.get('back') : ''  
			}));
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);