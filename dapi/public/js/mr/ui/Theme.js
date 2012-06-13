/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Theme class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Ad.js 117 2012-06-09 07:30:14Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-09 16:30:14 +0900 (土, 09 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Theme = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Theme'), 
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			
			this.header = options.header;
			this.footer = options.footer;
			
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
			
			if(this.model.has('campaign')) {
				
				var _campaign = this.model.get('campaign'); 
				// load css
				if(_campaign.has('css')) {
					if($('#mr-ui-theme').exists()) {
						var link = $('#mr-ui-theme').get(0); 
						link.setAttribute("href",      _campaign.get('css'));
					}else{
						var link = document.createElement("link");
						link.setAttribute("id",        "mr-ui-theme");
						link.setAttribute("data-role", "theme");
						link.setAttribute("rel",       "stylesheet");
						link.setAttribute("type",      "text/css");
						link.setAttribute("href",      _campaign.get('css'));
						document.getElementsByTagName("head")[0].appendChild(link);
					}
					
					// @TODO 
					var _self = this;
					setTimeout(function(){
						_self.header.render();
						_self.footer.render();			
					}, 100);
				}
			}
			
			
			
			// return this
			return this;
		},
		
	});
		
})(mr.ui, mr.$);