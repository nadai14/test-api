/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Question class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Question.js 136 2012-06-10 14:19:46Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-10 23:19:46 +0900 (日, 10 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Question = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName: ns.typeName('Question'), 
		/**
		 * 
		 */
		defaults: {
			"type":  "Question",
		},
		/**
		 * returns if this Question is QUIZ
		 * 
		 * @see http://redmine.sunbi.co.jp/issues/1781
		 */
		getIsQuiz: function() {
			return this.has('answer');
		},
		/**
		 * 
		 */
		getIsRequired: function() {
			return this.has('required') ? this.get('required') : false;
		}
	});
})(mr.model.v1, mr.$);
