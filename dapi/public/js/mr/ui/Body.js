/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Body Class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Body.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $ by $Author: tsuru $
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
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			
			// set controller
			this.controller = options.controller;
			
			/* creates child components */
			if(0< $(ns.slctr('link'), this.el).size()) {
				// link(top)
				this.link_top = new ns.Link({
					controller: this.controller,
					model:      this.controller.models.link,
					el:         $(ns.slctr('link'), this.el).get(0)
				});
			}
			// ad
			this.ad       = new ns.Ad({
				controller: this.controller,
				model:      this.controller.models.ad,
				el:         $(ns.slctr('ad'), this.el)
			});
			// nav
			this.nav      = new ns.Nav({ 
				controller: this.controller,
				model:      this.controller.models.nav,
				el:         $(ns.slctr('nav', this.el)).exists()     ? $(ns.slctr('nav', this.el)).get(0) : null 
      }).render();
      // content
			this.content  = new ns.Content({
				controller: this.controller,
				model:      this.controller.models.content,
				el:         $(ns.slctr('content', this.el)).exists() ? $(ns.slctr('content', this.el)).get(0) : null
			});
			if(1 < $(ns.slctr('link'), this.el).size()) {
				// link(bottom)
				this.link_btm = new ns.Link({
					controller: this.controller,
					model:      this.controller.models.link,
					el:         $(ns.slctr('link'), this.el).get(1)
				});
			}
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
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
			// return
			return this;
		}
	});
})(mr.ui, mr.$);