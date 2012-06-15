/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2: */
/**
 * Complete class
 *
 *
 * @author       Li Minghua
 * @author       George Lu
 * @author       Toshiya TSURU <t_tsuru@sunbi.co.jp>
 * @version      $Id: Complete.js 179 2012-06-14 08:00:36Z tsuru $
 *
 * Last changed: $LastChangedDate: 2012-06-14 17:00:36 +0900 (木, 14 6 2012) $ by $Author: tsuru $
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
				              title: 'ポイントをもらう'
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
			$(this.next.render().el).html(
				(this.model.has('client_url')) ?
					$('<p>').append($('<a>').attr('href', this.model.get('client_url')).attr('target', '_blank').text('ポイントをもらう')).html() :
					'ポイントをもらう'
			);
			
			// return this
			return this;
		}
	});
})(mr.ui, mr.$);