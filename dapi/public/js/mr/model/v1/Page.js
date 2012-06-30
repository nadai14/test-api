/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Page model class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Page.js 377 2012-06-29 03:25:02Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 12:25:02 +0900 (金, 29 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Page = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Page'), 
		/**
		 * 
		 */
		defaults: {
			"type":  "Page",
		},
		/**
		 * 
		 */
		idAttribute: "uuid",
		/**
		 * url method
		 */
		url: function() {
			ns.trace(this.typeName + '#url()');
			
			return ns.api + '/enqs/' + this.get('enq_id') + '/pages/' + this.get('uuid') + '?v=' + (((1+Math.random())*0x10000)|0).toString(16).substring(1);
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
						
				// set questions 
				var _org = model.get('questions');
				var _new = new Array(_org.length);
				for(var i = 0; i < _org.length; ++i){
					_new[i] = new ns.Question(_org[i]);
				}
				
				// replace
				model.set({ questions: new ns.Questions(_new) }, { silent: true });
				
				// call original
				if('function' === typeof(_success)) {
					_success(model, response);
				}
			};	
			return ns.Base.prototype.fetch.call(this, options);
		},
		/**
		 * 
		 */
		containsQuiz: function() {
			ns.trace(this.typeName + '#containsQuiz()');
			
			return this.has('questions') ? this.get('questions').containsQuiz() : false;
		},
		/**
		 * 
		 */
		containsRequired: function() {
			ns.trace(this.typeName + '#containsRequired()');
			
			return this.has('questions') ? this.get('questions').containsRequired() : false;
		},
		/*
		 * 
		 */
		findNextPageId:  function(values) {
			ns.trace(this.typeName + '#findNextPageId()');
			var _self           = this;
			var _next_page_id   = _self.get('next_page_id');
			var _questions      = _self.get('questions');
			for(var i = 0; i < _questions.length; ++i ){
				var _question     = _questions.at(i);
				if(_question.has('branches')) {
					var _branches   = _question.get('branches');
					var _num        = _question.get('num'); 
					var _value      = values[_num];
					if(_value) {
						for(var v = 0; v < _value.values.length; ++v ){
							var _val = _value.values[v];
							for(var b = 0; b < _branches.length; ++b ){
								var _branch = _branches[b];
								if(_branch.answer === _val) {
									_next_page_id = _branch.next_page_id; 
								}
							}
						}			
					}
				}
			}
			ns.trace(this.typeName + '#findNextPageId()/_next_page_id:' + _next_page_id);
			return _next_page_id;
		}
	});
})(mr.model.v1, mr.$);