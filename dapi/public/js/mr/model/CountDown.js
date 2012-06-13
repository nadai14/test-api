/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 *
 */
(function(ns){
	ns.CountDown = Backbone.Model.extend({
		/**
     * typeName of this class
     */
    typeName: ns.typeName('CountDown'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"count":    0,
			"min":      0,
			"started":  false,
			"finished": false
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			// bind this
			_.bindAll(this, "start", "finish");
			// 
			// this.on('change:count', function(){
				// this.set('started', false, {silent: true}); 
			// }, this);
		},
		/**
		 * start method
		 */
		start:      function(){
			ns.trace(this.typeName + '#start()');
			
			// set started
			if(this.get('started')) {
				return this;
			}
			
			this.set('started', true, {silent: true});
			
			var _self  = this;
			var _count = this.get('count');
			var _min   = this.get('min');
			// check curretn value 
			if(_count <= _min) {
				return this;
			}
			// countdown
			(function(_count){
				var _callee = arguments.callee;
				// update value
				if(_self.get('count') !== _count) { 
					_self.set({
						"count":    _count,
						"finished": !(_min < _count)
					});
				}
				// check
				if(_min < _count) {
					setTimeout(function(){
						_callee(--_count);
					}, 1000);	
				}
			})(_count);
			return this;
		},
		/**
		 * 
		 */
		finish:    function(){
			this.set('finished', true, {silent: true});
		}
	});
})(mr.model);
