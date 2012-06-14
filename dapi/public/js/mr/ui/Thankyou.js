/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Thankyou class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Thankyou.js 160 2012-06-12 14:30:09Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-12 23:30:09 +0900 (火, 12 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Thankyou = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Thankyou'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('thankyou'),
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
				"title":       'おめでとうございます！',
				"point":       this.model.get('point'),
				"message":     this.model.get('message'),
				"client_url":  this.model.has('client_url') ? this.model.get('client_url') : '#' 
			}));
			
			// open client site 
    	if(this.model.has('client_url')) {
    		var _url = this.model.get('client_url');
    		(function(_url) {
	    		window.setTimeout(function(){
	    				window.open(_url);
	    		}, 500);
				})(_url);
    	}
    	
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);