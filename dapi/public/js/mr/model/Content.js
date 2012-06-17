/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * CountDown class
 *
 * This class is ViewModel
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Content.js 248 2012-06-17 08:57:27Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-17 17:57:27 +0900 (日, 17 6 2012) $
 *
 */
(function(ns, $){
	ns.Content = Backbone.Model.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Content'),
		/**
		 * default values
		 * @see http://backbonejs.org/#Model-defaults
		 */
		defaults: {
			"parameter":  new ns.Parameter(),
			"campaign":   null,
			"page":       null,
			// "session_id": null,
			"ad":         new Backbone.Model({
				"playing":  false,
				"ended":    false
			}),
			"countdown":  new ns.CountDown({
				
			})
		},
		/**
		 * constructor
		 * @see http://backbonejs.org/#Model-constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// bind this
			_.bindAll(this, "updatePageToNext");
			
			var _cookies = document.cookie.split(';');
			var _parsed = {};
			for(var i = 0; i < _cookies.length; ++i){
				var _cookie = _cookies[i].split('=');
				_parsed[_cookie[0]] = (1 < _cookie.length) ? _cookie[1] : null;
			}
			if('undefined' === typeof(_parsed['MRID'])){
				this.session_id = ns.guid();
				document.cookie = 'MRID=' + this.session_id;
			}else{
				this.session_id = _parsed['MRID'];
			}
		},
		/**
		 * 
		 */
		updatePageToNext: function(values){
			var _self         = this;
			var _enq_id       = null;
			var _uuid         = null;
			
			var _fetch        = function(_enq_id, _uuid) {
					//	get page
				(new ns.root.model.Page({ 
					enq_id:         _enq_id,
					uuid:           _uuid
				})).fetch({
					/**
					 * success
					 */
					success: function(model, response) {
						_self.set({
							page: model 
						});
					},
					/**
					 * error
					 */
					error:   function() {
						// @TODO handle error
					}
				});
			};
			
			if(!this.has('page')) {
				var _campaign   = this.get('campaign');
				_enq_id         = _campaign.get('enq_id');
				_uuid           = _campaign.get('first_page_id');
				_fetch(_enq_id, _uuid);
				return this;
			}
			
			var _page       = this.get('page');
			
			// send answer
			var _answer     = new ns.Answer({
			                  	enq_id:      _page.get('enq_id'),
			                  	enq_page_id: _page.get('uuid'),
			                  	campaign_id: this.get('parameter').get('mid'),
			                  	session_id:  this.session_id,
			                  	uid:         this.get('parameter').get('uid'),
			                  	key:         this.get('campaign').get('platform') + '_uid',
			                  });
			// build answer
			var _data = {
				session_id:   _answer.get('session_id'),
				uid:          _answer.get('uid'),
				key:          _answer.get('key')
			};
			var _questions  = _page.get('questions');
			for(var i = 0; i < _questions.length; ++i ){
				var _question = _questions.at(i);
				var _num      = _question.get('num'); 
				var _value    = values[_num];
				var _name     = 'answer_' + _num;
				var _values   = _value.values;
				_data[_name]  = (_values.length === 1) ? _values[0] : _values;
				// _answer.set(_name, (_values.length === 1) ? _values[0] : _values);
			}
			
			ns.trace(JSON.stringify(_data));
			
			// send answer
			$.ajax({
				type:       "POST",
				url:        _answer.url(),
				data:       _data,
				beforeSend: function(xhr, settings) {
					ns.trace(ns.namespace + '#beforeSend:' + settings.type + "\t" + settings.url);
					xhr.setRequestHeader("X-Requested-By","poncan-moviereward");
      	},
				success: function(data, status) {
					// move to next
					if(_page.has('next_page_id')) {
						_enq_id       = _page.get('enq_id');
						_uuid         = _page.get('next_page_id');
						_fetch(_enq_id, _uuid);
					}else{
						// this fires up event
						var _campaign = this.get('campaign');
						this.set({
							"complete": new Backbone.Model({
														"conversion_tag": _campaign.has('conversion_tag') ? _campaign.get('conversion_tag')  : null,
							            	"client_url":     _campaign.has('client_url') ? 
							            	                  	_campaign.get('client_url')  +
							            	                  		(this.get('parameter').has('uid') ?
							            	                  			((0 < _campaign.get('client_url').indexOf('?')) ? '&' : '?') +  
							            	                  			'uid=' + encodeURIComponent(this.get('parameter').get('uid')) :
							            	                  			'')  
							            	                  	: null
							            })
						});
						return this;
					}
				},
				complete:  function(xhr, textStatus){
					ns.trace(xhr.responseText);
					switch(xhr.status) {
						case 401:
	  					// 認可されていない UnauthorizedException 401
	  				case 403:
	  					// 状態が入稿前 ForbiddenException 403
							// 状態が終了 ForbiddenException 403
	  				case 404:
	  					// アンケートIDが存在しない NotFoundException 404
							// ページIDが存在しない NotFoundException 404
							// アンケートIDとページIDが矛盾している NotFoundException 404
							// アンケートページと回答の設問番号が矛盾している NotFoundException 404
	  					var _message = '回答保存時時にエラーが発生しました';
	  					var _data    = { message:   _message };
	  					try { _data = $.parseJSON(xhr.responseText); }catch(ex){}
	  					try { _message = ('undefined' !== typeof(_data)) ? _data.message : _message; }catch(ex){}
	  					(ns.handleError || ns.root.handleError || function(mesasge) {  ns.alert(message); })(_message);
	  					break;
					}
				}
			});
			return this;
		}
	});
})(mr.model, mr.$);
