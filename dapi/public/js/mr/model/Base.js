/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Base class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Enq.js 44 2012-06-03 13:50:11Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-03 22:50:11 +0900 (日, 03 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns){

  ns.Base = Backbone.Model.extend({
    /**
     * 
     */
    urlRoot: ns.api,
  });
  
})(mr.model);