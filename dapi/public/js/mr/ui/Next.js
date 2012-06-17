/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Next.js 228 2012-06-15 14:13:17Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-15 23:13:17 +0900 (金, 15 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Next = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Next'), 
		/**
		 * 
		 */
		tagName:    'button',
		/**
		 * 
		 */
		className:  ns.cls('next'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// initialize
			if(!$(this.el).hasClass(ns.cls('next'))) {
				$(this.el).addClass(ns.cls('next'))
			}
			
			// event
			var _self = this;
			$(this.el).live('click', function(e){
				_self.trigger('click');
			});
				
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
			
			// properties
			if(this.model.has('countdown')) {
				if(this.model.get('countdown').get('finished')) {
					if($(this.el).hasClass(ns.cls('countdown-counting'))) {
						$(this.el).removeClass(ns.cls('countdown-counting'));
					}
					$(this.el).removeAttr('disabled', null);
				}else{
					if(!$(this.el).hasClass(ns.cls('countdown-counting'))) {
						$(this.el).addClass(ns.cls('countdown-counting'));
					}
					$(this.el).attr('disabled', 'disabled');
				}
			}
			
			// render
			$(this.el).text(this.model.get('title'));
			
			// return this
			return this;
		},
		/**
		 * 
		 */
		startCountDown: function()  {
			if(this.model.has('countdown')) {
				this.model.get('countdown').startCountDown();
			}
		}
	});
})(mr.ui, mr.$);