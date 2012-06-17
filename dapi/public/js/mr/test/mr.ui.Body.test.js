/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Body Test cases
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
	 * Body
	 */
	module(ns.namespace + '.Body', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('body')));
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
		$(_el).append($('<div>').addClass(ns.cls('ad')));
		$(_el).append($('<div>').addClass(ns.cls('nav')));
		$(_el).append($('<div>').addClass(ns.cls('content')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('player')));
		$(ns.slctr('ad')).append($('<div>').addClass(ns.cls('creative')));
		
		var _content = new ns.root.model.Content({
		});
		var _view = new ns.Body({
			model:	_content,
			el	 :  _el
		}).render();
		
		equal($(ns.slctr('body'),this.el).length>0, true, '['+ ns.cls('body') +']' + ' is exist');
		equal($(ns.slctr('template'),_view.el).length>0, false, '['+ ns.cls('template') +']' + ' is not exist');
		
		_body.removeChild(_el);
	});

})(mr.ui);