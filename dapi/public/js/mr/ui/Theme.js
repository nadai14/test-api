/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Theme class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Theme.js 252 2012-06-20 01:33:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 10:33:15 +0900 (水, 20 6 2012) $ by $Author: tsuru $
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
			// 
			var _self     = this;
			
			var _link = null;
			if(!$('#mr-ui-theme').exists()) {
				_link = document.createElement("link");
				_link.setAttribute("id",        "mr-ui-theme");
				_link.setAttribute("data-role", "theme");
				_link.setAttribute("type",      "text/css");
				_link.setAttribute("rel",       "stylesheet");
				document.getElementsByTagName("head")[0].appendChild(_link);
			}else{
				_link      = $('#mr-ui-theme').get(0);
				_link.href = null;
			}
				
			// load css
			if(this.model.has('css')) {
				// set css
				_link.href = this.model.get('css');
			}else{
				_link.href = 'css/' + ((ua.OS === "iPhone/iPod" || ua.OS === "Android") ? 'sp' : 'pc') + '/themes/default-1/style.css'
			}
				
			// wait for load
			(function(_cnt){
				if(_cnt > 20) return false; // 10 秒まで
				var _callee = arguments.callee;
				var _bg = $(_self.header.el).css('background-image');
				if(_bg === 'none') setTimeout(function(){ _callee(++_cnt); }, 50);
				else _self.header.render();
			})(0);
			(function(_cnt){
				if(_cnt > 20) return false; // 10 秒まで
				var _callee = arguments.callee;
				var _bg = $(_self.footer.el).css('background-image');
				if(_bg === 'none') setTimeout(function(){ _callee(++_cnt); }, 50);
				else _self.footer.render();
			})(0);
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);