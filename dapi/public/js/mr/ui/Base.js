/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Ui Base class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Base.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
  
  ns.Base = Backbone.View.extend({
    /**
     * typeName of this class
     */
    typeName: ns.typeName('Base'), 
    /**
     * 
     */
    initialize: function(){
      _.bindAll(this, 'show', 'cloneTemplate');
    },

    /**
     * 
     */
    render: function(){
      // nothing todo
    },
    /**
     * 
     */
    show:          function() {
      ns.trace(this.typeName + '#show()');
      
      $(this.el).removeClass(ns.cls('hidden'));
    },
    /**
		 * 
		 */
		hide:          function() {
			ns.trace(this.typeName + '#hide()');
			
			$(this.el).addClass(ns.cls('hidden'));
		},
		/**
		 * 
		 */
		cloneTemplate: function(selector) {
			selector = selector + ns.slctr('template');
			ns.trace(this.typeName + '#cloneTemplate(\"' + selector + '\")');
			
			return 
				$(selector, this.el).exists() ? 
					$(selector, this.el).clone().appendTo($(this.el)) : 
					null
		}
  });
  
	/**
     * 
     * @param {Object} classname
     * @return string fully qualified class name
     */
  ns.getCssClassName = function(classname) {
    return ns.namespace.replace('.', '-') + '-' + classname;
  };
  ns.cls = ns.getCssClassName;
  
  /**
   * returns selector for the classname  
    @param {Object} classname
   */
  ns.slctr = function(classname) {
    return '.' + ns.cls(classname);  
  };
  
  /**
   * extends $
   */
  $.fn.exists = function(){
    return this.length > 0;
  };
  
  
  /**
   * extends _(underscode)
   * @see http://documentcloud.github.com/underscore/#template
   */
  (function(_){
    _.templateSettings = {
      interpolate : /\{\{(.+?)\}\}/g
    };
  })(_);
  
})(mr.ui, mr.$);