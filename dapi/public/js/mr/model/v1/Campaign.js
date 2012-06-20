/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 251 2012-06-19 19:57:07Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 04:57:07 +0900 (水, 20 6 2012) $
 *
 */
(function(ns, $){
	ns.Campaign = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Campaign'), 
		/**
		 * 
		 */
		defaults: {
			"type":  "Campaign",
		},
		/**
		 * 
		 */
		idAttribute: "uuid",
		/**
		 * 
		 */
		url: function() {
			ns.trace(this.typeName + '#url()');
			
			return ns.api + '/campaigns/' + this.get('uuid')  + '?v=' + (((1+Math.random())*0x10000000)|0).toString(16).substring(1); 
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
  			// resolve URL
				if(model.has('movie')) {
					model.set({
						"movie": ns.absUrl(ns.api, model.get('movie'))  
					}, {silent: true});
				}
				if(model.has('thumbnail')) {
					model.set({
						"thumbnail": ns.absUrl(ns.api, model.get('thumbnail'))  
					}, {silent: true});
				}
  			// call original
  			if('function' === typeof(_success)) {
  				_success(model, response);
  			}
    	};
			return ns.Base.prototype.fetch.call(this, options);
		},
	});
})(mr.model.v1, mr.$);