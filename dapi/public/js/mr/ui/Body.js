/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Body Class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Body.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Body = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Body'), 
		/**
		 * 
		 */
		tagName:   'div',
		/**
		 * 
		 */
		className:  ns.cls('body'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			/* creates child components */
			// ad
			this.ad      = new ns.Ad({
				model:     this.model, 
				el:        $(ns.slctr('ad', this.el)).exists()      ? $(ns.slctr('ad', this.el)).get(0) : null
			});
			// nav
			this.nav    = new ns.Nav({ 
				model:     this.model,
				el:        $(ns.slctr('nav', this.el)).exists()     ? $(ns.slctr('nav', this.el)).get(0) : null 
      });
      // content
			this.content = new ns.Content({
				model:     this.model,
				el:        $(ns.slctr('content', this.el)).exists() ? $(ns.slctr('content', this.el)).get(0) : null
			});
			
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
			// catch player event & cascade
			this.ad.on('play:ad', function(e) { 
				this.trigger('play:ad');
			}, this);
			this.content.on('click:next', function(e) { 
				this.trigger('click:next');
			}, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// remove template
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
				
			return this;
		},
		
	});
	
})(mr.ui, mr.$);