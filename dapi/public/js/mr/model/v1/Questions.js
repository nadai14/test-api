/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Questions class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 124 2012-06-09 10:06:58Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-09 19:06:58 +0900 (土, 09 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Questions = Backbone.Collection.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Questions'),
		/**
		 * model class of this collection
		 */
		model:    ns.Question,
		/**
		 * 
		 */
		containsQuiz: function() {
			for(var i = 0; i < this.length; ++i) {
				if(this.at(i).getIsQuiz()) return true;
			}
			return false;
		},
		/**
		 * 
		 */
		containsRequired: function() {
			for(var i = 0; i < this.length; ++i) {
				if(this.at(i).getIsRequired()) return true;
			}
			return false;
		}
	});
})(mr.model.v1, mr.$);
