/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $
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
			
			return ns.api + '/campaigns/' + this.get('uuid'); 
		},
		/**
		 * 
		 */
		idAttribute: "uuid",
	});
	
})(mr.model.v1, mr.$);
