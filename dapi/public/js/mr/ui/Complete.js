/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Complete class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Landing.js 124 2012-06-09 10:06:58Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-09 19:06:58 +0900 (土, 09 6 2012) $ by $Author: tsuru $
 *
 */
(function(ns, $){
	ns.Complete = ns.Base.extend({
		/**
		 * typeName of this class
		 */
		typeName:   ns.typeName('Complete'), 
		/**
		 * 
		 */
		tagName:    'div',
		/**
		 * 
		 */
		className:  ns.cls('complete'),
		/**
		 * Constructor
		 */
		initialize: function(){
			ns.trace(this.typeName + '#initialize()');
			
			// setup template
			this.template = _.template($(this.el).html());
			
			// countdown
			this.next      = new ns.Next({ 
				model:       new ns.root.model.Next({
				              title:     'ポイントをもらう'
				             }),
				el:          $(ns.slctr('next'), this.el)
      });
      
			// bind events
			if('undefined' !== typeof(this.model)) {
				this.model.on('change', this.render, this);
			}
			this.next.on('click', function(){
				this.trigger('click:next');	
			}, this);
		},
		/**
		 * 
		 */
		render: function(){
			ns.trace(this.typeName + '#render()');
			
			// show
			if($(this.el).hasClass(ns.cls('template'))) {
				$(this.el).removeClass(ns.cls('template'));
			}
			
			$(ns.slctr('title') + ' b', this.el).text('アンケートが完了しました。次のボタンを押してポイントを獲得して下さい。');
			this.next.render();
			
			// return this
			return this;
		}
	});
	
})(mr.ui, mr.$);