/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Answer class
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
	ns.Answer = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Answer'), 
		/**
		 * 
		 */
		defaults: {
			"type":        "Answer",
			"enq_id":      null,
			"enq_page_id": null,
			"campaign_id": null,
			"session_id":  null,
			"uid":         null,
			"key":         null,
		},
		/**
		 * 
		 */
		url: function() {
			ns.trace(this.typeName + '#url()');
			
			return ns.api + '/enqs/' + this.get('enq_id') + '/pages/' + this.get('enq_page_id') + '/campaigns/' + this.get('campaign_id') + '/answers';     
		}
	});
})(mr.model.v1, mr.$);