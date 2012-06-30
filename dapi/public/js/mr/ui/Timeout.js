/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Sorry class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Timeout.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $
 *
 */
(function(ns, $){
	ns.Timeout = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Timeout'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('timeout'),
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
				"title":       this.model.has('title')       ? this.model.get('title')       : 'タイムアウト',
				"description": this.model.has('description') ? this.model.get('description') : 'タイムアウトしました。',
				"back":        this.model.has('back')        ? this.model.get('back')        : ''  
			}));
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);