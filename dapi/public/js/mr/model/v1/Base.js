/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Base class
 *
 * This class is the base class of all classes of current namespace
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
<<<<<<< .mine
 * @version      $Id: Base.js 196 2012-06-14 14:33:08Z tsuru $
=======
 * @version      $Id: Base.js 177 2012-06-14 06:12:48Z tsuru $
>>>>>>> .r12
 *
<<<<<<< .mine
 * Last changed: $LastChangedDate: 2012-06-14 23:33:08 +0900 (木, 14 6 2012) $ by $Author: tsuru $
=======
 * Last changed: $LastChangedDate: 2012-06-14 15:12:48 +0900 (木, 14 6 2012) $ by $Author: tsuru $
>>>>>>> .r12
 *
 */
(function(ns, $, ua){
  
  ns.Base = ns.root.model.Base.extend({
    /**
     * typeName of this class
     */
		typeName: ns.typeName('Base')
	});
  /**
   * overrides Backbone.sync
   * @see http://documentcloud.github.com/backbone/docs/backbone.html#section-162
   * @see https://github.com/documentcloud/backbone/blob/master/backbone.js#L1328 
   */
  var _sync = Backbone.sync;
  Backbone.sync = function(method, model, options) {
    // extends options
    var _options = _.extend({
      /**
       * data options
       */
      data: _.extend({
        //@link http://redmine.sunbi.co.jp/issues/1755
        face: (ns.face) ? 
                ns.face : 
                (ua.OS === "iPhone/iPod" || ua.OS === "Android") ? 
                  'SP' : // SP means SmartPhone
                  'PC'   // PC means PC/Mac
      }, (options.data || {})),
      /**
       * 
       * @param {Object} xhr
       * @param {Object} settings
       */
      beforeSend: function(xhr, settings) {
        ns.trace('beforeSend:' + settings.type + "\t" + settings.url);
        
        //@link http://redmine.sunbi.co.jp/issues/1763
        //@see http://api.jquery.com/jQuery.ajax/
        //@see http://zeptojs.com#ajax
        xhr.setRequestHeader("X-Requested-By","poncan-moviereward");
        // call original 
        if('function' === typeof(options.beforeSend)) {
          return options.beforeSend.call(xhr, settings);
        }
        
        // return true;
        return true;
      },
      /**
       * 
 			 * @param {Object} xhr
 			 * @param {Object} textStatus
 			 * 
 			 * @see http://redmine.sunbi.co.jp/issues/1770
       */
      complete:  function(xhr, textStatus){
  			switch(xhr.status) {
  				case 401:
  					// 認可されていない UnauthorizedException 401
  				case 403:
  					// 状態が入稿前 ForbiddenException 403
						// 状態が終了 ForbiddenException 403
  				case 404:
  					// アンケートIDが存在しない NotFoundException 404
						// ページIDが存在しない NotFoundException 404
						// アンケートIDとページIDが矛盾している NotFoundException 404
						// アンケートページと回答の設問番号が矛盾している NotFoundException 404
  					var _message = 'データ通信時にエラーが発生しました';
  					var _data    = { message:   _message };
  					try { _data = $.parseJSON(xhr.responseText); }catch(ex){}
  					try { _message = ('undefined' !== typeof(_data)) ? _data.message : _message; }catch(ex){}
  					(ns.handleError || ns.root.handleError || function(mesasge) {  ns.alert(message); })(_message);
  					break;
  			}
			}
    }, options);
    
    // call original
    var _result = _sync(method, model, _options);
    //  
    return _result;
  };
})(mr.model.v1, mr.$, mr.ua);