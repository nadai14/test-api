/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Nav class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Nav.js 160 2012-06-12 14:30:09Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-12 23:30:09 +0900 (火, 12 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Nav = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Nav'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('nav'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			
			// bind events
      if('undefined' !== typeof(this.model)) {
        this.model.on('change', this.render, this);
        if(this.model.has('ad')) this.model.get('ad').on('change', this.render, this);
        if(this.model.has('countdown')) this.model.get('countdown').on('change', this.render, this);
      }
		},
		/**
		 * 
		 */
		render:      function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			// render
			$(this.el).html(this.template({
				message : this.model.has('complete') ?
				          	'アンケートの回答は完了しています。' :
				          	this.model.has('page') ? 
				          		$('<p>')
				          			.append($('<span>').text(this.model.get('page').get('questions').at(0).get('num'))) 
				          			.append(' / ') 
				          			.append($('<span>').text(this.model.get('page').get('question_cnt'))).html() : 
				          		this.model.get('parameter').get('already') ? 
												'アンケートの回答は完了しています。' :
												(this.model.get('ad').get('playing') && (ns.face === 'PC')) ? 
													this.model.get('countdown').get('count') :
													'再生ボタンを押して下さい'
			}));
			//
			return this;
		}
	});
})(mr.ui, mr.$);