/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 252 2012-06-20 01:33:15Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-20 10:33:15 +0900 (水, 20 6 2012) $
 *
 */
(function(ns, $){
	ns.Campaign = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:    ns.typeName('Campaign'), 
		/**
		 * 
		 */
		idAttribute: "uuid",
		/**
		 * 
		 */
		url:         function() {
			ns.trace(this.typeName + '#url()');
			return ns.api + '/campaigns/' + this.get('uuid')  + '?v=' + (((1+Math.random())*0x10000000)|0).toString(16).substring(1); 
		},
		/**
     * fecth method
     * @param {Object} options
     */
    fetch:       function(options) {
    	ns.trace(this.typeName + '#fetch()');
			
			options || (options = {});
    	var _success    = options.success;
    	options.success = function(model, response) {
  			ns.trace(model.typeName + '#fetch()#success');
  			/**
  			 * resolve URL
  			 * @see http://redmine.sunbi.co.jp/issues/1881
  			 */
  			var _attributes = ['css', 'movie', 'thumbnail', 'second_picure'];
  			for(var i = 0; i < _attributes.length; ++i){
  				var _attribute = _attributes[i];
  				if(model.has(_attribute)) {
						model.set(_attribute, ns.absUrl(ns.api, model.get(_attribute)));
					}	
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