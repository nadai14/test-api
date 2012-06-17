/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Ad Test cases
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
	 * Ad
	 */
	module(ns.namespace + '.Ad', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('ad')));
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
		
		$(_el).append($('<div>').addClass(ns.cls('player')));
		$(_el).append($('<div>').addClass(ns.cls('creative')));
		
		var _content = new ns.root.model.Content({
			"campaign": {}
		});
				
		var _view = new ns.Ad({
			model: _content,
			el:    _el
		}).render();
		
		var divPlayer = $(ns.slctr('player'), _view.el);
		var divCreative = $(ns.slctr('creative'), _view.el);
		equal(divPlayer.length, 1, 'divPlayer.length = 1');
		equal(divCreative.length, 1, 'divCreative.length = 1');
		
		var divPlayer = $(ns.slctr('player')+':visible', _view.el);
		var divCreative = $(ns.slctr('creative')+':visible', _view.el);
		if(divPlayer.length > 0)
			equal(divPlayer.length, 1, 'player.show()');
		else
			equal(divPlayer.length, 0, 'player.hide()');
			
		if(divCreative.length > 0)
			equal(divCreative.length, 1, 'creative.show()');
		else
			equal(divCreative.length, 0, 'creative.hide()');
		
		_body.removeChild(_el);
	});

})(mr.ui);