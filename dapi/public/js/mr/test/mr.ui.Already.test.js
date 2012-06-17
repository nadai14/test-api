/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Already Test cases
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
	 * Already
	 */
	module(ns.namespace + '.Already', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('already')));
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
		var _content = new ns.root.model.Content({
			'message'	:	'Already render()', 
			'client_url':	'http://127.0.0.1'
		});
		
		var _view = new ns.Already({
			model: _content,
			el:    _el
		}).render();
		 
		equal(_view.model.get('message'),'Already render()','message: Already render()');
		equal(_view.model.get('client_url'),'http://127.0.0.1', 'client_url: http://127.0.0.1');
	 });

})(mr.ui);