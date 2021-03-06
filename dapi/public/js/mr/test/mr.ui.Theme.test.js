/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Theme Test cases
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.ui.Theme.test.js 332 2012-06-22 09:36:58Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-22 18:36:58 +0900 (金, 22 6 2012) $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
	var _body;
	var _el;
	/**
	 * Theme
	 */
	module(ns.namespace + '.Theme', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
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
		var _model = new ns.root.model.Content({});
		
		var _view = new ns.Theme({
			model:	_model,
			el:    	_el
		}).render();
		
		//TODO render()
		equal('', '', 'TODO');
	});

})(mr.ui);