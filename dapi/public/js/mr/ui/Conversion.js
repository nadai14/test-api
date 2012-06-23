/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Converison class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Conversion.js 330 2012-06-22 09:36:05Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:36:05 +0900 (Fri, 22 Jun 2012) $
 *
 */
(function(ns, $){
	ns.Conversion = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Conversion'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('conversion'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			 
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change:conversion', this.render, this);
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
			
			if(this.model.has('conversion')) {
				$(this.el).html(this.model.get('conversion'));
			}else{
				this.hide();
			}
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);