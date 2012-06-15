/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr entry point javascrtipt
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.js 177 2012-06-14 06:12:48Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-14 15:12:48 +0900 (木, 14 6 2012) $ by $Author: tsuru $
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
				_root.ui.face         = options.face;
				_root.controller.face = options.face;
				_root.model.v1.face   = options.face;
				_root.model.face      = options.face;
			}
			
			// setup view model
			var _model = new _root.model.Content();
			
			// 
			_root.ui.player         = _model.get('parameter').get('player');
			
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
		this.trace(this.namespace + '#alert("' + message + '")');
		
		alert(message);
	};
	/**
	 * 
	 * @param {Object} message
	 */
	Namespace.prototype.typeName = function(className) {
		this.trace(this.namespace + '#typeName("' + className + '")');
		
		return this.namespace + '.' + className;
	};
	/**
	 * getParameters method
	 * @return hash
	 */
	Namespace.prototype.getParameters = function(){
		this.trace(this.namespace + '#getParameters()');
		
		var _url    = window.location.href;
		var _i1     = _url.indexOf('?') + 1;
		var _i2     = _url.indexOf('#');
		var _hashes = ((0 <= _i2) ? _url.slice(_i1, _i2) : _url.slice(_i1)).split('&');
		var _vars   = [];
		for(var i = 0; i < _hashes.length; i++)
		{
			var _hash = _hashes[i].split('=');
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
		this.trace(this.namespace + '#getParameter("' + name + '")');
		
		return this.getParameters()[name];
	};
	/**
	 * hasParameter method
   * @param {Object} name
	 */
	Namespace.prototype.hasParameter = function(name){
		this.trace(this.namespace + '#hasParameter("' + name + '")');
		
		return ('undefined' !== typeof(this.getParameters()[name]));
	};
	// return namespace object
	Namespace.prototype.$          = $;
	Namespace.prototype._$_        = _$_;
	return new Namespace('mr');
	
})(('undefined' !== typeof(Zepto)) ?  Zepto : jQuery);