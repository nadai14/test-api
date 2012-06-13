/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr entry point javascrtipt
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
var mr = (function($){
	
	/**
	 * returns jQuery or Zepto object of the target
	 */
	var _$_ = function(target) {
		return (typeof(target)=='string') ? $('#' + target) : $(target);
	}
	
	/**
	 * extend class
	 */
	var extend = function (s, c) {
		var f = function (){};
		f.prototype = s.prototype;
		c.prototype = new f();
		c.prototype.__super__ = s.prototype;
		c.prototype.__super__.constructor = s;
		c.prototype.constructor = c;
		return c;
	};
	
	/**
	 * Namespace class
	 */
	var Namespace = function (namespace) {
		
		var _superClass  = arguments.callee;
		var _root        = this;
		
		_root.namespace   = namespace;
		
		_root.model       = new (extend(_superClass, function(){ 
			this.root      = _root;
			this.namespace = _root.namespace + '.model';
			this.v1        =  new (extend(_superClass, function(){
				this.root      = _root;
				this.namespace = _root.namespace + '.model.v1';
			}));
		}))();
		
		_root.controller  = new (extend(_superClass, function(){
			this.root      = _root; 
			this.namespace = _root.namespace + '.controller';
		} ))();
		
		_root.ui          = new (extend(_superClass, function(){
			this.root      = _root;
			this.namespace = _root.namespace + '.ui'; 
		}))();
		
		/**
		 * initialize this name space
		 */
		this.initialize = function(options) {
			
			// prepare options
			options = ('undefined' !== typeof(options.api)) ? options : {};
			
			// setup api
			this.model.v1.api = this.model.api = (options.api) ? options.api : '../api/v1/';
			
			// face(force)
			if('undefined' !== typeof(options.face)) {
				_root.model.v1.face = options.face;
			}
			
			// setup view model
			var _model = new _root.model.Content();
			
			// el render
			if('undefined' !== typeof(options.el)) {
				var _canvas    = 	new _root.ui.Canvas({
					model:          _model,
					el:             options.el
				});
			}
			
			// controller
			var _controller = new _root.controller.Controller({
				model: _model 
			});
				
			return this;
		};
		
	};
	
	/**
	 * returns ramdom string
	 */
	var _rndhex            = function () {
			return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}; 
	
	/**
	 * returns GUID
	 * @see http://www.apps.ietf.org/rfc/rfc4122.html
	 */ 
	Namespace.prototype.guid         = function() {
		return (_rndhex()+_rndhex()+"-"+_rndhex()+"-"+_rndhex()+"-"+_rndhex()+"-"+_rndhex()+_rndhex()+_rndhex());
	} 
	
	// user agent
	Namespace.prototype.ua = ua;
	
	/**
	 * 
	 * @param {Object} message
	 */
	Namespace.prototype.log = function(message) {
		if(console) {
			console.log(message);
		}
	}
	
	/**
	 * 
	 * @param {Object} message
	 */
	Namespace.prototype.trace = function(message) {
		this.log(message);
	}
	
	/**
	 * alert
	 */
	Namespace.prototype.alert = function(message) {
		alert(message);
	};
	
	/**
	 * 
	 * @param {Object} message
	 */
	Namespace.prototype.typeName = function(className) {
		return this.namespace + '.' + className;
	};
	
	
	/**
	 * getParameters method
	 * @return hash
	 */
	Namespace.prototype.getParameters = function(){
		var _vars = [];
		var _hash;
		var _hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for(var i = 0; i < _hashes.length; i++)
		{
			_hash = _hashes[i].split('=');
			_vars.push(_hash[0]);
			_vars[_hash[0]] = _hash[1];
		}
		return _vars;
	};
	/**
	 * getParameter method
	 * @param {Object} name
	 */
	Namespace.prototype.getParameter = function(name){
		return this.getParameters()[name];
	};
	/**
	 * hasParameter method
   * @param {Object} name
	 */
	Namespace.prototype.hasParameter = function(name){
		return ('undefined' !== typeof(this.getParameters()[name]));
	};
	
	// return namespace object
	Namespace.prototype.$          = $;
	Namespace.prototype._$_        = _$_;
	return new Namespace('mr');
	
})(('undefined' !== typeof(Zepto)) ?  Zepto : jQuery);