/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.ui.*
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.ui.test.js 167 2012-06-13 01:58:51Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-13 10:58:51 +0900 (水, 13 6 2012) $ by $Author: tsuru $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
	var _body;
	var _el;
	module(ns.namespace + '.Player', {
		setup: function() { // 初期化処理
			_body = document.getElementsByTagName('body')[0];
		},	
	});
	/**
	 * Basic test 
	 */
	/*
	test('Basic Test', function() {
		var _el    = document.createElement('video');
		_body.appendChild(_el);
		
		
		var player = new ns.Player({
			el: _el
		});
		equal(player.typeName, ns.typeName('Player'));
		equal(player.$el.get(0).tagName.toLowerCase(), 'video'); 
		
		
		_body.removeChild(_el);
	});
	*/
	/**
	 * Question
	 */
  module(ns.namespace + '.Question', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			$(_el).append($('<div>').addClass(ns.cls('answer')));
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
   * getValues()
   */
  test('getValues()', function() {
  	// prepare model
  	var _question = new ns.root.model.Question({
  		"kind": 'numeric'
  	});
  	// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}).render();
		// simulate user innput
		$('input', _view.el).val('日本語');
		// test
		equal(_view.getValues()[0], '日本語');
		// ok(true, _view.getValues()[0]);
	});
	/**
	 * validation()
	 */
  test('validation()', function() {
  	
  	var _question = new ns.root.model.Question({
  		"kind": 'numeric'
  	});
  	// create model
		var _view = new ns.Question({
			model: _question,
			el:    _el
		}).render();
		// simulate user innput
		$('input', _view.el).val('aaaa');
		// test
		equal(_view.validate()[0], '入力した値は数値ではありません 。');
	});
	
// })(mr.initialize({api: 'http://demo.sunbi.co.jp/nci-201205/trunk/api/v1'}).ui);
})(mr.ui);