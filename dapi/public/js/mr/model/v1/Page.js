/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page model class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
  ns.Page = ns.Base.extend({
    /**
     * typeName of this class
     */
    typeName: ns.typeName('Page'), 
    /**
     * 
     */
    defaults: {
      "type":  "Page",
    },
    /**
     * 
     */
    idAttribute: "uuid",
    /**
     * url method
     */
    url: function() {
    	ns.trace(this.typeName + '#url()');
    	
      return ns.api + '/enqs/' + this.get('enq_id') + '/pages/' + this.get('uuid')
    },
    /**
     * fecth method
     * @param {Object} options
     */
    fetch: function(options) {
    	ns.trace(this.typeName + '#fetch()');
    	
    	options || (options = {});
    	var _success    = options.success;
    	options.success = function(model, response) {
  			ns.trace(model.typeName + '#fetch()#success()');
  					
  			// set questions 
  			var _org = model.get('questions');
  			var _new = new Array(_org.length);
  			for(var i = 0; i < _org.length; ++i){
  				_new[i] = new ns.Question(_org[i]);
  			}
  			
  			// replace
  			model.set({ questions: new ns.Questions(_new) }, { silent: true });
  			
  			// call original
  			if('function' === typeof(_success)) {
  				_success(model, response);
  			}
    	};
    	
			return ns.Base.prototype.fetch.call(this, options);
		},
		/**
		 * 
		 */
		containsQuiz: function() {
			return this.has('questions') ? this.get('questions').containsQuiz() : false;
		},
		/**
		 * 
		 */
		containsRequired: function() {
			return this.has('questions') ? this.get('questions').containsRequired() : false;
		}
  });
  
})(mr.model.v1, mr.$);