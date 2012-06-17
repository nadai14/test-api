/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Canvas Test cases
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id$
 *
 * Last changed: $LastChangedDate$
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
	var _body;
	var _el;
	/**
	 * Canvas
	 */
	module(ns.namespace + '.Canvas', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('canvas')));
			if('undefined' !== typeof(_body)) {
				_body.appendChild(_el);
			}
		},
		teardown: function() { // 終了処理
			if('undefined' !== typeof(_el)) {
				if('undefined' !== typeof(_body)) {
					// _body.removeChild(_el);
				}
			}
		}
	});
	
	/**
	 * render()
	 */
	test('render()', function() {
		$(_el).append($('<div>').addClass(ns.cls('header')));
		$(_el).append($('<div>').addClass(ns.cls('body')));
		$(_el).append($('<div>').addClass(ns.cls('footer')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('ad')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('nav')));
		$(ns.slctr('body')).append($('<div>').addClass(ns.cls('content')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('player')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('creative')));
		
		var _content = new ns.root.model.Content({
		});
		var _view = new ns.Canvas({
			model:	_content,
			el	 :  _el
		}).render();
		
		equal($(ns.slctr('canvas'),this.el).length>0, true, '['+ ns.cls('canvas') +']' + ' is exist');
		equal($(ns.slctr('template'),_view.el).length>0, false, '['+ ns.cls('template') +']' + ' is not exist');
		
		_body.removeChild(_el);
	});

})(mr.ui);