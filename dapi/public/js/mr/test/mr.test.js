/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Test script for mr.*
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
  
  module(ns.namespace);
  /**
   * guid test 
   * @see http://www.apps.ietf.org/rfc/rfc4122.html
   */
  test('guid() Test (RFC4122)', function() {
     var guid = mr.guid();
     equal(guid.match(/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/)[0], guid);
  });
  
})(mr);