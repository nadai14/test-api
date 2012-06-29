/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Complete view class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Complete.js 381 2012-06-29 10:39:16Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-29 19:39:16 +0900 (金, 29 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $, ua){
	ns.Complete = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Complete'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('complete'),
		/**
		 * Constructor
		 */
		initialize: function(options){
			ns.trace(this.typeName + '#initialize()');
			// set controller
			this.controller = options.controller;
			// countdown
			this.next      = new ns.Next({
				controller:  this.controller ,
				model:       this.controller.models.next,
				el:          $(ns.slctr('next'), this.el)
      });
			// setup template
			this.template = _.template($(this.el).html());
			// bind events
			this.model.on('change', this.render, this);
			this.next.on('click', function(){
				this.trigger('click:next');	
			}, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			// keep reference
			var _self = this;
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			$(ns.slctr('title') + ' b', this.el).text('アンケートが完了しました。次のボタンを押してポイントを獲得して下さい。');
			
			// var _html = 'ポイントをもらう';
			// http://redmine.sunbi.co.jp/issues/2041
			var _html = (this.model.has('button_title')) ? this.model.get('button_title') : 'ポイントをもらう';
			if(this.model.has('client_url')) {
				var _$p = $('<p>');
				var _$a = null; 
				if(this.model.has('conversion_tag')) {
					this.next.off('click');
					
					var _tag            = this.model.get('conversion_tag');
					var _client_url     = this.model.get('client_url');
					//
					_tag                = _.template(_tag)({ 
					 	"time":           (new Date()).getTime()
					});
					// onclick callback
					mr.__conversion__   = function(){ 
						mr.__conversion__ = false;
						var _$container   = $(ns.slctr('conversion'), $(_self.el).closest(ns.slctr('canvas'))).removeClass(ns.cls('template'));
						var _$tag         = $(_tag);
						if(_$tag.get(0).tagName !== 'IMG') {
							ns.alert('システムエラー:コンバージョンタグが不正。');
							return;
						} 
						// add
						_$tag
							.load(function(){
								ns.trace(_self.typeName + '#render()#__conversion__#load');
								// wait for thank you
								setTimeout(function(){
									mr.__conversion__ = true;
								}, 800); 
								// show thank you page 
								_self.controller.requestThankyouPage();
							})
							.appendTo(_$container);
					};
					_$a = $('<a>')
					          	.attr('href',   _client_url)
					          	.attr('target', '_blank')
					          	.attr('onclick', "javascript: " +
					          	                 "var _url  = this.href; " +
					          	                 // "var _open = function(){ return window.open(_url, '_blank'); }; " + 
					          	                 "mr.__conversion__(); " +
					          	                 "mr.__conversion_callback__ = function() { " +
					          	                 "	var _callee = arguments.callee; " + 
					          	                 "	if(mr.__conversion__ === true){ " + 
					          	                 // "    if('undefined' === typeof(_open())) { " + 
					          	                 "    if('undefined' === typeof(window.open(_url, '_blank'))) { " +
					          	                 "      location.href = _url; " + // @see http://redmine.sunbi.co.jp/issues/1990
					          	                 "    }; " + 
					          	                 "    delete mr.__conversion__; " + 
					          	                 "    delete mr.__conversion_callback__; " + 
					          	                 "  }else{ setTimeout(_callee, 1000); } " + 
					          	                 "}; " +
					          	                 "mr.__conversion_callback__(); " +
					          	                 "return false;")
					          	.html(_html)
					          	;
				}else{
					_$a = $('<a>')
					          	.attr('href', this.model.get('client_url'))
					          	.attr('target', '_blank')
					          	.html(_html)
					          	;
				}
				_html = _$p.append(_$a).html();
				ns.trace(this.typeName + '#render():' + _html);
			} 
			$(this.next.render().el).html(_html).click(function(){ $('a', this).click(); });
			// return this
			return this;
		}
	});
})(mr.ui, mr.$, mr.ua);