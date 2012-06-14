/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Ad class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Ad.js 160 2012-06-12 14:30:09Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-12 23:30:09 +0900 (火, 12 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Ad = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Ad'), 
		/**
		 * 
		 */
		tagName:   'div',
		/**
		 * 
		 */
		className:  ns.cls('ad'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// creates child components
			this.player   = new ns.Player({ 
				model:      this.model,
				el:         $(ns.slctr('player'), this.el)
			});
			// creative container
			this.creative = new ns.Creative({ 
				model:      this.model,
				el:         $(ns.slctr('creative'), this.el)
			});
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
			
			if(this.model.has('complete')) {
				if(this.model.get('campaign').has('second_picture')) {
					this.player.hide();
					this.creative.show();
				}else{
					this.creative.hide();
					this.player.show();
				}
			}else if(this.model.has('campaign')) {
				this.creative.hide();
				this.player.show();	
			}
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);