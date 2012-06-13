/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Questions clas
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 *
 */
(function(ns, $){
	ns.Questions = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:  ns.typeName('Questions'), 
		/**
		 * 
		 */
		tagName:   'div',
		/**
		 * 
		 */
		className:  ns.cls('questions'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			 _.bindAll(this, "reset", "add", "remove");
			 
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.collection.bind("reset",  this.reset);
        this.collection.bind("add",    this.add);
        this.collection.bind("remove", this.remove);
			}
		},
		/**
		 * 
		 */
		render:     function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// same as reset
			this.reset(this.collection);
				
			return this;
		},
		/**
		 * reset method
     * @param {Object} collection
		 */
		reset:      function (collection) {
			ns.trace(this.typeName + '#reset()');
			
			collection.each(function (model) {
				this.add(model); 
			}, this);
    },
    /**
     * 
     * @param {Object} model
     */
    add:        function (model) {
    	ns.trace(this.typeName + '#add()');
    	
			(new ns.Question({ 
				model: 	model,
				el:     $(ns.slctr('question') + ns.slctr('template'), this.el).clone().appendTo($(this.el)).get(0)
			})).render();
    },
    /**
     * 
     * @param {Object} model
     */
    remove:     function (model) {
    	ns.trace(this.typeName + '#remove()');
    	
			model.destroy();
    }
	});
	
})(mr.ui, mr.$);