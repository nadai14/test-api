/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Header class
 *
 * JavaScript
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Header.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns){
  ns.Header = ns.Base.extend({
    /**
     * typeName of this class
     */
    typeName: ns.typeName('Header'), 
    /**
     * 
     */
    tagName: 'div',
    /**
     * 
     */
    className: ns.getCssClassName('header'),
    /**
     * Constructor
     */
    initialize: function(){
      ns.trace(this.typeName + '#initialize()');
      
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
			
      if($('img', this.el).exists()) {
      	if (_url = $(this.el).css('background-image').match(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
    			$(this.el).css('background-image', 'none');
    			$('img', this.el).attr('src', _url);
    			$(this.el).show();
				}
			}
			
      return this;
    }
  });
})(mr.ui);