/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 248 2012-06-17 08:57:27Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-17 17:57:27 +0900 (日, 17 6 2012) $
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
						"movie": _absUrl(model.get('movie'), ns.api)  
					}, {silent: true});
				}
				if(model.has('thumbnail')) {
					model.set({
						"thumbnail": _absUrl(model.get('thumbnail'), ns.api)  
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
	/**
	 * 
	 */
	var _absUrl = (function(){
    var wimg           = new Image();
    var work           = document.createElement('iframe');
    work.style.display ='none';
    document.body.appendChild(work);
    var wdoc           = work.contentWindow.document;
    return function( path, base){
      var url=path;
      if (!base) {
				wimg.src=path;
				url=wimg.src;
      } else {
				wdoc.open();
				wdoc.write('<head><base href="'+base+'" \/><\/head><body><img src="'+path+'" \/><\/body>');
				wdoc.close();
				url=wdoc.getElementsByTagName('img')[0].src;
      }
      return url;
    };
	})();
})(mr.model.v1, mr.$);