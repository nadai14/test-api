/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Creative class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Creative.js 197 2012-06-15 01:25:17Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-15 10:25:17 +0900 (金, 15 6 2012) $ by $Author: tsuru $
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
			
			if(this.model.has('campaign')) {
				// render
				$('img', this.el)
					.attr('src', this.model.get('campaign').get('second_picture'));	
			}else{
				this.hide();
			}
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);