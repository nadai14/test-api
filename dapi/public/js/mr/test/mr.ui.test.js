/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.ui.*
 *
 * 
 *
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: mr.ui.test.js 51 2012-06-04 09:13:55Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-04 18:13:55 +0900 (月, 04 6 2012) $ by $Author: tsuru $
 * 
 * @see         http://docs.jquery.com/QUnit
 *
 */
(function(ns){
  
  module(ns.namespace + '.Player');
  /**
   * Basic test 
   */
  test('Basic Test', function() {
     var player = new ns.Player();
     equal(player.typeName, ns.typeName('Player'));
     equal(player.$el.get(0).tagName.toLowerCase(), 'video'); 
  });
  
})(mr.ui);