/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Campaign class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Campaign.js 381 2012-06-29 10:39:16Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 19:39:16 +0900 (金, 29 6 2012) $
 *
 */
(function(ns, $, ua){
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
			return ns.api + '/campaigns/' + this.get('uuid')  + '?v=' + ns.v();
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
				 * @see http://redmine.sunbi.co.jp/issues/1777
				 */
				if(model.has('client_url')){
					ns.trace(model.typeName + '#fetch()#success/1777');
					var _url = model.get('client_url');
					var _uid = ns.getParameter('uid');
					if(_uid) {
						_url   += ((_url.indexOf('?') < 0) ? '?' : '&') + 'uid=' + _uid;
						model.set({
							"client_url": _url
						});
					}
				}
				/**
				 * resolve URL
				 * @see http://redmine.sunbi.co.jp/issues/1881
				 * @see http://redmine.sunbi.co.jp/issues/1943
				 */
				ns.trace(model.typeName + '#fetch()#success/1881,1943');
				var _attributes = ['css', 'thumbnail', 'second_picture', 'movies'];
				for(var i = 0; i < _attributes.length; ++i){
					var _attribute = _attributes[i];
					if(model.has(_attribute)) {
						switch(_attribute) {
							case 'movies':
								var _movies = model.get(_attribute);
								for(var m = 0; m < _movies.length; ++m) {
									_movies[m].src = ns.absUrl(ns.api, _movies[m].src);
									if(_movies[m].mime_type) {
										_movies[m].type = ns.absUrl(ns.api, _movies[m].mime_type);	
									}
								}  
								break;
							default:
								model.set(_attribute, ns.absUrl(ns.api, model.get(_attribute)));
								break;
						}
					}	
				}
				/**
				 * build description
				 * @see http://redmine.sunbi.co.jp/issues/1880
				 */
				if(model.has('description')){
					ns.trace(model.typeName + '#fetch()#success/1880');
					model.set('description', _.template(ns.mustachize(model.get('description')))({ 
						"point": model.get('point')
					}));
				}
				/**
				 * http://redmine.sunbi.co.jp/issues/1985
				 * http://redmine.sunbi.co.jp/issues/1987
				 */
				if(model.has('conversion_tag')){
					ns.trace(model.typeName + '#fetch()#success/1987');
					model.set('conversion_tag', ns.mustachize(model.get('conversion_tag')));
					ns.trace(model.typeName + '#fetch()#success/1987#' + model.get('conversion_tag'));
				}
				/**
				 * movie fallbacks
				 * @see http://redmine.sunbi.co.jp/issues/1910 
				 */
				if(model.has('movies')) {
					ns.trace(model.typeName + '#fetch()#success/1910');
					var _types = [
						'video/3gpp',             // .3gp
						'video/quicktime',        // .mov
						'video/mp4',              // .mp4
						'video/x-flv',            // .flv
						'application/x-mpegURL'   // .m3u8
					];
					if(ua.OS === 'Android') {
						if (ns.isFlashAvailable()) {
					  	_types = ['video/x-flv', 'video/mp4', 'video/3gpp'];
					  	// _types = ['video/3gpp', 'video/mp4', 'video/x-flv'];
						}else{
					  	_types = ['video/mp4', 'video/3gpp'];
						}
					}else if(ua.OS === 'iPhone/iPod' || ua.OS === 'iPad') {
						if(/OS 4/.test(window.navigator.userAgent)) {
							_types = ['video/quicktime', 'video/mp4', 'application/x-mpegURL'];
						}else{
							_types = ['application/x-mpegURL', 'video/quicktime', 'video/mp4'];	
						}
					}else{
						_types = ['video/mp4', 'video/x-flv'];
					}
					ns.trace(model.typeName + '#fetch()#success/1910# avalable movie types : ' + ns.stringify(_types));
					// detect best format
					var _movies = model.get('movies');
					var _movies_sorted = Array();
					for(var t = 0; t < _types.length; ++t) {
						var _type = _types[t];
						for(var m = 0; m < _movies.length; ++m) {
							var _movie = _movies[m];
							if(_movie.mime_type === _type) {
								// set main movie
								if(!model.has('movie')) {
									// set movie
									model.set('movie', _movie);
								}
								// sort movie
								_movies_sorted.push(_movie);
							}
						}
					}
					/**
					 * @see http://redmine.sunbi.co.jp/issues/1991 
					 */
					if(!model.has('duration')) {
						switch(model.get('uuid').toLowerCase()){
							case 'plusonecampaignid':
							case 'plus1':
								model.set('duration', 47)
								break;
							case 'legmagicxcampaignid':
							case 'lgmx':
								model.set('duration', 150)
								break;
							case 'nagataniencampaignid':
							case 'nagatanien':
								model.set('duration', 144)
								break;
						}
					}
					model.set({
						"movies": _movies_sorted
					})
				}
				// call original
				if('function' === typeof(_success)) {
 					_success(model, response);
				}
			};
			return ns.Base.prototype.fetch.call(this, options);
		},
	});
})(mr.model.v1, mr.$, mr.ua);