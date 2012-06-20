/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * mr.ui.Content Test cases
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
	 * Content
	 */
	module(ns.namespace + '.Content', {
		setup: function() { // 初期化処理
			_body     = document.getElementsByTagName('body')[0];
			_el       = document.createElement('div');
			//$(_el).append($('<div>').addClass(ns.cls('content')));
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
			"thankyou": new Backbone.Model({
				"point": 		'1',
				"message":		'thankyou',
				"client_url":	'http://127.0.0.1'
			}),
			el: $('.mr-ui-thankyou')
		});
		var _view = new ns.Content({
			model:	_content,
			el	 :  $(ns.slctr('content'))
		}).render();
		
		//TODO
		equal($(ns.slctr('title')+' b').text(),'おめでとうございます！', '{{title}}: おめでとうございます！');
		equal($(ns.slctr('description')+' p').text().replace(/\s+/g,""),'1', '{{point}}: 1');
		equal($(ns.slctr('message')).text().replace(/\s+/g,""),'thankyou', '{{message}}: thankyou');
		equal($(ns.slctr('conversion')).text().replace(/\s+/g,""),'http://127.0.0.1', '{{client_url}}: http://127.0.0.1');
		
	});

})(mr.ui);