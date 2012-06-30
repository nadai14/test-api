/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Link.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $
 *
 */
(function(ns, $){
	ns.Link = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Link'), 
		/**
		 * 
		 */
		tagName:    'button',
		/**
		 * 
		 */
		className:  ns.cls('link'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// keep the referecnt
			var _self = this;
			// initialize
			if(!$(this.el).hasClass(ns.cls('link'))) {
				$(this.el).addClass(ns.cls('link'))
			}
			// setup template
			this.template = _.template($(this.el).html());
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
			// render
			$(this.el).html(this.template({
				"title":      this.model.get('title'), 
				"client_url": this.model.get('client_url')
			}));
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);