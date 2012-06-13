/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Canvas class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Canvas.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Canvas = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Canvas'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('canvas'),
		
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			
			// header 
			this.header  = new ns.Header({ 
				model:     this.model,
				el:        $(ns.slctr('header'), this.el)
			});
			// body
			this.body    = new ns.Body({
				model:     this.model, 
				el:        $(ns.slctr('body'), this.el)
			});
			// footer
			this.footer  = new ns.Footer({ 
				model:     this.model,
				el:        $(ns.slctr('footer'), this.el)
			});
			//theme
			this.theme   = new ns.Theme({ 
				header:    this.header,
				footer:    this.footer,
				model:     this.model
			});
			// catch player event & cascade
			this.body.on('play:ad', function(e) { 
				this.trigger('play:ad'); 
			}, this);
			this.body.on('click:next', function(e) {
				this.trigger('click:next');
			}, this);
		},

		/**
		 * Render
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			return this;
		},
		
	});
	
})(mr.ui, mr.$);