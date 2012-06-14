/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 160 2012-06-12 14:30:09Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-12 23:30:09 +0900 (火, 12 6 2012) $
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
		url: function() {
			ns.trace(this.typeName + '#url()');
			
			return ns.api + '/campaigns/' + this.get('uuid') + '?v=' + (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
		},
		/**
		 * 
		 */
		idAttribute: "uuid",
	});
	
})(mr.model.v1, mr.$);
